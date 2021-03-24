# Pods (PoolTogether Perihpery)

The Pods smart contracts are a periphery smart contract collection for PoolTogether

- Lower Gas Fees
- Increased Chances of Winning

### Overview

The smart contracts are categorized into multiple categories

### Primary

The primary smart contracts are responsible for handling collective deposits and issuing POOL rewards

- Pod
- TokenDrop

### Factories

The factory smart contracts are responsible for deploying new Pods associated TokenDrop

- PodFactory
- TokenDropFactory

### Periphery

The periphery smart contracts help handle secondary actions, like liquidating "bonus" rewards from LOOT boxes.

- PodManager

## Development

The development, testing and deployment is handled via `hardhat`

## Testing

The test suite includes support for pod essentials, deposits, withdrawls, batching and collecting POOL rewards.

Due to POOL rewards schedule it's important to run tests using a mainnet fork from a specific block number.

Run All Tests

`yarn test`

Core Test Suite

`yarn test test/pod-factory.js`
`yarn test test/pod-essentials.js`
`yarn test test/pod-withdraw.js`
`yarn test test/pod-drop.js`
`yarn test test/pod-drop.js`

Periphery Test Suite
`yarn test test/pod-manager.js`
