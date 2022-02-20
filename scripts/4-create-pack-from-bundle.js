import { readFileSync } from "fs";
import { sdk } from "./helpers.js";

async function main() {
  const bundleModuleAddress = "0xaAAc617a3d5a37f881971540414b4fA25025d5e3"; // your bundle module address
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  const packModuleAddress = "0x7620659c07079162D36ca5143F200464687032db"; // your pack module address
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log("Getting all NFTs from bundle...");
  const nftsInBundle = await bundleModule.getAll();

  console.log("NFTs in bundle:");
  console.log(nftsInBundle);

  console.log("Creating a pack containing the NFTs from bundle...");
  const created = await packModule.create({
    assetContract: bundleModuleAddress,
    metadata: {
      name: "Fancy Rings Pack!",
      image: readFileSync("./assets/4.jpg"),
    },
    assets: nftsInBundle.map((nft) => ({
      tokenId: nft.metadata.id,
      amount: nft.supply,
    })),
  });

  console.log("Pack created!");
  console.log(created);
}

try {
  await main();
} catch (error) {
  console.error("Error minting the NFTs", error);
  process.exit(1);
}
