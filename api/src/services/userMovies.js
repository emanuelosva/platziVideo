/**
 * @fileoverview Services layer for user movies
*/

const MongoLib = require('../lib/db/mongo');

const COLLECTION = 'user-movies';

class UserMoviesService {
  constructor() {
    this.collection = COLLECTION;
    this.db = new MongoLib(this.collection);
  }

  async getUserMovies({ userId }) {
    if (!userId) return Promise.reject('Invalid data. No Id');

    const query = { userId };
    const userMovies = await this.db.getAll(query);
    return userMovies || [];
  }

  async createUserMovie({ userMovie }) {
    if (!userMovie.userId || !userMovie.movieId) {
      return Promise.reject('Invalid or incomplete data');
    }

    const [createdUserMovie] = await this.db.create(userMovie);
    return createdUserMovie;
  }

  async deleteUserMovie({ userMovieId }) {
    if (!userMovieId) return Promise.reject('Invalid data. No id');

    await this.db.delete(userMovieId);
    return userMovieId;
  }
};

module.exports = UserMoviesService;
