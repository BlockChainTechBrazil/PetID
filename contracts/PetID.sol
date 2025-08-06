// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PetID is ERC721, Ownable {
    struct Pet {
        uint256 id;
        string name;
        string species;
        string breed;
        uint256 birthDate;
        string ipfsHash; // Para armazenar dados adicionais no IPFS
        bool isRegistered;
        struct Tutor;
    }
    struct Tutor{
        string name;
        string address;
        string phone;
    }

    mapping(uint256 => Pet) private pets;
    mapping(address => uint256[]) private ownerToPets;
    mapping(uint256 => string) private _tokenURIs;

    uint256 public nextPetId = 1;
    uint256 public totalPets = 0;

    event PetRegistered(
        uint256 indexed petId,
        address indexed owner,
        string name
    );
    event PetTransferred(
        uint256 indexed petId,
        address indexed from,
        address indexed to
    );
    event PetUpdated(uint256 indexed petId, string ipfsHash);

    modifier onlyPetOwner(uint256 _petId) {
        require(ownerOf(_petId) == msg.sender, "Not the pet owner");
        require(pets[_petId].isRegistered, "Pet not registered");
        _;
    }

    modifier petExists(uint256 _petId) {
        require(pets[_petId].isRegistered, "Pet does not exist");
        _;
    }

    constructor() ERC721("PetID", "PET") Ownable(msg.sender) {}

    function registerPet(
        string memory _name,
        string memory _species,
        string memory _breed,
        uint256 _birthDate,
        string memory _ipfsHash
    ) public returns (uint256) {
        uint256 petId = nextPetId;

        pets[petId] = Pet({
            id: petId,
            name: _name,
            species: _species,
            breed: _breed,
            birthDate: _birthDate,
            ipfsHash: _ipfsHash,
            isRegistered: true
        });

        ownerToPets[msg.sender].push(petId);
        _safeMint(msg.sender, petId);
        _setTokenURI(petId, _ipfsHash);

        nextPetId++;
        totalPets++;

        emit PetRegistered(petId, msg.sender, _name);
        return petId;
    }

    function transferPet(
        uint256 _petId,
        address _newOwner
    ) public onlyPetOwner(_petId) {
        require(_newOwner != address(0), "Invalid new owner address");
        require(_newOwner != msg.sender, "Cannot transfer to yourself");

        address previousOwner = ownerOf(_petId);
        _transfer(previousOwner, _newOwner, _petId);

        // Remove pet from previous owner's list
        _removePetFromOwner(previousOwner, _petId);
        // Add pet to new owner's list
        ownerToPets[_newOwner].push(_petId);

        emit PetTransferred(_petId, previousOwner, _newOwner);
    }

    function updatePetData(
        uint256 _petId,
        string memory _ipfsHash
    ) public onlyPetOwner(_petId) {
        pets[_petId].ipfsHash = _ipfsHash;
        _setTokenURI(_petId, _ipfsHash);
        emit PetUpdated(_petId, _ipfsHash);
    }

    function getPet(
        uint256 _petId
    ) public view petExists(_petId) returns (Pet memory) {
        return pets[_petId];
    }

    function getOwnerPets(
        address _owner
    ) public view returns (uint256[] memory) {
        return ownerToPets[_owner];
    }

    function isPetOwner(
        uint256 _petId,
        address _address
    ) public view returns (bool) {
        return ownerOf(_petId) == _address && pets[_petId].isRegistered;
    }

    // --- ERC721 Metadata ---
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            ownerOf(tokenId) != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _tokenURIs[tokenId];
    }

    function _removePetFromOwner(address _owner, uint256 _petId) internal {
        uint256[] storage pets_array = ownerToPets[_owner];
        for (uint256 i = 0; i < pets_array.length; i++) {
            if (pets_array[i] == _petId) {
                pets_array[i] = pets_array[pets_array.length - 1];
                pets_array.pop();
                break;
            }
        }
    }

    // Função para obter informações básicas do contrato
    function getContractInfo() public view returns (uint256, uint256) {
        return (totalPets, nextPetId - 1);
    }
}
