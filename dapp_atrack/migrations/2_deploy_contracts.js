var Logistics = artifacts.require("./Logistics.sol");

module.exports = function(deployer) {
  deployer.deploy(Logistics);
};
