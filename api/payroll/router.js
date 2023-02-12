import express from "express";
import payrollController from "./controller.js";
import { isAuthenticated, isAuthorized  } from "../../utils/auth.js";

const payrollRouter = express.Router();

payrollRouter.get("/", isAuthenticated, isAuthorized, payrollController.getPayrolls);
payrollRouter.get("/:id", isAuthenticated, isAuthorized, payrollController.getPayroll);
payrollRouter.post("/", isAuthenticated, isAuthorized, payrollController.createPayroll);
payrollRouter.patch("/:id", isAuthenticated, isAuthorized, payrollController.editPayroll);
payrollRouter.delete("/:id", isAuthenticated, isAuthorized, payrollController.deletePayroll);

export default payrollRouter;