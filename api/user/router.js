import express from "express";
import employeeController from "./controller.js";

const employeeRouter = express.Router();

employeeRouter.get("/", employeeController.getEmployees);
employeeRouter.get("/:id", employeeController.getEmployee);
employeeRouter.post("/", employeeController.createEmployee);
employeeRouter.post("/login", employeeController.login);
employeeRouter.patch("/:id", employeeController.editEmployee);
employeeRouter.delete("/:id", employeeController.deleteEmployee);

export default employeeRouter;