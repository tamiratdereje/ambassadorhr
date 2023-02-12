import express from "express";
import evaluationFormController from "./controller.js";

const evaluationFormRouter = express.Router();

evaluationFormRouter.get("/", evaluationFormController.getEvaluationForms);
evaluationFormRouter.get("/:id", evaluationFormController.getEvaluationForm);
evaluationFormRouter.post("/", evaluationFormController.createEvaluationForm);
evaluationFormRouter.patch("/:id", evaluationFormController.editEvaluationForm);
evaluationFormRouter.delete("/:id", evaluationFormController.deleteEvaluationForm);

export default evaluationFormRouter;