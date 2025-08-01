import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMetaMask } from '../hooks/useMetaMask';
import { usePetIDContract } from '../hooks/usePetIDContract';

export function MyPetNFTs() {
  const { t } = useTranslation();
  const { account, signer } = useMetaMask();
  const { getOwnerPets, getPet } = usePetIDContract(signer);
  const [petIds, setPetIds] = useState<string[]>([]);
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!account) return;
    setLoading(true);
    setError(null);
    getOwnerPets(account)
      .then(async (ids) => {
        setPetIds(ids);
        const petData = await Promise.all(ids.map((id) => getPet(id)));
        setPets(petData.filter(Boolean));
        setLoading(false);
      })
      .catch(() => {
        setError(t('myPetNFTs.errorFetching'));
        setLoading(false);
      });
  }, [account, t]);

  if (!account) return <div>{t('myPetNFTs.connectWallet')}</div>;
  if (loading) return <div>{t('myPetNFTs.loading')}</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!pets.length) return <div>{t('myPetNFTs.noPets')}</div>;

  return (
    <div className="my-pet-nfts" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 32 }}>
      <h3 style={{ fontSize: 24, marginBottom: 24 }}>🐾 {t('myPetNFTs.title')}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        {pets.map((pet) => (
          <div
            key={pet.id}
            style={{
              width: 260,
              height: 260,
              background: '#fff',
              borderRadius: 20,
              boxShadow: '0 2px 12px #0001',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              textAlign: 'center',
              color: '#222',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{pet.name}</div>
            <div style={{ fontSize: 14, color: '#444', marginBottom: 8 }}>ID: {pet.id}</div>
            <div style={{ fontSize: 15, marginBottom: 6 }}>{t('myPetNFTs.species')}: <b>{pet.species}</b></div>
            <div style={{ fontSize: 15, marginBottom: 6 }}>{t('myPetNFTs.breed')}: <b>{pet.breed}</b></div>
            <div style={{ fontSize: 15, marginBottom: 6 }}>{t('myPetNFTs.birthDate')}: <b>{new Date(Number(pet.birthDate) * 1000).toLocaleDateString()}</b></div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 6, wordBreak: 'break-all' }}>{t('myPetNFTs.tokenUri')}: {pet.ipfsHash}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
