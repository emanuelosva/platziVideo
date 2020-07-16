/**
 * @fileoverview Basic auth strategys
*/

const passport = require('passport');
const boom = require('@hapi/boom');
const { BasicStrategy } = require('passport-http');
const bcrypt = require('bcrypt');
const UsersService = require('../../../services/users');

passport.use(new BasicStrategy(async (email, password, cb) => {
  const usersService = new UsersService();
  try {
    const user = await usersService.getUser({ email });
    if (!user._id) {
      return cb(boom.unauthorized(), null);
    }

    const correctPassword = bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return cb(boom.unauthorized(), null);
    }

    delete user.password;
    return cb(null, user);
  } catch (error) {
    cb(error, null);
  }
}));
