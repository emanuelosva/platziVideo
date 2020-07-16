/**
 * @fileoverview Basic auth strategys
*/

const passport = require('passport');
const boom = require('@hapi/boom');
const { Strategy, ExtractJwt } = require('passport-jwt');
const UsersService = require('../../../services/users');
const config = require('../../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (tokenPayload, cb) => {
      const usersService = new UsersService();
      try {
        const user = await usersService.getUser({
          email: tokenPayload.email
        });

        if (!user._id) {
          return cb(boom.unauthorized(), null);
        }

        delete user.password;
        cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (error) {
        cb(error, null);
      }
    },
  )
);
