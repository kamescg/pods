const { getConfig } = require("../lib/config");
const { constants } = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
  // const config = getConfig("mainnet");
  // const { deploy, get } = deployments;
  // const { deployer } = await getNamedAccounts();
  // const PodManager = await get("PodFactory");
  // await deploy("Pod", {
  //   from: deployer,
  //   args: [
  //     config.podDAI.prizePool,
  //     config.podDAI.token,
  //     config.podDAI.ticket,
  //     config.podDAI.pool,
  //     config.podDAI.faucet,
  //     PodManager.address,
  //   ],
  //   log: true,
  // });
};
module.exports.tags = ["Pod"];
