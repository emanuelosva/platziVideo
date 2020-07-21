require('dotenv').config();

// Change port by env
let PORT;
process.env.NODE_ENV === 'production' ?
  PORT = process.env.PORT_PROD :
  PORT = process.env.PORT;

module.exports = {
  port: PORT,
  env: process.env.NODE_ENV,
  dev: process.env.NODE_ENV !== 'production',
  api: {
    url: process.env.API_URL,
    keyToken: process.env.API_KEY_TOKEN,
  },
};
