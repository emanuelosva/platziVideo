/**
 * @fileoverview Services layer for apiKeys
*/

const MongoLib = require('../lib/db/mongo');

const COLLECTION = 'api-keys';

class ApiKeysService {
  constructor() {
    this.collection = COLLECTION;
    this.bd = new MongoLib(this.collection);
  }

  async getApiKeys({ token }) {
    const [apiKey] = await this.bd.getAll({ token })
    return apiKey;
  }
};

module.exports = ApiKeysService;
