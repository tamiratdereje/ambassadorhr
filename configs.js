// creating config object for all variable

//Get dotenv
// require("dotenv").config();
import dontev from "dotenv";
dontev.config();

const configs = {
    
  env: process.env.NODE_ENV,

  db: {
    remote: process.env.DB_URL,
  },

  PORT: process.env.PORT,

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },

};

export default configs;
