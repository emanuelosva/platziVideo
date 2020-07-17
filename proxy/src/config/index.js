require('dotenv').config();

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 5000,
  api: {
    url: process.env.API_URL,
    keyToken: process.env.API_KEY_TOKEN,
  },
  auth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
    twitterConsumerKey: process.env.TWITTER_CUNSUMER_KEY,
    twitterConsumerSecret: process.env.TWITTER_CUNSUMER_SECRET,
  },
};
