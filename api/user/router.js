import express from "express";
import employeeController from "./controller.js";
import { isAuthenticated, isAuthorized } from "../../utils/auth.js";

const employeeRouter = express.Router();

employeeRouter.get("/", isAuthenticated, isAuthorized, employeeController.getEmployees);
employeeRouter.get("/:id", isAuthenticated, isAuthorized, employeeController.getEmployee);
employeeRouter.post("/", isAuthenticated, isAuthorized, employeeController.createEmployee);
employeeRouter.post("/login", employeeController.login);
employeeRouter.patch("/:id", isAuthenticated, isAuthorized, employeeController.editEmployee);
employeeRouter.delete("/:id", isAuthenticated, isAuthorized, employeeController.deleteEmployee);

export default employeeRouter;