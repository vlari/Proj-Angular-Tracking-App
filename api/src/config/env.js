const dotenv = require('dotenv');

dotenv.config({ path: './src/config/.env' });

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SECRET_KEY: process.env.SECRET_KEY,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD
};

module.exports = env;
