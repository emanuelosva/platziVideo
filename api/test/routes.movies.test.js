const { describe } = require('mocha');
const assert = require('assert');
const proxyquire = require('proxyquire');
const testServer = require('../src/utils/testServer');
const { moviesMock, MoviesServiceMock } = require('../src/utils/mocks/movies');

describe('routes - movies', () => {
  const router = proxyquire('../src/routes/movies', {
    '../services/movies': MoviesServiceMock,
  });
  const request = testServer(router);

  describe('GET /movies', () => {
    it('should response with status 200', ((done) => {
      request.get('/api/movies').expect(200, done);
    }));
    it('should response with the list of movies', ((done) => {
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          error: false,
          message: "Movies listed",
          status: 200,
          body: moviesMock
        });
        done();
      });
    }));
  });

  describe('GET /movies/:movieId', () => {
    it('should response with status 200', ((done) => {
      request.get('/api/movies/5f0e392947a5890657b1945a').expect(200, done);
    }));
    it('should response with one movie', ((done) => {
      request.get('/api/movies/5f0e392947a5890657b1945a').end((err, res) => {
        assert.deepEqual(res.body, {
          error: false,
          message: "Movie retrieved",
          status: 200,
          body: moviesMock[0]
        });
        done();
      });
    }));
  });

  describe('POST /movies', () => {
    it('should response with status 201', ((done) => {
      request.post('/api/movies').expect(201, done);
    }));
    it('should response with one movie', ((done) => {
      request.post('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          error: false,
          message: "Movie created",
          status: 201,
          body: moviesMock[0]
        });
        done();
      });
    }));
  });

  describe('PUT /movies', () => {
    it('should response with status 200', ((done) => {
      request.put('/api/movies/5f0e392947a5890657b1945a').expect(200, done);
    }));
    it('should response with one movie', ((done) => {
      request.put('/api/movies/5f0e392947a5890657b1945a').end((err, res) => {
        assert.deepEqual(res.body, {
          error: false,
          message: "Movie updated",
          status: 200,
          body: moviesMock[0]
        });
        done();
      });
    }));
  });

  describe('PATCH /movies', () => {
    it('should response with status 200', ((done) => {
      request.patch('/api/movies/5f0e392947a5890657b1945a').expect(200, done);
    }));
    it('should response with one movie', ((done) => {
      request.patch('/api/movies/5f0e392947a5890657b1945a').end((err, res) => {
        assert.deepEqual(res.body, {
          error: false,
          message: "Movie updated",
          status: 200,
          body: moviesMock[0]
        });
        done();
      });
    }));
  });

  describe('DELETE /movies', () => {
    it('should response with status 200', ((done) => {
      request.delete('/api/movies/5f0e392947a5890657b1945a').expect(200, done);
    }));
    it('should response with one movie', ((done) => {
      request.delete('/api/movies/5f0e392947a5890657b1945a').end((err, res) => {
        assert.deepEqual(res.body, {
          error: false,
          message: "Movie deleted",
          status: 200,
          body: moviesMock[0]
        });
        done();
      });
    }));
  });

});
