import { useState } from 'react';
import { ethers } from 'ethers';

// ABI simplificado do contrato (você precisará do ABI completo após deploy)
const PET_ID_ABI = [
  "function registerPet(string memory _name, string memory _species, string memory _breed, uint256 _birthDate, string memory _ipfsHash) public returns (uint256)",
  "function getPet(uint256 _petId) public view returns (tuple(uint256 id, string name, string species, string breed, uint256 birthDate, address owner, string ipfsHash, bool isRegistered))",
  "function getOwnerPets(address _owner) public view returns (uint256[])",
  "function transferPet(uint256 _petId, address _newOwner) public",
  "function updatePetData(uint256 _petId, string memory _ipfsHash) public",
  "function totalPets() public view returns (uint256)",
  "function isPetOwner(uint256 _petId, address _address) public view returns (bool)",
  "event PetRegistered(uint256 indexed petId, address indexed owner, string name)",
  "event PetTransferred(uint256 indexed petId, address indexed from, address indexed to)",
  "event PetUpdated(uint256 indexed petId, string ipfsHash)"
];

// Endereço do contrato (será definido após deploy)
// Para desenvolvimento, você pode usar um endereço de teste
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Substitua pelo endereço real

export const usePetIDContract = (signer) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Criar instância do contrato
  const getContract = () => {
    if (!signer || !CONTRACT_ADDRESS || CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
      throw new Error('Signer ou endereço do contrato não disponível');
    }
    return new ethers.Contract(CONTRACT_ADDRESS, PET_ID_ABI, signer);
  };

  // Registrar um novo pet
  const registerPet = async (petData) => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = getContract();
      
      const { name, species, breed, birthDate, ipfsHash = "" } = petData;
      
      // Converter data para timestamp se necessário
      const birthTimestamp = typeof birthDate === 'string' 
        ? Math.floor(new Date(birthDate).getTime() / 1000)
        : birthDate;

      const tx = await contract.registerPet(name, species, breed, birthTimestamp, ipfsHash);
      
      console.log('Transação enviada:', tx.hash);
      
      const receipt = await tx.wait();
      console.log('Pet registrado com sucesso:', receipt);

      // Extrair ID do pet do evento
      const event = receipt.logs.find(log => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed.name === 'PetRegistered';
        } catch {
          return false;
        }
      });

      let petId = null;
      if (event) {
        const parsed = contract.interface.parseLog(event);
        petId = parsed.args.petId.toString();
      }

      return { success: true, petId, transactionHash: tx.hash };
      
    } catch (err) {
      console.error('Erro ao registrar pet:', err);
      setError(err.message || 'Erro ao registrar pet');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar dados de um pet
  const getPet = async (petId) => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = getContract();
      const pet = await contract.getPet(petId);
      
      return {
        id: pet.id.toString(),
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        birthDate: pet.birthDate.toString(),
        owner: pet.owner,
        ipfsHash: pet.ipfsHash,
        isRegistered: pet.isRegistered
      };
      
    } catch (err) {
      console.error('Erro ao buscar pet:', err);
      setError(err.message || 'Erro ao buscar dados do pet');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar pets de um proprietário
  const getOwnerPets = async (ownerAddress) => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = getContract();
      const petIds = await contract.getOwnerPets(ownerAddress);
      
      return petIds.map(id => id.toString());
      
    } catch (err) {
      console.error('Erro ao buscar pets do proprietário:', err);
      setError(err.message || 'Erro ao buscar pets');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Transferir pet
  const transferPet = async (petId, newOwnerAddress) => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = getContract();
      const tx = await contract.transferPet(petId, newOwnerAddress);
      
      console.log('Transação de transferência enviada:', tx.hash);
      
      const receipt = await tx.wait();
      console.log('Pet transferido com sucesso:', receipt);

      return { success: true, transactionHash: tx.hash };
      
    } catch (err) {
      console.error('Erro ao transferir pet:', err);
      setError(err.message || 'Erro ao transferir pet');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar dados do pet
  const updatePetData = async (petId, ipfsHash) => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = getContract();
      const tx = await contract.updatePetData(petId, ipfsHash);
      
      console.log('Transação de atualização enviada:', tx.hash);
      
      const receipt = await tx.wait();
      console.log('Dados do pet atualizados:', receipt);

      return { success: true, transactionHash: tx.hash };
      
    } catch (err) {
      console.error('Erro ao atualizar pet:', err);
      setError(err.message || 'Erro ao atualizar dados do pet');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar se é proprietário do pet
  const isPetOwner = async (petId, address) => {
    try {
      const contract = getContract();
      return await contract.isPetOwner(petId, address);
    } catch (err) {
      console.error('Erro ao verificar proprietário:', err);
      return false;
    }
  };

  // Buscar total de pets
  const getTotalPets = async () => {
    try {
      const contract = getContract();
      const total = await contract.totalPets();
      return total.toString();
    } catch (err) {
      console.error('Erro ao buscar total de pets:', err);
      return '0';
    }
  };

  return {
    registerPet,
    getPet,
    getOwnerPets,
    transferPet,
    updatePetData,
    isPetOwner,
    getTotalPets,
    isLoading,
    error,
    contractAddress: CONTRACT_ADDRESS,
    isContractReady: CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000"
  };
};
