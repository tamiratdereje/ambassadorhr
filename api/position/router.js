import express from "express";
import positionController from "./controller.js";
import { isAuthenticated, isAuthorized } from "../../utils/auth.js";

const positionRouter = express.Router();

positionRouter.get("/", isAuthenticated, isAuthorized, positionController.getPositions);
positionRouter.get("/:id", isAuthenticated, isAuthorized, positionController.getPosition);
positionRouter.post("/", isAuthenticated, isAuthorized, positionController.createPosition);
positionRouter.patch("/:id", isAuthenticated, isAuthorized, positionController.editPosition);
positionRouter.delete("/:id", isAuthenticated, isAuthorized, positionController.deletePosition);

export default positionRouter;