// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OrgToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

contract Vesting is Ownable {
    struct Stakeholder {
        address wallet;
        uint256 amount;
        uint256 releaseTime;
        bool claimed;
    }

    OrgToken public token;
    mapping(address => Stakeholder) public stakeholders;
    address[] public stakeholderList;

    event StakeholderAdded(address indexed wallet, uint256 amount, uint256 releaseTime);
    event TokensClaimed(address indexed wallet, uint256 amount);

    constructor(address tokenAddress) {
        token = OrgToken(tokenAddress);
    }

    function addStakeholder(address wallet, uint256 amount, uint256 releaseTime) public onlyOwner {
        require(wallet != address(0), "Invalid address");
        require(releaseTime > block.timestamp, "Release time should be in the future");
        require(amount > 0, "Amount should be greater than zero");

        stakeholders[wallet] = Stakeholder(wallet, amount, releaseTime, false);
        stakeholderList.push(wallet);

        emit StakeholderAdded(wallet, amount, releaseTime);
    }

    function claimTokens() public {
        Stakeholder storage stakeholder = stakeholders[msg.sender];
        require(stakeholder.wallet == msg.sender, "Not a stakeholder");
        require(block.timestamp >= stakeholder.releaseTime, "Tokens are still vested");
        require(!stakeholder.claimed, "Tokens already claimed");

        stakeholder.claimed = true;
        token.transfer(stakeholder.wallet, stakeholder.amount);

        emit TokensClaimed(stakeholder.wallet, stakeholder.amount);
    }

    function withdrawTokens(uint256 amount) public onlyOwner {
        require(amount <= token.balanceOf(address(this)), "Not enough tokens");
        token.transfer(owner(), amount);
    }
}
