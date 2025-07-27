import { useState } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { usePetIDContract } from '../hooks/usePetIDContract';
import './PetRegistration.css';

const PetRegistration = () => {
  const { isConnected, signer } = useMetaMask();
  const { registerPet, isLoading, error, isContractReady } = usePetIDContract(signer);
  
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
  });
  
  const [registrationResult, setRegistrationResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Por favor, conecte sua carteira primeiro.');
      return;
    }
    
    if (!isContractReady) {
      alert('Contrato ainda não foi implantado. Esta é uma versão de demonstração.');
      return;
    }

    try {
      const result = await registerPet(formData);
      setRegistrationResult(result);
      
      if (result.success) {
        // Limpar formulário
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
          <h3>🔗 Conecte sua carteira</h3>
          <p>Para registrar um pet, você precisa conectar sua carteira MetaMask primeiro.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pet-registration">
      <div className="registration-header">
        <h2>🐾 Registrar Novo Pet</h2>
        <p>Crie uma identidade digital permanente para seu pet na blockchain</p>
      </div>

      {!isContractReady && (
        <div className="warning-message">
          <p>⚠️ Esta é uma versão de demonstração. O contrato ainda não foi implantado.</p>
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
              <p>✅ Pet registrado com sucesso!</p>
              {registrationResult.petId && (
                <p>🆔 ID do Pet: {registrationResult.petId}</p>
              )}
              <p>📝 Hash da transação: {registrationResult.transactionHash}</p>
            </>
          ) : (
            <p>❌ Erro: {registrationResult.error}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="name">Nome do Pet *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Ex: Buddy"
          />
        </div>

        <div className="form-group">
          <label htmlFor="species">Espécie *</label>
          <select
            id="species"
            name="species"
            value={formData.species}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione a espécie</option>
            <option value="Cão">Cão</option>
            <option value="Gato">Gato</option>
            <option value="Pássaro">Pássaro</option>
            <option value="Coelho">Coelho</option>
            <option value="Peixe">Peixe</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="breed">Raça</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
            placeholder="Ex: Golden Retriever"
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">Data de Nascimento</label>
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
              Registrando...
            </>
          ) : (
            <>
              🏷️ Registrar Pet
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
