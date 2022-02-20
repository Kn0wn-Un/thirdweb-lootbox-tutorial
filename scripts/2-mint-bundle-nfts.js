import { readFileSync } from "fs";
import { sdk } from "./helpers.js";

async function main() {
  // Paste in the address from when you created the bundle collection module
  const bundleModuleAddress = "0xaAAc617a3d5a37f881971540414b4fA25025d5e3";
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  console.log("Creating NFT batch...");

  const created = await bundleModule.createAndMintBatch([
    {
      metadata: {
        name: "Ring 1",
        description: "A pretty pink ring!",
        image: readFileSync("./assets/1.jpg"),
        properties: {
          rarity: "a bit rare",
          fanciness: 7,
        },
      },
      supply: 50,
    },
    {
      metadata: {
        name: "Ring 2",
        description: "A pretty green ring!",
        image: readFileSync("./assets/2.jpg"),
        properties: {
          rarity: "a bit rare",
          fanciness: 7,
        },
      },
      supply: 50,
    },
    {
      metadata: {
        name: "Ring 3",
        description: "A super fancy blue ring!",
        image: readFileSync("./assets/3.jpg"),
        properties: {
          rarity: "super rare!",
          fanciness: 10,
        },
      },
      supply: 10,
    },
  ]);

  console.log("NFTs created!");
  console.log(JSON.stringify(created, null, 2));
}

try {
  await main();
} catch (error) {
  console.error("Error minting the NFTs", error);
  process.exit(1);
}
