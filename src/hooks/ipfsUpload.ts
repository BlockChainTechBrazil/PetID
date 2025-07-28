import { Web3Storage } from 'web3.storage';

export function getWeb3StorageClient(): Web3Storage {
  const token = process.env.REACT_APP_WEB3STORAGE_TOKEN;
  if (!token) throw new Error('Token da Web3.Storage não encontrado. Defina REACT_APP_WEB3STORAGE_TOKEN no .env');
  return new Web3Storage({ token });
}

export async function uploadPetMetadataToIPFS(petData: object): Promise<string> {
  const client = getWeb3StorageClient();
  const blob = new Blob([JSON.stringify(petData)], { type: 'application/json' });
  const file = new File([blob], 'pet.json');
  const cid = await client.put([file], { wrapWithDirectory: false });
  return cid;
}
