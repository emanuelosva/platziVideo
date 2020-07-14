/**
 * @fileoverview Services layer for movies
*/

const { moviesMock } = require('../utils/mocks/movies');

// Movies Services Object
class MoviesService {
  constructor() { };

  // Get all movies or filter by tag
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  };

  async getMovie() {
    const [movie] = await Promise.resolve(moviesMock);
    return movie || {};
  };

  async createMovie() {
    const [movie] = await Promise.resolve(moviesMock);
    return movie || {};
  };

  async updateMovie() {
    const [movie] = await Promise.resolve(moviesMock);
    return movie || {};
  };

  async deleteMovie() {
    const [movie] = await Promise.resolve(moviesMock);
    return movie || {};
  };
};

module.exports = MoviesService;
