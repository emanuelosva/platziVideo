const sinon = require('sinon');
const { moviesMock, filterMoviesMock } = require('./movies');

// --- Stubs ---
const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { $tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery)
  .resolves(filterMoviesMock('Drama'));

const getStub = sinon.stub().resolves(moviesMock[0].id)
const createStub = sinon.stub().resolves([moviesMock[0]]);
const updateStub = sinon.stub().resolves(moviesMock[0].id);
const deleteStub = sinon.stub().resolves(moviesMock[0].id);


class MongoLibMock {
  constructor(collection) {
    this.collection = collection;
  };

  getAll(query) {
    return getAllStub(this.collection, query);
  };

  get(id) {
    return getStub(id);
  };

  create(data) {
    return createStub(data);
  };

  update(id, data) {
    return updateStub(id, data);
  };

  delete(id) {
    return deleteStub(id);
  };
};

module.exports = {
  MongoLibMock,
  getAllStub,
  getStub,
  createStub,
  updateStub,
  deleteStub,
};
