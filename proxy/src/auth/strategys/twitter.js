/**
 * Oauth auth strategy
*/

const passport = require('passport');
const { Strategy: TwitterStrategy } = require('passport-twitter');
const axios = require('axios').default;
const boom = require('@hapi/boom');
const config = require('../../config');

passport.use(new TwitterStrategy(
  {
    consumerKey: config.auth.twitterConsumerKey,
    consumerSecret: config.auth.twitterConsumerSecret,
    callbackURL: '/auth/twitter/callback',
    includeEmail: true,
  },
  async (tokenSecret, profile, cb) => {
    const { data, status } = await axios({
      url: `${config.api.url}/api/auth/sign-provider`,
      method: 'POST',
      data: {
        name: profile.displayName,
        email: profile.emails[0].value || `${profile.username}@twitter.com`,
        password: profile.id,
        apiKeyToken: config.api.keyToken,
      },
    });

    if (!data || status !== 200) return cb(boom.unauthorized(), null);

    return cb(null, data.body);
  },
));
