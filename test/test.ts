import { ethers } from "hardhat";
import { expect } from "chai";

describe("getMulRateContract", function () {
  let getMulRateContract: any;

  before(async function () {
    const GetMulRateContract = await ethers.getContractFactory("getMulRateContract");
    getMulRateContract = await GetMulRateContract.deploy();
  });

  it("should getMulRate correctly", async function () {
    const up = BigInt(1);
    const down = BigInt(2);

    const result = await getMulRateContract.getMul(up, down);
    const expected = "340282366920938463463374607431768211457";
    expect(result).to.equal(BigInt(expected));
  });

  it("should multiply with fractional rate correctly", async function () {
    const reg = 1000;
    const up = 1;
    const down = 2;
    const rate = await getMulRateContract.getMul(up, down);

    const result = await getMulRateContract.muli(reg, rate);
    const expected = Math.floor((reg * up) / down);
    expect(result).to.equal(BigInt(expected));
  });

  it("should handle multiplying rate format correctly", async function () {
    const up = BigInt(83);
    const down = BigInt(100);

    const rate = await getMulRateContract.getMul("83", "100");


    const reg = BigInt(1000);
    const result = await getMulRateContract.muli(reg, rate);
    const expected = ((reg * up) / down);


    expect(result).to.equal(BigInt(expected));
  });
});
