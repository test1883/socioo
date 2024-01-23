import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: {mnemonic: process.env.mnemonic}
    },
  }
};

export default config;
