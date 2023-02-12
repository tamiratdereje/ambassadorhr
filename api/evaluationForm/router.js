import express from "express";
import evaluationFormController from "./controller.js";
import { isAuthenticated, isAuthorized } from "../../utils/auth.js";

const evaluationFormRouter = express.Router();

evaluationFormRouter.get("/", isAuthenticated, evaluationFormController.getEvaluationForms);
evaluationFormRouter.get("/:id", isAuthenticated, evaluationFormController.getEvaluationForm);
evaluationFormRouter.post("/", isAuthenticated, isAuthorized, evaluationFormController.createEvaluationForm);
evaluationFormRouter.patch("/:id", isAuthenticated, isAuthorized, evaluationFormController.editEvaluationForm);
evaluationFormRouter.delete("/:id", isAuthenticated, isAuthorized, evaluationFormController.deleteEvaluationForm);

export default evaluationFormRouter;