// Express
import express, { json, urlencoded } from "express";
import employeeRouter from "../api/user/router.js";

// App
const app = express();

// Require GEH
import geh from '../api/geh/index.js';
import payrollRouter from "../api/payroll/router.js";
import internalRouter from '../api/internalNotice/router.js';
import evaluationRouter from "../api/evaluationForm/router.js";
import positionRouter from "../api/position/router.js";

// Routers

// User routers
// const usersRouter = require("../api/user/route");    //api not done yet

// Use Third party middlewares

app.use(json());
app.use(urlencoded({ extended: false }));

// Use routers
// app.use("/api/v1/users", usersRouter);
app.use("/api/v1/employee", employeeRouter);
app.use("/api/v1/payroll", payrollRouter);
app.use("/api/v1/internalNotice", internalRouter);

app.use("/api/v1/evaluation", evaluationRouter);
app.use("/api/v1/position", positionRouter);

//use Global error Handler
app.use(geh)

// Export App
export default app;