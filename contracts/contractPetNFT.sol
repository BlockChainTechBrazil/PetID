// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
contract PetNFT is ERC721, Ownable {
    uint256 public tokenCounter;
    string private baseTokenURI;
    mapping(uint256 => address) private originalPetOwner;
    event PetMinted(uint256 indexed tokenId, address indexed owner);
    constructor(address initialOwner, string memory _baseURI)
        ERC721("PetIdentityToken", "PETID")
        Ownable(initialOwner)
    {
        require(
            initialOwner != address(0),
            "Initial owner cannot be zero address"
        );
        baseTokenURI = _baseURI;
        tokenCounter = 1;
    }

    /// @notice Verifica se um token existe
    function tokenExists(uint256 tokenId) public view returns (bool) {
        try this.ownerOf(tokenId) returns (address) {
            return true;
        } catch {
            return false;
        }
    }

    /// @notice Cunha novo NFT para o pet
    function mintPetNFT(address petOwner) public onlyOwner returns (uint256) {
        require(petOwner != address(0), "Pet owner cannot be zero address");
        uint256 newTokenId = tokenCounter;
        _safeMint(petOwner, newTokenId);
        originalPetOwner[newTokenId] = petOwner;
        emit PetMinted(newTokenId, petOwner);
        tokenCounter++;
        return newTokenId;
    }

    /// @notice Retorna o dono original do NFT do pet
    function getOriginalOwner(uint256 tokenId) public view returns (address) {
        require(tokenExists(tokenId), "Token does not exist");
        return originalPetOwner[tokenId];
    }

    /// @notice Retorna a URI do token com base no baseURI + ID
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(tokenExists(tokenId), "Token does not exist");
        return
            string(
                abi.encodePacked(
                    baseTokenURI,
                    Strings.toString(tokenId),
                    ".json"
                )
            );
    }

    /// @notice Atualiza o base URI (somente pelo dono do contrato)
    function updateBaseURI(string memory newBaseURI) public onlyOwner {
        baseTokenURI = newBaseURI;
    }
}
