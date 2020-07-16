/**
 * @fileoverview Mongo connection
*/

const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug');
const config = require('../../../config');

// Logs
const debugDb = debug('app:db');
const debugErr = debug('app:error');

// Connection credential
const USER = encodeURIComponent(config.db.user);
const PASSWORD = encodeURIComponent(config.db.password);
const DB_NAME = config.db.name;
const DB_CLUSTER = config.db.cluster;
const Q_CONF = 'retryWrites=true&w=majority';
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_CLUSTER}/${DB_NAME}?${Q_CONF}`;

class MongoLib {
  constructor(collection) {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.dbName = DB_NAME;
    this.collection = collection;
  }

  async connect() {
    if (!MongoLib.connection) {
      try {
        const client = await this.client.connect()
        MongoLib.connection = client.db(this.dbName);
        debugDb('[mongoDb] -> connected successfully');
      } catch (error) {
        debugErr(`[mongoDb] -> ${error}`);
        process.exit(1);
      }
    }

    return MongoLib.connection;
  }

  async getAll(query) {
    try {
      const db = await this.connect();
      const result = await db.collection(this.collection)
        .find(query)
        .toArray();

      return result;
    } catch (error) {
      debugErr(`[mongoDb] -> ${error}`)
      process.exit(1);
    }
  }

  async get(id) {
    try {
      const db = await this.connect();
      const result = await db.collection(this.collection)
        .findOne({ _id: ObjectId(id) });

      return result;
    } catch (error) {
      debugErr(`[mongoDb] -> ${error}`)
      process.exit(1);
    }
  }

  async create(data) {
    try {
      const db = await this.connect();
      const result = await db.collection(this.collection)
        .insertOne(data);

      return result.ops;
    } catch (error) {
      debugErr(`[mongoDb] -> ${error}`)
      process.exit(1);
    }
  }

  async update(id, data) {
    try {
      const db = await this.connect();
      const result = await db.collection(this.collection)
        .updateOne(
          { _id: ObjectId(id) },
          { $set: data },
          { $upsert: true },
        );

      return result.upsertedId;
    } catch (error) {
      debugErr(`[mongoDb] -> ${error}`)
      process.exit(1);
    }
  }

  async delete(id) {
    try {
      const db = await this.connect();
      const result = await db.collection(this.collection)
        .deleteOne({ _id: ObjectId(id) });

      return result;
    } catch (error) {
      debugErr(`[mongoDb] -> ${error}`)
      process.exit(1);
    }
  }
};

module.exports = MongoLib;
