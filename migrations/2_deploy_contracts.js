const CyberDeck = artifacts.require("./CyberDeck");
const FakeNFT = artifacts.require("./FakeNFT");
const URIRouter = artifacts.require("./URIRouter");
// const MarketPrice = artifacts.require("./MarketPrice");
const Verifier = artifacts.require("./Verifier");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const MINTER_ROLE =
  "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";

module.exports = async function (deployer) {
  const IPFS_IMAGE_METADATA_URI = `ipfs://${process.env.IPFS_IMAGE_METADATA_CID}/`;
  const IPFS_HIDDEN_IMAGE_METADATA_URI = `ipfs://${process.env.IPFS_HIDDEN_IMAGE_METADATA_CID}/hidden.json`;
  const NFT_MINT_DATE = new Date().getTime().toString().slice(0, 10);

  // await deployer.deploy(
  //   OpenEmoji,
  //   "process.env.PROJECT_NAME",
  //   "process.env.PROJECT_SYMBOL",
  //   "IPFS_IMAGE_METADATA_URI",
  //   "IPFS_HIDDEN_IMAGE_METADATA_URI",
  //   NFT_MINT_DATE
  // );

  await sleep(5000);
  //   cyberDeck = await CyberDeck.new(user4);
  //   fakeNft1 = await FakeNFT.new("Fake 1", "F1", "poop");
  //   fakeNft2 = await FakeNFT.new("Fake 2", "F2", "poop2");
  //   uriRouter = await URIRouter.new(cyberDeck.address);
  //   verifier = await Verifier.new();
  //   await cyberDeck.setURIRouter(uriRouter.address);
  //   await cyberDeck.setAllowedNft(fakeNft1.address, true);

  const cyberDeckResp = await deployer.deploy(
    CyberDeck,
    "0xF8f1A57429248cE6c6Dbeaf2FFeB84325Abf6945"
  );
  await sleep(5000);
  const f1Resp = await deployer.deploy(FakeNFT, "Fake1", "F1", "poo1");
  await sleep(5000);
  const f2Resp = await deployer.deploy(FakeNFT, "Fake2", "F2", "poo2");
  await sleep(5000);

  console.log(cyberDeckResp.address);
  const routerResp = await deployer.deploy(URIRouter, cyberDeckResp.address);
  await sleep(5000);

  const verifierResp = await deployer.deploy(Verifier);
  await sleep(5000);

  await cyberDeckResp.setURIRouter(routerResp.address);
  await sleep(5000);

  await cyberDeckResp.setAllowedNft(
    f2Resp.address,
    true,
    true,
    cyberDeckResp.address
  );
};
