import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { network } from "hardhat";
import { ChainId, setDeploymentSupportedChains, wrappedDeploy } from "../utilities";
import { Constants } from "../test/constants";
import { CauldronUtils } from "../typechain";

const ParametersPerChain = {
  [ChainId.Mainnet]: {},
  [ChainId.Avalanche]: {},
};

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const chainId = await hre.getChainId();
  const parameters = ParametersPerChain[parseInt(chainId)];

  const CauldronUtils = await wrappedDeploy<CauldronUtils>("CauldronUtils", {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
  });

  /*if (network.name !== "hardhat") {
    if ((await CauldronV3MasterContract.owner()) != parameters.owner) {
      await (await CauldronV3MasterContract.transferOwnership(parameters.owner, true, false)).wait();
    }
  }*/
};

export default deployFunction;

setDeploymentSupportedChains(Object.keys(ParametersPerChain), deployFunction);

deployFunction.tags = ["CauldronUtils"];
deployFunction.dependencies = [];
