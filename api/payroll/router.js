import express from "express";
import payrollController from "./controller.js";

const payrollRouter = express.Router();

payrollRouter.get("/", payrollController.getPayrolls);
payrollRouter.get("/:id", payrollController.getPayroll);
payrollRouter.post("/", payrollController.createPayroll);
payrollRouter.patch("/:id", payrollController.editPayroll);
payrollRouter.delete("/:id", payrollController.deletePayroll);

export default payrollRouter;