import ky from "ky";

async function tweet({ message, signature }) {
  let resp;
  try {
    resp = await ky
      .post("/v1/tweet", {
        json: {
          message: message,
          signature: signature,
        },
        throwHttpErrors: false,
      })
      .json();
    return resp;
  } catch (e) {
    return { error: e };
  }
}

const api = {
  tweet: tweet,
};
export default api;
