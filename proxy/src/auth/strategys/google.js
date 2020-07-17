const passport = require('passport');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const axios = require('axios').default;
const config = require('../../config');
const boom = require('@hapi/boom');

passport.use(new GoogleStrategy(
  {
    clientID: config.auth.googleClientId,
    clientSecret: config.auth.googleClientSecret,
    callbackURL: '/auth/google/callback',
  },
  async (accesToken, refreshToken, profile, cb) => {
    const { data, status } = await axios({
      url: `${config.api.url}/api/auth/sign-provider`,
      method: 'POST',
      data: {
        name: profile._json.name,
        email: profile._json.email,
        password: profile.id,
        apiKeyToken: config.api.keyToken,
      },
    });

    if (!data || status !== 200) return cb(boom.unauthorized(), null);

    return cb(null, data.body);
  },
));
