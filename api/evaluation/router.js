import express from "express";
import evaluationController from "./controller.js";
import { isAuthenticated, isAuthorized } from "../../utils/auth.js";

const evaluationRouter = express.Router();

evaluationRouter.get("/", isAuthenticated, isAuthorized, evaluationController.getEvaluations);
evaluationRouter.get("/:id", isAuthenticated, isAuthorized, evaluationController.getEvaluation);
evaluationRouter.post("/", evaluationController.createEvaluation);
evaluationRouter.patch("/:id", isAuthenticated, isAuthorized, evaluationController.editEvaluation);
evaluationRouter.delete("/:id", isAuthenticated, isAuthorized, evaluationController.deleteEvaluation);

export default evaluationRouter;