// Express
import express, { json, urlencoded } from "express";
import employeeRouter from "../api/user/router.js";

// App
const app = express();

// Require GEH
import geh from '../api/geh/index.js';

// Routers

// User routers
// const usersRouter = require("../api/user/route");    //api not done yet

// Use Third party middlewares

app.use(json());
app.use(urlencoded({ extended: false }));

// Use routers
// app.use("/api/v1/users", usersRouter);
app.use("/api/v1/employee", employeeRouter)     

//use Global error Handler
app.use(geh)

// Export App
export default app;