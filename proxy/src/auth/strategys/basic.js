/**
 * Basic auth strategy
*/

const passport = require('passport');
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom');
const axios = require('axios').default;
const config = require('../../config');

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    try {
      const { data, status } = await axios({
        url: `${config.api.url}/api/auth/sign-in`,
        method: 'POST',
        auth: {
          password,
          username: email,
        },
        data: {
          apiKeyToken: config.api.keyToken,
        },
      });

      if (!data.body || status !== 200) {
        return cb(boom.unauthorized(), null);
      }

      return cb(null, data.body);
    } catch (error) {
      cb(error, null);
    }
  }),
);
