// creating config object for all variable

//Get dotenv
require("dotenv").config();

const config = {
    
  env: process.env.NODE_ENV,

  db: {
    remote: process.env.DB_REMOTE,
  },

  PORT: process.env.PORT,

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },

};

module.exports = config;
