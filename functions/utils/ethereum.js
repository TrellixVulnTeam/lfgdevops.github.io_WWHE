const { ethers } = require("ethers");
const CyberDeck = require("./abis/CyberDeck.json");
const Verifier = require("./abis/Verifier.json");
const ERC721 = require("./abis/ERC721.json");

const network = "matic";
const provider = new ethers.providers.InfuraProvider(network, {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET,
});

const cyberDeckAddress = process.env.CYBER_DECK_ADDRESS;
const verifierAddress = process.env.VERIFIER_ADDRESS;

const cyberDeckContract = new ethers.Contract(
  cyberDeckAddress,
  CyberDeck,
  provider
);

const verifierContract = new ethers.Contract(
  verifierAddress,
  Verifier,
  provider
);

async function verifySignature({ message, sig }) {
  try {
    let recovered = await verifierContract.verifyString(
      message,
      sig.v,
      sig.r,
      sig.s
    );
    console.log(recovered);
    return { ownerAddress: recovered };
  } catch (e) {
    return { error: e };
  }
}

async function getParentNft({ ownerAddress, index }) {
  try {
    const tokenId = await cyberDeckContract.tokenOfOwnerByIndex(
      ownerAddress,
      index
    );
    const parentNft = await cyberDeckContract.parentNfts(tokenId);
    const nftContract = new ethers.Contract(
      parentNft.tokenAddress,
      ERC721,
      provider
    );
    const ownerOfParent = await nftContract.ownerOf(parentNft.tokenId);
    let resp = {
      cyberDeckOwner: ownerAddress,
      index: index,
      tokenId: tokenId,
      parentTokenAddress: parentNft.tokenAddress,
      parentTokenId: parentNft.tokenId,
      parentTokenOwner: ownerOfParent,
    };
    return { tokenData: resp };
  } catch (e) {
    let resp = {
      cyberDeckOwner: ownerAddress,
      index: index,
      tokenId: -1,
      error: e,
    };
    return resp;
  }
}

async function getOwnedTokens({ ownerAddress }) {
  let balance = await cyberDeckContract.balanceOf(ownerAddress);
  balance = parseInt(balance.toString());
  if (balance === 0) {
    return { error: "User does not own a CyberDeck" };
  }
  let ownedNftPromises = [];
  for (let i = 0; i < balance; i++) {
    ownedNftPromises.push(
      getParentNft({ ownerAddress: ownerAddress, index: i })
    );
  }

  let ownedTokens = await Promise.all(ownedNftPromises);
  ownedTokens = ownedTokens.filter(
    (m) => m && ownerAddress.toString() === m.parentTokenOwner.toString()
  );

  return ownedTokens;
}

module.exports = {
  getOwnedTokens,
  verifySignature,
};
