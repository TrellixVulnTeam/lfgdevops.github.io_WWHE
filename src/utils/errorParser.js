const cyberDeckErrors = {
  "NFT is not exclusive": "NFT is not exclusive",
  "This NFT cannot be used": "This NFT cannot be used",
  "You are not owner of this NFT": "You are not owner of this NFT",
  "NFT has already been used to mint": "NFT has already been used to mint",
};

function parseError({ error, errorSet }) {
  for (const e in errorSet) {
    if (error.includes(e)) {
      return errorSet[e];
    }
  }
  return "Something went wrong...";
}

const errorParser = {
  cyberDeckErrors,
  parseError,
};

export default errorParser;
