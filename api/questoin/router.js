import express from "express";
import questionController from "./controller.js";

const questionRouter = express.Router();

questionRouter.get("/", questionController.getQuestions);
questionRouter.get("/:id", questionController.getQuestion);
questionRouter.post("/", questionController.createQuestion);
questionRouter.patch("/:id", questionController.editQuestion);
questionRouter.delete("/:id", questionController.deleteQuestion);

export default questionRouter;