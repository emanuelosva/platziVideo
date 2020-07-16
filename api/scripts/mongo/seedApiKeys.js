// DEBUG=app:* node scripts/mongo/seedApiKeys.js

const crypto = require('crypto');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:movies');
const MongoLib = require('../../src/lib/db/mongo');

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'create:movies',
  'update:movies',
  'delete:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies',
];

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'read:user-movies',
  'create:user-movies',
  'delete:user-movies',
];

const generateRandomToken = () => {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
};

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes,
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes,
  }
];

const seedApiKeys = async () => {
  try {
    const mongoDB = new MongoLib('api-keys');

    const promises = apiKeys.map(async apiKey => {
      await mongoDB.create(apiKey);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} api keys have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
};

seedApiKeys();
