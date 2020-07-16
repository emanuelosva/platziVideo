// DEBUG=app:* node scripts/mongo/seedUsers.js

const bcrypt = require('bcrypt');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const MongoLib = require('../../src/lib/db/mongo');
const config = require('../../config');

const users = [
  {
    email: 'root@admin.com',
    name: 'ROOT',
    password: config.default.adminPassword,
    isAdmin: true,
  },
  {
    email: 'many@user.com',
    name: 'Many',
    password: config.default.userPassword,
    isAdmin: false,
  }, {
    email: 'clau@user.com',
    name: 'Clau',
    password: config.default.userPassword,
    isAdmin: false,
  },
];

const mongoDb = new MongoLib('users');

const createUser = async (user) => {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [newUser] = await mongoDb.create({
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin),
  });
  return newUser._id;
};

const seedUsers = async () => {
  try {
    const promises = users.map(async (user) => {
      const userId = await createUser(user);
      debug(chalk.greenBright(`User created with ID: ${userId}`));
    });

    await Promise.all(promises);
    process.exit(0);
  } catch (error) {
    debug(chalk.redBright(error));
    process.exit(1);
  }
};

seedUsers();
