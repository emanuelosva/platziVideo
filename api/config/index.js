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
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
  },
  default: {
    userPassword: process.env.DEFAULT_USER_PASSWORD,
    adminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
  }
};
