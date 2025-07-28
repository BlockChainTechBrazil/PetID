import { useState } from 'react';
import { ethers, Signer } from 'ethers';

// ABI simplificado do contrato (você precisará do ABI completo após deploy)
const PET_ID_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721IncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721InsufficientApproval",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721NonexistentToken",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "petId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "PetRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "petId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "PetTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "petId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      }
    ],
    "name": "PetUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "getOwnerPets",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_petId",
        "type": "uint256"
      }
    ],
    "name": "getPet",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "species",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "breed",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "birthDate",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "ipfsHash",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isRegistered",
            "type": "bool"
          }
        ],
        "internalType": "struct PetID.Pet",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_petId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isPetOwner",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextPetId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ownerToPets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "pets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "species",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "breed",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "birthDate",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "ipfsHash",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_species",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_breed",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_birthDate",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      }
    ],
    "name": "registerPet",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalPets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_petId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferPet",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_petId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_ipfsHash",
        "type": "string"
      }
    ],
    "name": "updatePetData",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const CONTRACT_ADDRESS = "0x82F16DeD53404805b0D3029AdC117B031Bb90e81";

export interface PetData {
  name: string;
  species: string;
  breed: string;
  birthDate: string | number;
  ipfsHash?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  owner: string;
  ipfsHash: string;
  isRegistered: boolean;
}

export interface RegisterResult {
  success: boolean;
  petId?: string;
  transactionHash?: string;
  error?: string;
}

export interface UsePetIDContract {
  registerPet: (petData: PetData) => Promise<RegisterResult>;
  getPet: (petId: string | number) => Promise<Pet | null>;
  getOwnerPets: (ownerAddress: string) => Promise<string[]>;
  transferPet: (petId: string | number, newOwnerAddress: string) => Promise<{ success: boolean; transactionHash?: string; error?: string }>;
  updatePetData: (petId: string | number, ipfsHash: string) => Promise<{ success: boolean; transactionHash?: string; error?: string }>;
  isPetOwner: (petId: string | number, address: string) => Promise<boolean>;
  getTotalPets: () => Promise<string>;
  isLoading: boolean;
  error: string | null;
  contractAddress: string;
  isContractReady: boolean;
}

export const usePetIDContract = (signer: Signer | null): UsePetIDContract => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Criar instância do contrato
  const getContract = () => {
    if (!signer || !CONTRACT_ADDRESS) {
      throw new Error('Signer ou endereço do contrato não disponível');
    }
    return new ethers.Contract(CONTRACT_ADDRESS, PET_ID_ABI, signer);
  };

  // Registrar um novo pet
  const registerPet = async (petData: PetData): Promise<RegisterResult> => {
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
      const event = receipt.logs.find((log: any) => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed && parsed.name === 'PetRegistered';
        } catch {
          return false;
        }
      });

      let petId: string | null = null;
      if (event) {
        const parsed = contract.interface.parseLog(event);
        if (parsed && parsed.args && parsed.args.petId) {
          petId = parsed.args.petId.toString();
        }
      }

      return { success: true, petId: petId || undefined, transactionHash: tx.hash };

    } catch (err: any) {
      console.error('Erro ao registrar pet:', err);
      setError(err.message || 'Erro ao registrar pet');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar dados de um pet
  const getPet = async (petId: string | number): Promise<Pet | null> => {
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

    } catch (err: any) {
      console.error('Erro ao buscar pet:', err);
      setError(err.message || 'Erro ao buscar dados do pet');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar pets de um proprietário
  const getOwnerPets = async (ownerAddress: string): Promise<string[]> => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = getContract();
      const petIds = await contract.getOwnerPets(ownerAddress);

      return petIds.map((id: any) => id.toString());

    } catch (err: any) {
      console.error('Erro ao buscar pets do proprietário:', err);
      setError(err.message || 'Erro ao buscar pets');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Transferir pet
  const transferPet = async (petId: string | number, newOwnerAddress: string): Promise<{ success: boolean; transactionHash?: string; error?: string }> => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = getContract();
      const tx = await contract.transferPet(petId, newOwnerAddress);

      console.log('Transação de transferência enviada:', tx.hash);

      const receipt = await tx.wait();
      console.log('Pet transferido com sucesso:', receipt);

      return { success: true, transactionHash: tx.hash };

    } catch (err: any) {
      console.error('Erro ao transferir pet:', err);
      setError(err.message || 'Erro ao transferir pet');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar dados do pet
  const updatePetData = async (petId: string | number, ipfsHash: string): Promise<{ success: boolean; transactionHash?: string; error?: string }> => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = getContract();
      const tx = await contract.updatePetData(petId, ipfsHash);

      console.log('Transação de atualização enviada:', tx.hash);

      const receipt = await tx.wait();
      console.log('Dados do pet atualizados:', receipt);

      return { success: true, transactionHash: tx.hash };

    } catch (err: any) {
      console.error('Erro ao atualizar pet:', err);
      setError(err.message || 'Erro ao atualizar dados do pet');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar se é proprietário do pet
  const isPetOwner = async (petId: string | number, address: string): Promise<boolean> => {
    try {
      const contract = getContract();
      return await contract.isPetOwner(petId, address);
    } catch (err) {
      console.error('Erro ao verificar proprietário:', err);
      return false;
    }
  };

  // Buscar total de pets
  const getTotalPets = async (): Promise<string> => {
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
    isContractReady: !!CONTRACT_ADDRESS
  };
};
