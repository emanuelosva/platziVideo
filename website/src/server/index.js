// Ignore style sheets in server
require('ignore-styles');

// Babel config
require('@babel/polyfill');
require('@babel/register')({
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
});

// Static files hooks
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif'],
  name: 'assets/[hash].[ext]',
});

// Express server
require('./server');
