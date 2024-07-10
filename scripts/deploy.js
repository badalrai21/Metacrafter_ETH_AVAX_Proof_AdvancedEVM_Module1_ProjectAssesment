// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  // Compile the contracts
  await hre.run('compile');

  // Deploy OrgRegistry contract
  const OrgRegistry = await ethers.getContractFactory("OrgRegistry");
  const orgRegistry = await OrgRegistry.deploy();
  await orgRegistry.deployed();
  console.log("OrgRegistry deployed to:", orgRegistry.address);

  // Deploy TokenVesting contract
  const TokenVesting = await ethers.getContractFactory("TokenVesting");
  const tokenVesting = await TokenVesting.deploy();
  await tokenVesting.deployed();
  console.log("TokenVesting deployed to:", tokenVesting.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

