require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-log-remover");
// require("hardhat-deploy");
require("solidity-coverage");
require("./hardhat.helpers");
const networks = require("./hardhat.networks");
const { getConfig } = require("./lib/config");

/**
 * @name deploy-mainnet
 * @description Local Development Environment
 */
task("deploy-mainnet", "Local Development Environment").setAction(
  async function() {
    const config = getConfig("mainnet");

    // Deploy DAI
    await run("deploy-poolpower", {
      contractFactory: "podDAI",
      name: "podDAI",
      symbol: "ppDAI",
      token: config.podDAI.token,
      ticket: config.podDAI.ticket,
      prizePool: config.podDAI.pool,
      poolToken: config.podDAI.poolToken,
      feePerDeposit: config.podDAI.feePerDeposit,
      depositProcessMinimum: config.podDAI.depositProcessMinimum,
      minimumLiquidationAmount: config.podDAI.minimumLiquidationAmount,
      liquidationFee: config.podDAI.liquidationFee,
    });

    // Deploy USDC
    await run("deploy-poolpower", {
      contractFactory: "podUSDC",
      name: "podUSDC",
      symbol: "ppUSDC",
      token: config.podUSDC.token,
      ticket: config.podUSDC.ticket,
      prizePool: config.podUSDC.pool,
      poolToken: config.podUSDC.poolToken,
      feePerDeposit: config.podUSDC.feePerDeposit,
      depositProcessMinimum: config.podUSDC.depositProcessMinimum,
      minimumLiquidationAmount: config.podUSDC.minimumLiquidationAmount,
      liquidationFee: config.podUSDC.liquidationFee,
    });

    // Deploy UNI
    await run("deploy-poolpower", {
      contractFactory: "podUNI",
      name: "podUNI",
      symbol: "ppUNI",
      token: config.podUNI.token,
      ticket: config.podUNI.ticket,
      prizePool: config.podUNI.pool,
      poolToken: config.podUNI.poolToken,
      feePerDeposit: config.podUNI.feePerDeposit,
      depositProcessMinimum: config.podUNI.depositProcessMinimum,
      minimumLiquidationAmount: config.podUNI.minimumLiquidationAmount,
      liquidationFee: config.podUNI.liquidationFee,
    });

    // Deploy UNI
    await run("deploy-poolpower", {
      contractFactory: "podCOMP",
      name: "podCOMP",
      symbol: "ppUNI",
      token: config.podCOMP.token,
      ticket: config.podCOMP.ticket,
      prizePool: config.podCOMP.pool,
      poolToken: config.podCOMP.poolToken,
      feePerDeposit: config.podCOMP.feePerDeposit,
      depositProcessMinimum: config.podCOMP.depositProcessMinimum,
      minimumLiquidationAmount: config.podCOMP.minimumLiquidationAmount,
      liquidationFee: config.podCOMP.liquidationFee,
    });
  }
);

/**
 * @name deploy-rinkeby
 * @description Local Development Environment
 */
task("deploy-rinkeby", "Local Development Environment").setAction(
  async function() {
    const config = getConfig("rinkeby");

    // Deploy DAI
    // await run("deploy-poolpower", {
    //   contractFactory: "podDAI",
    //   name: "podDAI",
    //   symbol: "ppDAI",
    //   token: config.podDAI.token,
    //   ticket: config.podDAI.ticket,
    //   prizePool: config.podDAI.pool,
    //   poolToken: config.podDAI.poolToken,
    //   feePerDeposit: config.podDAI.feePerDeposit,
    //   depositProcessMinimum: config.podDAI.depositProcessMinimum,
    //   minimumLiquidationAmount: config.podDAI.minimumLiquidationAmount,
    //   liquidationFee: config.podDAI.liquidationFee,
    // });

    // Deploy USDC
    await run("deploy-poolpower", {
      contractFactory: "podUSDC",
      name: "USDC",
      symbol: "ppUSDC",
      token: config.podUSDC.token,
      ticket: config.podUSDC.ticket,
      prizePool: config.podUSDC.pool,
      poolToken: config.podUSDC.poolToken,
      feePerDeposit: config.podUSDC.feePerDeposit,
      depositProcessMinimum: config.podUSDC.depositProcessMinimum,
      minimumLiquidationAmount: config.podUSDC.minimumLiquidationAmount,
      liquidationFee: config.podUSDC.liquidationFee,
    });

    // // Deploy BAT
    // await run("deploy-poolpower", {
    //   contractFactory: "podBAT",
    //   name: "BAT",
    //   symbol: "ppBAT",
    //   token: config.podBAT.token,
    //   ticket: config.podBAT.ticket,
    //   prizePool: config.podBAT.pool,
    //   poolToken: config.podBAT.poolToken,
    //   feePerDeposit: config.podBAT.feePerDeposit,
    //   depositProcessMinimum: config.podBAT.depositProcessMinimum,
    //   minimumLiquidationAmount: config.podBAT.minimumLiquidationAmount,
    //   liquidationFee: config.podBAT.liquidationFee,
    // });
  }
);

/**
 * @name deploy-poolpower
 * @description Deploy PoolPower Contract
 */
task("deploy-poolpower", "Deploy PoolPower")
  .addPositionalParam("contractFactory")
  .addPositionalParam("name")
  .addPositionalParam("token")
  .addPositionalParam("ticket")
  .addPositionalParam("pool")
  .addPositionalParam("poolToken")
  .addPositionalParam("feePerDeposit")
  .addPositionalParam("depositProcessMinimum")
  .addPositionalParam("minimumLiquidationAmount")
  .addPositionalParam("liquidationFee")
  .setAction(
    async ({
      contractFactory,
      name,
      symbol,
      token,
      ticket,
      pool,
      poolToken,
      feePerDeposit,
      depositProcessMinimum,
      minimumLiquidationAmount,
      liquidationFee,
    }) => {
      const Contract = await ethers.getContractFactory(contractFactory);
      const contract = await Contract.deploy(
        name,
        symbol,
        token,
        ticket,
        pool,
        poolToken,
        feePerDeposit,
        depositProcessMinimum,
        minimumLiquidationAmount,
        liquidationFee
      );
      await contract.deployed();
      console.log(
        `PoolPower${name}:`,
        ethers.utils.getAddress(contract.address)
      );

      return contract.address;
    }
  );

// Hardhat Configuration
module.exports = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    sponsor: {
      default: 1,
    },
    user: {
      default: 1,
    },
  },
  networks,
  solidity: {
    compilers: [
      {
        version: "0.5.16",
      },
      {
        version: "0.6.10",
      },
      {
        version: "0.6.12",
      },
      {
        version: "0.7.0",
      },
      {
        version: "0.8.0",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
