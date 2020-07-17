/**
 * Oauth auth strategy
*/

const passport = require('passport');
const { OAuth2Strategy } = require('passport-oauth');
const axios = require('axios').default;
const boom = require('@hapi/boom');
const config = require('../../config');

const GOOGLE_AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

const oAuth2Strategy = new OAuth2Strategy(
  {
    authorizationURL: GOOGLE_AUTHORIZATION_URL,
    tokenURL: GOOGLE_TOKEN_URL,
    clientID: config.auth.googleClientId,
    clientSecret: config.auth.googleClientSecret,
    callbackURL: '/auth/google-oauth/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { data, status } = await axios({
      url: `${config.api.url}/api/auth/sign-provider`,
      method: 'POST',
      data: {
        name: profile.name,
        email: profile.email,
        password: profile.id,
        apiKeyToken: config.api.keyToken,
      },
    });

    if (!data || status !== 200) {
      return cb(boom.unauthorized(), null);
    }

    return cb(null, data.body);
  },
);

oAuth2Strategy.userProfile = function (accessToken, done) {
  this._oauth2.get(GOOGLE_USERINFO_URL, accessToken, (error, body) => {
    if (error) return done(error, null);

    try {
      const { sub, name, email } = JSON.parse(body);
      const profile = {
        id: sub,
        name,
        email,
      };
      done(null, profile);
    } catch (parseError) {
      return done(parseError, null);
    }
  });
};

passport.use('google-oauth', oAuth2Strategy);
