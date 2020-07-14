require('dotenv').config();

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || '3000',
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    cluster: process.env.DB_CLUSTER,
  },
};
