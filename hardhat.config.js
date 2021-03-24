require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("hardhat-log-remover");
// require("hardhat-deploy");
require("solidity-coverage");
require("./hardhat.helpers");
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
  // Name Accounts
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
  // Network Configuration
  networks: {
    // HARDHAT CONFIGURATION
    hardhat: {
      gasPrice: 150000000000,
      gasLimit: 10000000,
      allowUnlimitedContractSize: true,
      chainId: 1,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
        blockNumber: 11905343,
        // blockNumber: 11906000,
        // blockNumber: 12091705,
      },
      contracts: {},
    },
    // HARDHAT CONFIGURATION - Workaroundfor MetaMask port number
    development: {
      url: `http://localhost:8543`,
      gasPrice: 150000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      contracts: {},
    },

    // MAINNET CONFIGURATION
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },

      deployed: {},
      owner: "0xC14438f1E3afF20a8e9b41a60F29a3ADFEf16B10",
      podDAI: {
        prizePool: "0xEBfb47A7ad0FD6e57323C8A42B2E5A6a4F68fc1a",
        token: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        ticket: "0x334cBb5858417Aee161B53Ee0D5349cCF54514CF",
        pool: "0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e",
        faucet: "0xF362ce295F2A4eaE4348fFC8cDBCe8d729ccb8Eb",
        feePerDeposit: "30",
        depositProcessMinimum: "500",
        minimumLiquidationAmount: "2000",
        liquidationFee: "100",
        chainId: "1",
      },
      podUSDC: {
        prizePool: "0xde9ec95d7708b8319ccca4b8bc92c0a3b70bf416",
        token: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        ticket: "0xd81b1a8b1ad00baa2d6609e0bae28a38713872f7",
        pool: "0x0cec1a9154ff802e7934fc916ed7ca50bde6844e",
        feePerDeposit: "30",
        depositProcessMinimum: "500",
        minimumLiquidationAmount: "2000",
        liquidationFee: "100",
        chainId: "1",
      },
      podUNI: {
        prizePool: "0x0650d780292142835F6ac58dd8E2a336e87b4393",
        token: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        ticket: "0xA92a861FC11b99b24296aF880011B47F9cAFb5ab",
        pool: "0x0cec1a9154ff802e7934fc916ed7ca50bde6844e",
        feePerDeposit: "30",
        depositProcessMinimum: "500",
        minimumLiquidationAmount: "2000",
        liquidationFee: "100",
        chainId: "1",
      },
      podCOMP: {
        prizePool: "0xBC82221e131c082336cf698F0cA3EBd18aFd4ce7",
        token: "0xc00e94cb662c3520282e6f5717214004a7f26888",
        ticket: "0x27b85f596feb14e4b5faa9671720a556a7608c69",
        pool: "0x0cec1a9154ff802e7934fc916ed7ca50bde6844e",
        feePerDeposit: "30",
        depositProcessMinimum: "500",
        minimumLiquidationAmount: "2000",
        liquidationFee: "100",
        chainId: "1",
      },
      contracts: {
        UniswapRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        UniswapFactory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
        DaiPrizeprizePool: "0xEBfb47A7ad0FD6e57323C8A42B2E5A6a4F68fc1a",
        UsdcPrizeprizePool: "0xde9ec95d7708b8319ccca4b8bc92c0a3b70bf416",
        CompPrizeprizePool: "0xBC82221e131c082336cf698F0cA3EBd18aFd4ce7",
        UniPrizeprizePool: "0x0650d780292142835F6ac58dd8E2a336e87b4393",
      },
      tokens: {
        DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
        UNI: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        COMP: "0xc00e94cb662c3520282e6f5717214004a7f26888",
        WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      },
    },

    // RINKEBY CONFIGURATION
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
      gasPrice: 1000000000,
      gasLimit: 10000000000,
      accounts: {
        mnemonic: process.env.MNEMONIC_RINKEBY,
      },
      podDAI: {
        prizePool: "0x4706856FA8Bb747D50b4EF8547FE51Ab5Edc4Ac2",
        token: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
        ticket: "0x4FB19557Fbd8D73Ac884eFBe291626fD5641C778",
        poolToken: "0x0000000000000000000000000000000000000000",
        feePerDeposit: "10",
        depositProcessMinimum: "1000",
        minimumLiquidationAmount: "1000",
        liquidationFee: "100",
        chainId: "4",
        strategy: "0x5E0A6d336667EACE5D1b33279B50055604c3E329",
      },
      podUSDC: {
        prizePool: "0xde5275536231eCa2Dd506B9ccD73C028e16a9a32",
        token: "0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b",
        ticket: "0xb03dc163f2becdd6fa3f44def57e28f1ba95f741",
        poolToken: "0x0000000000000000000000000000000000000000",
        feePerDeposit: "30",
        depositProcessMinimum: "500",
        minimumLiquidationAmount: "1000",
        liquidationFee: "100",
        chainId: "4",
        strategy: "0x1b92BC2F339ef25161711e4EafC31999C005aF21",
      },
      podBAT: {
        prizePool: "0xab068F220E10eEd899b54F1113dE7E354c9A8eB7",
        token: "0xbf7a7169562078c96f0ec1a8afd6ae50f12e5a99",
        ticket: "0xd5eE7cD7A97ccBbf2B1Fb2c92C19515a41720eA5",
        strategy: "0x41CF0758b7Cc2394b1C2dfF6133FEbb0Ef317C3b",
        poolToken: "0x0000000000000000000000000000000000000000",
        feePerDeposit: "30",
        depositProcessMinimum: "500",
        minimumLiquidationAmount: "1000",
        liquidationFee: "100",
      },
    },
  },

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
