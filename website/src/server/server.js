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
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="assets/app.css" type="text/css" />
        <title>Platzi video</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="assets/app.js" type="text/javascript"></script>
      </body>
    </html>
  `);
});

app.listen(PORT, (err) => {
  if (err) console.log(`ServerError -> ${err}`);
  else console.log(`Server running on http://localhost:${PORT}`);
});
