import express from "express";
import { isAuthenticated, isAuthorized} from "../../utils/auth.js";
import questionController from "./controller.js";

const questionRouter = express.Router();

questionRouter.get("/", isAuthenticated, questionController.getQuestions);
questionRouter.get("/:id", isAuthenticated, questionController.getQuestion);
questionRouter.post("/", isAuthenticated, isAuthorized, questionController.createQuestion);
questionRouter.patch("/:id", isAuthenticated, isAuthorized, questionController.editQuestion);
questionRouter.delete("/:id", isAuthenticated, isAuthorized, questionController.deleteQuestion);

export default questionRouter;