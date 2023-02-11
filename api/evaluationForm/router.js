import express from "express";
import evaluationController from "./controller.js";

const evaluationRouter = express.Router();

evaluationRouter.get("/", evaluationController.getEvaluations);
evaluationRouter.get("/:id", evaluationController.getEvaluation);
evaluationRouter.post("/", evaluationController.createEvaluation);
evaluationRouter.patch("/:id", evaluationController.editEvaluation);
evaluationRouter.delete("/:id", evaluationController.deleteEvaluation);

export default evaluationRouter;