const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Counter", function () {
  // Fixture to deploy Counter contract for each test
  async function deployCounterFixture() {
    // Get signers for testing
    const [owner, otherAccount] = await ethers.getSigners();

    // Deploy Counter contract
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    return { counter, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should initialize count to 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // Check initial count is 0
      expect(await counter.count()).to.equal(0);
      expect(await counter.getCount()).to.equal(0);
    });
  });

  describe("Increment Function", function () {
    it("Should increment count by 1", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // Increment and check
      await counter.increment();
      expect(await counter.count()).to.equal(1);
      expect(await counter.getCount()).to.equal(1);
    });

    it("Should increment multiple times correctly", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // Increment 5 times
      for (let i = 0; i < 5; i++) {
        await counter.increment();
      }
      
      expect(await counter.count()).to.equal(5);
      expect(await counter.getCount()).to.equal(5);
    });

    it("Should allow other accounts to increment", async function () {
      const { counter, otherAccount } = await loadFixture(deployCounterFixture);
      
      // Other account increments
      await counter.connect(otherAccount).increment();
      expect(await counter.count()).to.equal(1);
    });
  });

  describe("Decrement Function", function () {
    it("Should decrement count by 1", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // First increment to 2, then decrement
      await counter.increment();
      await counter.increment();
      await counter.decrement();
      
      expect(await counter.count()).to.equal(1);
      expect(await counter.getCount()).to.equal(1);
    });

    it("Should handle negative numbers", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // Decrement from 0 to go negative
      await counter.decrement();
      expect(await counter.count()).to.equal(-1);
      expect(await counter.getCount()).to.equal(-1);
    });

    it("Should allow other accounts to decrement", async function () {
      const { counter, otherAccount } = await loadFixture(deployCounterFixture);
      
      // Other account decrements
      await counter.connect(otherAccount).decrement();
      expect(await counter.count()).to.equal(-1);
    });
  });

  describe("Reset Function", function () {
    it("Should reset count to 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // Change count then reset
      await counter.increment();
      await counter.increment();
      await counter.reset();
      
      expect(await counter.count()).to.equal(0);
      expect(await counter.getCount()).to.equal(0);
    });

    it("Should reset negative count to 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // Go negative then reset
      await counter.decrement();
      await counter.decrement();
      await counter.reset();
      
      expect(await counter.count()).to.equal(0);
      expect(await counter.getCount()).to.equal(0);
    });

    it("Should allow other accounts to reset", async function () {
      const { counter, otherAccount } = await loadFixture(deployCounterFixture);
      
      // Increment, then other account resets
      await counter.increment();
      await counter.connect(otherAccount).reset();
      
      expect(await counter.count()).to.equal(0);
    });
  });

  describe("GetCount Function", function () {
    it("Should return correct count value", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // Test different count values
      expect(await counter.getCount()).to.equal(0);
      
      await counter.increment();
      expect(await counter.getCount()).to.equal(1);
      
      await counter.decrement();
      await counter.decrement();
      expect(await counter.getCount()).to.equal(-1);
    });
  });

  describe("Complex Operations", function () {
    it("Should handle mixed increment/decrement operations", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      // Complex sequence: +3, -2, +1, -1 = +1
      await counter.increment();
      await counter.increment();
      await counter.increment();
      await counter.decrement();
      await counter.decrement();
      await counter.increment();
      await counter.decrement();
      
      expect(await counter.count()).to.equal(1);
      expect(await counter.getCount()).to.equal(1);
    });

    it("Should maintain state across multiple transactions", async function () {
      const { counter, owner, otherAccount } = await loadFixture(deployCounterFixture);
      
      // Mixed operations by different accounts
      await counter.connect(owner).increment();
      await counter.connect(otherAccount).increment();
      await counter.connect(owner).decrement();
      
      expect(await counter.count()).to.equal(1);
    });
  });
});
