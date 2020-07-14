/**
 * @fileoverview Services layer for movies
*/

const MongoLib = require('../lib/db/mongo');

const COLLECTION = 'movies';

// Movies Services Object
class MoviesService {
  constructor() {
    this.collection = COLLECTION
    this.db = new MongoLib(this.collection)
  };

  // Get all movies or filter by tag
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.db.getAll(query);
    return movies || [];
  };

  async getMovie({ movieId }) {
    if (!movieId) return Promise.reject('Invalid data. No id');

    const movie = await this.db.get(movieId);
    return movie || {};
  };

  async createMovie({ movieData }) {
    const validData = (
      movieData.title && movieData.year &&
      movieData.cover && movieData.description &&
      movieData.duration && movieData.contentRating &&
      movieData.source && movieData.tags
    );
    if (!validData) return Promise.reject('Invalid or incomplete data');

    const [movie] = await this.db.create(movieData);
    return movie || {};
  };

  async updateMovie({ movieId, movieData } = {}) {
    if (!movieId || !movieData) return Promise.reject('No movie data or Id');

    const movie = await this.db.update(movieId, movieData);
    return movie || {};
  };

  async deleteMovie({ movieId }) {
    if (!movieId) return Promise.reject('No Id');

    await this.db.delete(movieId);
    return movieId;
  };
};

module.exports = MoviesService;
