const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function tweet({ message }) {
  try {
    const response = await client.v1.tweet(message);
    return response;
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong tweeting..." };
  }
}

module.exports = {
  tweet,
  twitterClient: client,
};
