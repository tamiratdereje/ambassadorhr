// Express
const express = require("express");

// App
const app = express();

// Require GEH
const geh = require('../api/geh')

// Routers

// User routers
const usersRouter = require("../api/v1/user/route");    //api not done yet

// Use Third party middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routers
app.use("/api/v1/users", usersRouter);     

//use Global error Handler
app.use(geh)

// Export App
module.exports = app;