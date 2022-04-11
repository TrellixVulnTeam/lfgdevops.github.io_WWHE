const CyberDeck = artifacts.require("./CyberDeck");
const FakeNFT = artifacts.require("./FakeNFT");
const URIRouter = artifacts.require("./URIRouter");
// const MarketPrice = artifacts.require("./MarketPrice");
const Verifier = artifacts.require("./Verifier");

require("chai").use(require("chai-as-promised")).should();
const { ethers } = require("ethers");

const EVM_REVERT = "VM Exception while processing transaction: revert";

contract("CyberDeck", ([deployer, user, user2, user3, user4]) => {
  const MINTER_ROLE =
    "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
  let cyberDeck;
  let fakeNft1;
  let fakeNft2;
  let fakeNft3;
  let uriRouter;
  let verifier;
  describe("Minting", () => {
    let result;
    beforeEach(async () => {
      cyberDeck = await CyberDeck.new(user4);
      fakeNft1 = await FakeNFT.new("Fake 1", "F1", "poop");
      fakeNft2 = await FakeNFT.new("Fake 2", "F2", "poop2");
      uriRouter = await URIRouter.new(cyberDeck.address);
      verifier = await Verifier.new();
      await cyberDeck.setURIRouter(uriRouter.address);
      await cyberDeck.setAllowedNft(fakeNft1.address, true);
    });
    it("Mints CyberDeck", async () => {
      await fakeNft1.buy({ from: user });
      await cyberDeck.buy(fakeNft1.address, 1, {
        from: user,
        value: ethers.utils.parseEther(".12"),
      });
      result = await cyberDeck.balanceOf(user);
      result.toString().should.equal("1");
      result = await cyberDeck.parentNfts(0);
      result.tokenAddress.toString().should.equal(fakeNft1.address.toString());
      result.tokenId.toString().should.equal("1");
      result = await cyberDeck.tokenURI(0);
      console.log(result);
    });
    it("Pays Wrong Price for CyberDeck", async () => {
      await fakeNft1.buy({ from: user });
      await cyberDeck
        .buy(fakeNft1.address, 1, {
          from: user,
          value: ethers.utils.parseEther(".11"),
        })
        .should.be.rejectedWith(EVM_REVERT);
    });
    it("Tries to pass in nft that isnt owned by user", async () => {
      await fakeNft1.buy({ from: user2 });
      await fakeNft1.buy({ from: user });

      await cyberDeck
        .buy(fakeNft1.address, 1, {
          from: user,
          value: ethers.utils.parseEther(".12"),
        })
        .should.be.rejectedWith(EVM_REVERT);
    });
    it("Tries to buy non exclusive nft", async () => {
      await fakeNft2.buy({ from: user });
      await cyberDeck
        .buy(fakeNft2.address, 1, {
          from: user,
          value: ethers.utils.parseEther(".12"),
        })
        .should.be.rejectedWith(EVM_REVERT);
    });
    it("Tries to mint 2 of the same nft", async () => {
      await fakeNft1.buy({ from: user });
      await cyberDeck.buy(fakeNft1.address, 1, {
        from: user,
        value: ethers.utils.parseEther(".12"),
      });
      result = await cyberDeck.balanceOf(user);
      result.toString().should.equal("1");
      result = await cyberDeck.parentNfts(0);
      result.tokenAddress.toString().should.equal(fakeNft1.address.toString());
      result.tokenId.toString().should.equal("1");
      await cyberDeck
        .buy(fakeNft1.address, 1, {
          from: user,
          value: ethers.utils.parseEther(".12"),
        })
        .should.be.rejectedWith(EVM_REVERT);
    });
    it("Mints 2 CyberDecks", async () => {
      await fakeNft1.buy({ from: user });
      await cyberDeck.buy(fakeNft1.address, 1, {
        from: user,
        value: ethers.utils.parseEther(".12"),
      });
      result = await cyberDeck.balanceOf(user);
      result.toString().should.equal("1");
      result = await cyberDeck.parentNfts(0);
      result.tokenAddress.toString().should.equal(fakeNft1.address.toString());
      result.tokenId.toString().should.equal("1");
      await fakeNft1.buy({ from: user2 });
      await cyberDeck.buy(fakeNft1.address, 2, {
        from: user2,
        value: ethers.utils.parseEther(".12"),
      });
      result = await cyberDeck.balanceOf(user2);
      result.toString().should.equal("1");
      result = await cyberDeck.parentNfts(1);
      result.tokenAddress.toString().should.equal(fakeNft1.address.toString());
      result.tokenId.toString().should.equal("2");
      await fakeNft1.buy({ from: user });
      await cyberDeck.buy(fakeNft1.address, 3, {
        from: user,
        value: ethers.utils.parseEther(".12"),
      });
      result = await cyberDeck.balanceOf(user);
      result.toString().should.equal("2");
      result = await cyberDeck.parentNfts(2);
      result.tokenAddress.toString().should.equal(fakeNft1.address.toString());
      result.tokenId.toString().should.equal("3");
    });
    it("Signs Message", async () => {
      await fakeNft1.buy({ from: user });
      await cyberDeck.buy(fakeNft1.address, 1, {
        from: user,
        value: ethers.utils.parseEther(".12"),
      });
      result = await cyberDeck.balanceOf(user);
      result.toString().should.equal("1");
      result = await cyberDeck.parentNfts(0);
      result.tokenAddress.toString().should.equal(fakeNft1.address.toString());
      result.tokenId.toString().should.equal("1");
      result = await cyberDeck.tokenURI(0);
      console.log(result);
    });
  });
});
