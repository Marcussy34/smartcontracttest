require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    // Local hardhat network
    hardhat: {},
    
    // OP Sepolia testnet configuration
    "op-sepolia": {
      url: process.env.OP_SEPOLIA_RPC_URL || "https://sepolia.optimism.io",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY.startsWith('0x') ? process.env.PRIVATE_KEY : `0x${process.env.PRIVATE_KEY}`] : [],
      chainId: 11155420,
      gasPrice: 1000000000, // 1 gwei
    }
  },
  etherscan: {
    // For contract verification on OP Sepolia
    apiKey: {
      "op-sepolia": process.env.OPTIMISM_API_KEY || ""
    },
    customChains: [
      {
        network: "op-sepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimism.etherscan.io"
        }
      }
    ]
  }
};
