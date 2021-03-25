module.exports = {
  // mocha: { reporter: "mocha-junit-reporter" },
  measureFunctionCoverage: false,
  measureStatementCoverage: false,
  skipFiles: [
    "external",
    "mocks",
    "libraries/FixedPoint.sol",
    "libraries/ExtendedSafeCast.sol",
    "PodManager.sol",
  ],
};
