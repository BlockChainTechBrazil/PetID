// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PetHealthProxy is Ownable {
    address public implementation;

    event ImplementationUpgraded(address indexed newImplementation);

    constructor(address _implementation) Ownable(msg.sender) {
        require(_implementation != address(0), "Implementation cannot be zero");
        implementation = _implementation;
    }

    function upgradeTo(address _newImplementation) external onlyOwner {
        require(_newImplementation != address(0), "Invalid implementation");
        implementation = _newImplementation;
        emit ImplementationUpgraded(_newImplementation);
    }

    fallback() external payable {
        _delegate(implementation);
    }

    receive() external payable {}

    function _delegate(address impl) internal {
        require(impl != address(0), "No implementation set");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}
