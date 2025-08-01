import { generatePetHash } from '../context/ipfsHashUtil';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { RegisterResult } from '../hooks/usePetIDContract';
import { useMetaMask } from '../hooks/useMetaMask';
import { usePetIDContract } from '../hooks/usePetIDContract';
import './PetRegistration.css';

const PetRegistration = () => {
  const { t } = useTranslation();
  const { isConnected, signer } = useMetaMask();
  const { registerPet, isLoading, error, isContractReady } = usePetIDContract(signer);

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
  });

  const [registrationResult, setRegistrationResult] = useState<RegisterResult | null>(null);
  const { contractAddress } = usePetIDContract(signer);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isConnected) {
      alert(t('petRegistration.messages.connectWallet'));
      return;
    }

    if (!isContractReady) {
      alert(t('petRegistration.warnings.demoVersion'));
      return;
    }

    // Gera um hash único dos dados do pet (simulando um hash de conteúdo IPFS)
    let ownerAddress = '';
    if (signer && typeof (signer as any).getAddress === 'function') {
      ownerAddress = await (signer as any).getAddress();
    }
    const petData = {
      ...formData,
      timestamp: Date.now().toString(),
      owner: ownerAddress
    };
    const ipfsHash = await generatePetHash(petData);

    try {
      const result = await registerPet({ ...formData, ipfsHash });
      setRegistrationResult(result);

      if (result.success) {
        setFormData({
          name: '',
          species: '',
          breed: '',
          birthDate: '',
        });
      }
    } catch (err) {
      console.error('Erro no registro:', err);
    }
  };

  if (!isConnected) {
    return (
      <div className="pet-registration">
        <div className="not-connected">
          <h3>🔗 {t('petRegistration.notConnected.title')}</h3>
          <p>{t('petRegistration.notConnected.description')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pet-registration">
      <div className="registration-header">
        <h2>🐾 {t('petRegistration.title')}</h2>
        <p>{t('petRegistration.subtitle')}</p>
      </div>

      {!isContractReady && (
        <div className="warning-message">
          <p>⚠️ {t('petRegistration.warnings.demoVersion')}</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      )}

      {registrationResult && (
        <div className={`result-message ${registrationResult.success ? 'success' : 'error'}`}>
          {registrationResult.success ? (
            <>
              <p>✅ {t('petRegistration.messages.registrationSuccess')}</p>
              {registrationResult.petId && (
                <>
                  <p>🆔 <b>{t('myPetNFTs.petId')}:</b> {registrationResult.petId}</p>
                  <div style={{ background: '#f6f6f6', border: '1px solid #ccc', padding: 12, margin: '12px 0', borderRadius: 6 }}>
                    <b>{t('petRegistration.nftImport.title')}</b>
                    <ul>
                      <li><b>{t('petRegistration.nftImport.contractAddress')}</b> <code>{contractAddress}</code></li>
                      <li><b>{t('petRegistration.nftImport.nftId')}</b> {registrationResult.petId}</li>
                      <li><b>{t('petRegistration.nftImport.network')}</b> {t('petRegistration.nftImport.networkValue')}</li>
                    </ul>
                    <span style={{ fontSize: 13, color: '#888' }}>{t('petRegistration.nftImport.instructions')}</span>
                  </div>
                </>
              )}
              <p>📝 {t('petRegistration.messages.transactionHash')} {registrationResult.transactionHash}</p>
            </>
          ) : (
            <p>❌ {t('petRegistration.messages.registrationError')} {registrationResult.error}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="registration-form">
        {/* A imagem será buscada automaticamente pela raça, futuramente */}
        <div className="form-group">
          <label htmlFor="name">{t('petRegistration.form.petName')} *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder={t('petRegistration.form.placeholders.petName')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="species">{t('petRegistration.form.petSpecies')} *</label>
          <select
            id="species"
            name="species"
            value={formData.species}
            onChange={handleInputChange}
            required
          >
            <option value="">{t('petRegistration.form.selectSpecies')}</option>
            <option value="dog">{t('petRegistration.form.species.dog')}</option>
            <option value="cat">{t('petRegistration.form.species.cat')}</option>
            <option value="bird">{t('petRegistration.form.species.bird')}</option>
            <option value="rabbit">{t('petRegistration.form.species.rabbit')}</option>
            <option value="fish">{t('petRegistration.form.species.fish')}</option>
            <option value="other">{t('petRegistration.form.species.other')}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="breed">{t('petRegistration.form.petBreed')}</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
            placeholder={t('petRegistration.form.placeholders.petBreed')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">{t('petRegistration.form.birthDate')}</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !isConnected}
          className="submit-button"
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              {t('petRegistration.form.registeringButton')}
            </>
          ) : (
            <>
              🏷️ {t('petRegistration.form.registerButton')}
            </>
          )}
        </button>
      </form>

      <div className="info-box">
        <h4>ℹ️ Como funciona?</h4>
        <ul>
          <li>✨ Cada pet recebe um ID único na blockchain</li>
          <li>🔒 Os dados são imutáveis e seguros</li>
          <li>🌍 Acessível globalmente por vets e autoridades</li>
          <li>💰 Taxa de gas necessária para registro</li>
        </ul>
      </div>
    </div>
  );
};

export default PetRegistration;
