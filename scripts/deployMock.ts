import { ethers } from 'hardhat';

async function main() {
  // Deploy and init needed contracts
  const MockERC721Test = await ethers.getContractFactory('MockERC721Test');
  for (let i = 0; i < 5; i++) {
    const mockERC721Test = await MockERC721Test.deploy(`Test${i + 1}`, `T${i + 1}`);
    await mockERC721Test.deployed();
    console.log(`Test ${i + 1} deployed:`, mockERC721Test.address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
