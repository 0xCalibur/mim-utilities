/* eslint-disable prefer-const */
import hre, { ethers, network, deployments } from "hardhat";
import { ChainId, getBigNumber } from "../utilities";
import { CauldronUtils } from "../typechain";
import { expect } from "chai";

describe("CauldronV3", async () => {
  let snapshotId;
  let CauldronUtils: CauldronUtils;

  before(async () => {
    await network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: process.env.ETHEREUM_RPC_URL || `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            blockNumber: 14535616,
          },
        },
      ],
    });

    hre.getChainId = () => Promise.resolve(ChainId.Mainnet.toString());
    await deployments.fixture(["CauldronUtils"]);

    CauldronUtils = await ethers.getContract<CauldronUtils>("CauldronUtils");
    snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  afterEach(async () => {
    await network.provider.send("evm_revert", [snapshotId]);
    snapshotId = await ethers.provider.send("evm_snapshot", []);
  });

  it("decode raw cook transaction data", async () => {
    const actions = (await CauldronUtils.decodeCookWithSignature(
      "0x656f3d6400000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000026000000000000000000000000000000000000000000000000000000000000000070000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000b0000000000000000000000000000000000000000000000000000000000000015000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000070000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002e0000000000000000000000000000000000000000000000000000000000000036000000000000000000000000000000000000000000000000000000000000003c0000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000008dc7371d855bcf361655ace52eaea10c78ef579e000000000000000000000000fe0f13fd5f928539c5bc377c8200a699fc95ca020000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000001b18b7edc66b1558fe38835e642e4818dc936ebbf4bb93f5fb0f196e148544232162d4bca62efdbeaa08a61748b27e08a5e599fedc7003749f7836f02418ddcfb400000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000a389f9430876455c36478deea9769b7ca4e3ddb10000000000000000000000008dc7371d855bcf361655ace52eaea10c78ef579e00000000000000000000000000000000000000000000000000049e57d635400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0000000000000000000000008dc7371d855bcf361655ace52eaea10c78ef579e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000006391369004e35bcf9000000000000000000000000007d76568d84de8a0f34bbf315f53d7772c1fabcd800000000000000000000000000000000000000000000000000000000000001200000000000000000000000007d76568d84de8a0f34bbf315f53d7772c1fabcd800000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000449f1d0f590000000000000000000000008dc7371d855bcf361655ace52eaea10c78ef579e0000000000000000000000000000000000000000000000000006c81a25e15db9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0000000000000000000000008dc7371d855bcf361655ace52eaea10c78ef579e0000000000000000000000000000000000000000000000000000000000000000"
    ));
    
    console.log("decode_bentoSetApproval");
    console.log(await CauldronUtils.decode_bentoSetApproval(actions[0].data));

    console.log("decode_updateExchangeRate");
    console.log(await CauldronUtils.decode_updateExchangeRate(actions[1].data));

    console.log("decode_bentoWithdraw");
    console.log(await CauldronUtils.decode_bentoWithdraw(actions[2].data));

    console.log("decode_addCollateral");
    console.log(await CauldronUtils.decode_addCollateral(actions[3].data));

    console.log("decode_borrow");
    console.log(await CauldronUtils.decode_borrow(actions[4].data));

    console.log("decode_call");
    console.log(await CauldronUtils.decode_call(actions[5].data));

    console.log("decode_addCollateral");
    console.log(await CauldronUtils.decode_addCollateral(actions[6].data));
  });
});
