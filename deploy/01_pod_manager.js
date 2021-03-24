const { getConfig } = require("../lib/config");
const { constants } = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("PodManager", {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ["PodManager"];
