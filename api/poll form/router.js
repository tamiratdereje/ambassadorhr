
import express from "express";
import pollController from "./controller.js";

const pollRouter = express.Router();

// postInternalNotice and get internal notices 
pollRouter.route('/')
                .post(pollController.postPoll)
                
pollRouter.route('/:id')
                .get(pollController.getPollById)
                .patch(pollController.updatePoll)
                .delete(pollController.deletePoll)

                
pollRouter.route('/getByPosition/:positionId')
                .get(pollController.getPollFormByPosition)

pollRouter.route('/vote/:pollId')
                .patch(pollController.votePollForm)

pollRouter.route('/unvote/:pollId')
                .patch(pollController.unVotePollForm)

export default pollRouter;