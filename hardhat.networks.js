const ethers = require("ethers");

const networks = {
  coverage: {
    url: "http://127.0.0.1:8555",
    blockGasLimit: 200000000,
    allowUnlimitedContractSize: true,
  },
  localhost: {
    url: "http://127.0.0.1:8545",
    blockGasLimit: 200000000,
    allowUnlimitedContractSize: true,
  },
};

module.exports = networks;
