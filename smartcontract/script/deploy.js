const hre = require("hardhat");
//  0xaEEc7BF7f05becb02cfBe326eeB5A21238CA2481
async function main() {
  const jobBoard = await hre.ethers.getContractFactory("JobBoard");

  console.log("Deploying JobBoard contract...");


  const JobBoard = await jobBoard.deploy(); 

  await JobBoard.waitForDeployment(); 

  console.log(`✅ MyNFT deployed to: ${JobBoard.target}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
