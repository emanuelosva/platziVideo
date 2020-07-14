/**
 * @fileoverview Mongo connection
*/

const { MongoClient, ObjectId } = require('mongodb');
const config = require('../../../config');

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
    this.connection = undefined;
  }

  async connect() {
    if (this.connection) return this.connection;

    try {
      const client = await this.client.connect();
      this.connection = client.db(this.dbName);
      console.log('[mongoDb] -> connected successfully');
      return this.connection
    } catch (error) {
      console.error(`[mongoDb] -> ${error}`);
      process.exit(1);
    }
  }

  async getAll(query) {
    try {
      const db = await this.connect();
      const result = await db.collection(this.collection)
        .find(query)
        .toArray();

      return result;
    } catch (error) {
      console.error(`[mongoDb] -> ${error}`)
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
      console.error(`[mongoDb] -> ${error}`)
      process.exit(1);
    }
  }

  async create(data) {
    try {
      const db = await this.connect();
      const result = await db.collection(this.collection)
        .insertOne(data);

      return result;
    } catch (error) {
      console.error(`[mongoDb] -> ${error}`)
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

      return result;
    } catch (error) {
      console.error(`[mongoDb] -> ${error}`)
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
      console.error(`[mongoDb] -> ${error}`)
      process.exit(1);
    }
  }
};

module.exports = MongoLib;
