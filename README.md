# Muller Library

The `Muller` library is a Solidity library that provides functions for handling fractional numbers and their multiplication. It offers a new approach to multiplying two numbers without risking overflow and without fully supporting floating-point numbers.

## Overview

When handling rates and values typically represented as floating points, the `Muller` library defines fraction-like numbers made up of `UP_VALUE` and `DOWN_VALUE`. The multiplication is performed as follows:

```
Result = (x * RATE.UP_VALUE) / RATE.DOWN_VALUE
```

This library represents `UP_VALUE` and `DOWN_VALUE` within a single 256-bit EVM slot. The first 128 bits represent `UP_VALUE` and the next 128 bits represent `DOWN_VALUE`.

## Functions

### `mul(uint256 reg, uint256 rate)`

Multiplies a `reg` value with a fractional `rate`.

- `reg` (uint256): The regular number to be multiplied.
- `rate` (uint256): The fractional rate in the form `up/down` where `rate = (up * 2^128) + down`.

Returns the result of the multiplication.

### `getMulRate(uint256 up, uint256 down)`

Combines `up` and `down` values to form a fractional rate.

- `up` (uint256): The numerator part of the fractional rate.
- `down` (uint256): The denominator part of the fractional rate.

Returns the combined rate.

## Example Usage

Here is an example of how to use the `Muller` library in your Solidity contract:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "./Muller.sol";

contract getMulRateContract {
    function getMul(uint256 up, uint256 down) public pure returns (uint256) {
        return Muller.getMulRate(up, down);
    }

    function muli(uint256 reg, uint256 rate) public pure returns (uint256) {
        return Muller.mul(reg, rate);
    }
}
```

## Installation

1. Clone the repository.
2. Install the necessary dependencies using `npm` or `yarn`.

```bash
npm install
```

## Testing

To test the `Muller` library through the `getMulRateContract`, you can use the Hardhat framework. Ensure you have Hardhat installed and set up in your project.

### Hardhat Setup

If you haven't already set up Hardhat, initialize a new project:

```bash
npx hardhat
```

Follow the prompts to create a new Hardhat project. Then, install the necessary dependencies:

```bash
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai ethers @types/node @types/mocha ts-node typescript
```

### Compile the Contracts

Compile the contracts using Hardhat:

```bash
npx hardhat compile
```

### Run the Tests

Run the tests using Hardhat:

```bash
npx hardhat test
```

## Example Tests

Here's an example of a TypeScript test file to test the `getMulRateContract`:

```typescript

  it("should handle multiplying rate format correctly", async function () {
    const up = BigInt(83);
    const down = BigInt(100);

    const rate = await getMulRateContract.getMul("83", "100");


    const reg = BigInt(1000);
    const result = await getMulRateContract.muli(reg, rate);
    const expected = ((reg * up) / down);


    expect(result).to.equal(BigInt(expected));
  });

```

## License

This project is licensed under the MIT License.


This `README.md` file provides an overview of the `Muller` library, how to use it, how to test it, and includes an example of a TypeScript test file using Hardhat. Adjust paths and configurations as needed to fit your project's structure and setup.
