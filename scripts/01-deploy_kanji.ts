import { Contract, ContractFactory } from "ethers";
import DeployHelper from "./deploy_helper";
const hre = require("hardhat");

const contractName: string = "Kanji";

async function main(): Promise<void> {
  const [deployer] = await hre.ethers.getSigners();
  const deployHelper = new DeployHelper(deployer);
  await deployHelper.beforeDeploy();

  const contractFactory: ContractFactory = await hre.ethers.getContractFactory(
    contractName
  );
  const contract: Contract = await contractFactory.deploy();
  await contract.deployed();
  await deployHelper.afterDeploy(contract, contractName);
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
