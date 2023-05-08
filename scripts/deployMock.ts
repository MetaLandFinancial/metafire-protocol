import { ethers } from 'hardhat';

async function main() {
  // Deploy and init needed contracts
  const MockERC721Test = await ethers.getContractFactory('MockERC721Test');
  for (let i = 0; i < 5; i++) {
    const mockERC721Test = await MockERC721Test.deploy(`Test${i + 1}`, `T${i + 1}`);
    await mockERC721Test.deployed();
    console.log(`Test ${i + 1} deployed:`, mockERC721Test.address);
    for (let j = 0; j < 3; j++) {
      const tx = await mockERC721Test.mint({ value: ethers.utils.parseEther('0.01') });
      await tx.wait();
    }
  }
}

// Goerli deployments
// Test 1 deployed: 0xbBB0C17F7df232FB99CFc21b3951Bd9EEFA4Ec6c
// Test 2 deployed: 0x69A3a05A9017E84629473A7e1fcB19A14d656864
// Test 3 deployed: 0xC609480860327e61E0508A088E8e9e98be693659
// Test 4 deployed: 0x09506E80052df22F11E22889a2fFb4F8F0b202f7
// Test 5 deployed: 0x94085Dd920D16E134D351Cd7cfBcb3b3306EcacD

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
