import express from "express";
import positionController from "./controller.js";

const positionRouter = express.Router();

positionRouter.get("/", positionController.getPositions);
positionRouter.get("/:id", positionController.getPosition);
positionRouter.post("/", positionController.createPosition);
positionRouter.patch("/:id", positionController.editPosition);
positionRouter.delete("/:id", positionController.deletePosition);

export default positionRouter;