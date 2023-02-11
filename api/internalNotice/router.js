import express from 'express';

import internalController from "./controller.js";
const internalRouter = express.Router();

// postInternalNotice and get internal notices 
internalRouter.route('/')
                .post(internalController.postInternal)
                .get(internalController.getInternals)

// update and delete internal notices
internalRouter.route('/:id')
                .patch(internalController.updateInternal)
                .delete(internalController.deleteInternal)

// search  for internal notice by subject
internalRouter.route('/search')
                .get(internalController.searchInternal)


export default internalRouter;