import { Signer, Contract } from "ethers";
const hre = require("hardhat");
import { BigNumber } from "@ethersproject/bignumber";
import * as fs from "fs";

export default class DeployHelper {
  deployer: Signer;
  deployerBalanceBefore: BigNumber = BigNumber.from(0);
  deployerBalanceBeforeReadable = "";
  deployerBalanceAfter: BigNumber = BigNumber.from(0);
  deployerBalanceAfterReadable = "";
  deployerAddress = "";

  constructor(deployer: Signer) {
    this.deployer = deployer;
  }

  async beforeDeploy(): Promise<void> {
    this.deployerBalanceBefore = await this.deployer.getBalance();
    this.deployerBalanceBeforeReadable = hre.ethers.utils.commify(
      hre.ethers.utils.formatEther(this.deployerBalanceBefore.toString())
    );
    this.deployerAddress = await this.deployer.getAddress();

    console.log("Deployer:", await this.deployer.getAddress());
    console.log(
      "Deployer Balance Before (ETH):",
      this.deployerBalanceBeforeReadable
    );
  }

  async afterDeploy(contract: Contract, contractName: string): Promise<void> {
    this.deployerBalanceAfter = await this.deployer.getBalance();
    this.deployerBalanceAfterReadable = hre.ethers.utils.commify(
      hre.ethers.utils.formatEther(this.deployerBalanceAfter.toString())
    );

    console.log(
      "Deployer Balance After (ETH):",
      this.deployerBalanceAfterReadable
    );
    console.log(
      "Balance Used for Deployment (ETH):",
      hre.ethers.utils.commify(
        hre.ethers.utils.formatEther(
          this.deployerBalanceBefore.sub(this.deployerBalanceAfter)
        )
      )
    );
    console.log("Contract:", contract.address);
    console.log("Contract Name:", await contract.name());

    saveFrontendFiles(
      contract,
      contractName,
      this.deployerAddress,
      this.deployerBalanceBeforeReadable,
      this.deployerBalanceAfterReadable
    );
  }
}

function saveFrontendFiles(
  contract: Contract,
  contractName: string,
  deployerAddress: string,
  deployerBalanceBeforeReadable: string,
  deployerBalanceAfterReadable: string
) {
  const contractsDir = __dirname + "/../frontend";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/" + contractName + "_address.json",
    JSON.stringify(
      {
        Contract: contract.address,
        Deployer: deployerAddress,
        "Deployer Balance Before": deployerBalanceBeforeReadable,
        "Deployer Balance After": deployerBalanceAfterReadable,
      },
      undefined,
      2
    )
  );

  const ContractArtifact = hre.artifacts.readArtifactSync(contractName)["abi"];

  fs.writeFileSync(
    contractsDir + "/" + contractName + ".json",
    JSON.stringify(ContractArtifact, null, 2)
  );
}
