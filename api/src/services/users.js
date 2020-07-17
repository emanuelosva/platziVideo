/**
 * @fileoverview Services layer for users
*/

const bcrypt = require('bcrypt');
const MongoLib = require('../lib/db/mongo');

const COLLECTION = 'users';

class UsersService {
  constructor() {
    this.collection = COLLECTION;
    this.db = new MongoLib(this.collection);
  }

  async getUser({ email }) {
    if (!email) return Promise.reject('Invalid data. No email');

    const [user] = await this.db.getAll({ email });
    return user || {};
  }

  async createUser({ userData }) {
    if (!userData.name || !userData.email || !userData.password) {
      return Promise.reject('Invalid or incomplete data');
    }

    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUSer = {
      name,
      email,
      password: hashedPassword,
      isAdmin: userData.isAdmin ? userData.isAdmin : false,
    };

    const [user] = await this.db.create(newUSer);
    return user;
  }

  async updateUser({ userId, userData }) {
    if (!userId || !userData) {
      return Promise.reject('Invalid data. Mo Id or data');
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = await this.db.update(userId, userData);
    return user || {};
  }

  async getOrCreateUser({ userData }) {
    const queriedUser = await this.getUser({ email: userData.email });
    if (queriedUser._id) return queriedUser;

    await this.createUser({ userData });
    return await this.getUser({ email: userData.email });
  };
};

module.exports = UsersService;
