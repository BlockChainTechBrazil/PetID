import { useEffect, useState } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { usePetIDContract } from '../hooks/usePetIDContract';

export function MyPetNFTs() {
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
        setError('Erro ao buscar NFTs do usuário.');
        setLoading(false);
      });
  }, [account]);

  if (!account) return <div>Conecte sua carteira para ver seus NFTs.</div>;
  if (loading) return <div>Carregando NFTs...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!pets.length) return <div>Você não possui NFTs de pets.</div>;

  return (
    <div className="my-pet-nfts" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 32 }}>
      <h3 style={{ fontSize: 24, marginBottom: 24 }}>🐾 Meus NFTs de Pets</h3>
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
            <div style={{ fontSize: 15, marginBottom: 6 }}>Espécie: <b>{pet.species}</b></div>
            <div style={{ fontSize: 15, marginBottom: 6 }}>Raça: <b>{pet.breed}</b></div>
            <div style={{ fontSize: 15, marginBottom: 6 }}>Nascimento: <b>{new Date(Number(pet.birthDate) * 1000).toLocaleDateString()}</b></div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 6, wordBreak: 'break-all' }}>TokenURI: {pet.ipfsHash}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
