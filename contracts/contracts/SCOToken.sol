// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SCOToken is ERC20 {

    uint256 public tokens;
    address public immutable owner;

    constructor() ERC20("SCO", "SCO") {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    /*
        @notice supply tokens to the main contract
        @param scoContract contract address of the sco contract
        @param supply amount of tokens to be minted
    */
    function supplyTokens(address scoContract, uint256 supply) external onlyOwner {
        _mint(scoContract, supply);
        tokens+=supply;
    }

}