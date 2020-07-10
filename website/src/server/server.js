import express from 'express';
import webpack from 'webpack';
import config from '../config';

const PORT = config.port;
const app = express();

if (config.env !== 'production') {
  console.log('Development config');

  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const conpiler = webpack(webpackConfig);
  const serverConfig = {
    port: PORT,
    hot: true,
  };

  app.use(webpackDevMiddleware(conpiler, serverConfig));
  app.use(webpackHotMiddleware(conpiler));
};

app.get('*', (req, res) => {
  res.send({ hello: 'express' });
});

app.listen(PORT, (err) => {
  if (err) console.log(`ServerError -> ${err}`);
  else console.log(`Server running on http://localhost:${PORT}`);
});
