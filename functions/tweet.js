const { response, jsonBodyParser } = require("./utils/middlewares");
const { verifySignature, getOwnedTokens } = require("./utils/ethereum");
const { tweet } = require("./utils/twitter");

exports.handler = async function (event, context) {
  try {
    jsonBodyParser(event);

    const { message, signature } = event.body;

    const verifySigResponse = await verifySignature({
      message: message,
      sig: signature,
    });

    if (verifySigResponse.error) {
      return response(event, { error: "Could not verify signature" });
    }

    const ownerAddress = verifySigResponse.ownerAddress;

    const ownedTokensResponse = await getOwnedTokens({
      ownerAddress: ownerAddress,
    });

    if (ownedTokensResponse.error) {
      return response(event, { error: ownedTokensResponse.error });
    }

    const ownedTokens = ownedTokensResponse.ownedTokens;

    if (ownedTokens.length === 0) {
      return response(event, {
        error: "User Doesn't own a CyberDeck and Associated NFT",
      });
    }

    await tweet({ message: message });

    return response(event, { success: true });
  } catch (e) {
    console.log(e);
    return response(event, { error: e });
  }
};
