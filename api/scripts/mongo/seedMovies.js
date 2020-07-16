// DEBUG=app:* node scripts/mongo/seedMovies.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:movies');
const MongoLib = require('../../src/lib/db/mongo');
const { moviesMock } = require('../../src/utils/mocks/movies');

const mongoDb = new MongoLib('movies');

const createMovie = async (movieData) => {
  const [movie] = await mongoDb.create(movieData);
  return movie._id;
};

const seedMovies = async () => {
  try {
    const promises = moviesMock.map(async (movie) => {
      const movieId = await createMovie(movie);
      debug(chalk.greenBright(`Movie created. Id: ${movieId}`));
    });

    await Promise.all(promises);
    process.exit(0);
  } catch (error) {
    debug(chalk.redBright(error));
    process.exit(1);
  }
};

seedMovies();
