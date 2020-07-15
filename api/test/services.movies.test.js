const { describe } = require('mocha');
const assert = require('assert');
const proxyquire = require('proxyquire');
const { moviesMock } = require('../src/utils/mocks/movies');
const {
  MongoLibMock,
  createStub,
  getAllStub,
  getStub,
  updateStub,
  deleteStub
} = require('../src/utils/mocks/mongoLib');

describe('services - movies', () => {
  const MoviesServices = proxyquire('../src/services/movies', {
    '../lib/db/mongo': MongoLibMock,
  });
  const moviesServices = new MoviesServices();

  describe('when getMovies method is called', (async () => {
    it('should could getAll MongoLib method', (async () => {
      await moviesServices.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    }));
    it('should return an array of movies', (async () => {
      const result = await moviesServices.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    }));
  }));

  describe('when getMovie method is called', (async () => {
    it('should could get MongoLib method', (async () => {
      await moviesServices.getMovie({ movieId: 'id' });
      assert.strictEqual(getStub.called, true);
    }));
    it('should return a movie Id', (async () => {
      const result = await moviesServices.getMovie({ movieId: 'id' });
      const expected = moviesMock[0].id;
      assert.strictEqual(result, expected);
    }));
  }));

  describe('when createMovie method is called', (async () => {
    it('should could create MongoLib method', (async () => {
      await moviesServices.createMovie({ movieData: moviesMock[0] });
      assert.strictEqual(createStub.called, true);
    }));
    it('should return a movie Id', (async () => {
      const result = await moviesServices.createMovie({ movieData: moviesMock[0] });
      const expected = moviesMock[0];
      assert.strictEqual(result, expected);
    }));
  }));

  describe('when updateMovie method is called', (async () => {
    it('should could update MongoLib method', (async () => {
      await moviesServices.updateMovie({ movieId: 'id', movieData: 'data' });
      assert.strictEqual(updateStub.called, true);
    }));
    it('should return a movie Id', (async () => {
      const result = await moviesServices.updateMovie({ movieId: 'id', movieData: 'data' });
      const expected = moviesMock[0].id;
      assert.strictEqual(result, expected);
    }));
  }));

  describe('when deleteMovie method is called', (async () => {
    it('should could update MongoLib method', (async () => {
      await moviesServices.deleteMovie({ movieId: 'id' });
      assert.strictEqual(deleteStub.called, true);
    }));
    it('should return a movie Id', (async () => {
      const result = await moviesServices.deleteMovie({ movieId: 'id' });
      const expected = 'id';
      assert.strictEqual(result, expected);
    }));
  }));

});
