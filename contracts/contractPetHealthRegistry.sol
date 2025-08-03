// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract PetHealthRegistry is Ownable, ReentrancyGuard {
    enum Role { None, Vet, Admin }

    struct Pet {
        string name;
        string species;
        string breed;
        string color;
        uint256 birthDate;
        string[] clinicalHistory;
        address owner;
        address nftContract;
        uint256 nftTokenId;
    }

    uint256 public petCount;
    mapping(uint256 => Pet) private pets;
    mapping(address => uint256[]) private ownerToPets;
    mapping(address => Role) private roles;

    event PetRegistered(uint256 indexed petId, address indexed owner);
    event ClinicalRecordAdded(uint256 indexed petId, string record);
    event OwnershipTransferred(uint256 indexed petId, address indexed previousOwner, address indexed newOwner);
    event NFTLinked(uint256 indexed petId, address nftContract, uint256 tokenId);

    modifier onlyRole(Role required) {
        require(roles[msg.sender] == required, "Access denied: incorrect role");
        _;
    }

    modifier onlyOwnerOrAdmin() {
        require(msg.sender == owner() || roles[msg.sender] == Role.Admin, "Restricted to owner or admin");
        _;
    }

    modifier onlyPetOwner(uint256 _petId) {
        require(_exists(_petId), "Pet does not exist");
        require(pets[_petId].owner == msg.sender, "Not the pet owner");
        _;
    }

    constructor(address initialOwner) Ownable(initialOwner) {
        require(initialOwner != address(0), "Initial owner cannot be zero address");
        petCount = 1;
    }

    function assignRole(address _user, Role _role) public onlyOwner {
        require(_user != address(0), "Invalid address");
        roles[_user] = _role;
    }

    function revokeRole(address _user) public onlyOwner {
        require(_user != address(0), "Invalid address");
        roles[_user] = Role.None;
    }

    function getRole(address _user) public view returns (Role) {
        return roles[_user];
    }

    function registerPet(
        string memory _name,
        string memory _species,
        string memory _breed,
        string memory _color,
        uint256 _birthDate
    ) public nonReentrant {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_species).length > 0, "Species cannot be empty");
        require(_birthDate > 0, "Invalid birth date");

        Pet storage newPet = pets[petCount];
        newPet.name = _name;
        newPet.species = _species;
        newPet.breed = _breed;
        newPet.color = _color;
        newPet.birthDate = _birthDate;
        newPet.owner = msg.sender;

        ownerToPets[msg.sender].push(petCount);
        emit PetRegistered(petCount, msg.sender);

        petCount++;
    }

    function registerPetAsAdmin(
        string memory _name,
        string memory _species,
        string memory _breed,
        string memory _color,
        uint256 _birthDate,
        address _petOwner
    ) public onlyRole(Role.Admin) nonReentrant {
        require(_petOwner != address(0), "Invalid pet owner");

        Pet storage newPet = pets[petCount];
        newPet.name = _name;
        newPet.species = _species;
        newPet.breed = _breed;
        newPet.color = _color;
        newPet.birthDate = _birthDate;
        newPet.owner = _petOwner;

        ownerToPets[_petOwner].push(petCount);
        emit PetRegistered(petCount, _petOwner);

        petCount++;
    }

    function linkNFTToPet(uint256 _petId, address _nftContract, uint256 _tokenId)
        public
        onlyPetOwner(_petId)
        nonReentrant
    {
        require(_nftContract != address(0), "NFT contract address is invalid");
        require(IERC721(_nftContract).ownerOf(_tokenId) == msg.sender, "You don't own this NFT");

        pets[_petId].nftContract = _nftContract;
        pets[_petId].nftTokenId = _tokenId;

        emit NFTLinked(_petId, _nftContract, _tokenId);
    }

    function addClinicalRecord(uint256 _petId, string memory _record)
        public
        onlyPetOwner(_petId)
        nonReentrant
    {
        require(bytes(_record).length > 0, "Record cannot be empty");
        pets[_petId].clinicalHistory.push(_record);
        emit ClinicalRecordAdded(_petId, _record);
    }

    function addClinicalRecordAsVet(uint256 _petId, string memory _record)
        public
        onlyRole(Role.Vet)
        nonReentrant
    {
        require(_exists(_petId), "Pet does not exist");
        require(bytes(_record).length > 0, "Record cannot be empty");

        pets[_petId].clinicalHistory.push(_record);
        emit ClinicalRecordAdded(_petId, _record);
    }

    function transferOwnership(uint256 _petId, address _newOwner)
        public
        onlyPetOwner(_petId)
        nonReentrant
    {
        require(_newOwner != address(0), "New owner cannot be zero address");

        address previousOwner = pets[_petId].owner;
        pets[_petId].owner = _newOwner;

        uint256[] storage previousOwnerPets = ownerToPets[previousOwner];
        for (uint256 i = 0; i < previousOwnerPets.length; i++) {
            if (previousOwnerPets[i] == _petId) {
                previousOwnerPets[i] = previousOwnerPets[previousOwnerPets.length - 1];
                previousOwnerPets.pop();
                break;
            }
        }

        ownerToPets[_newOwner].push(_petId);
        emit OwnershipTransferred(_petId, previousOwner, _newOwner);
    }

    function getClinicalHistory(uint256 _petId) public view returns (string[] memory) {
        require(_exists(_petId), "Pet does not exist");
        return pets[_petId].clinicalHistory;
    }

    function getOwnerPets(address _owner) public view returns (uint256[] memory) {
        return ownerToPets[_owner];
    }

    function getPetDetails(uint256 _petId) public view returns (Pet memory) {
        require(_exists(_petId), "Pet does not exist");
        return pets[_petId];
    }

    function _exists(uint256 _petId) internal view returns (bool) {
        return _petId > 0 && _petId < petCount;
    }
}
