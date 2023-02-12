
import PollForm from './dal.js'
import AppError from "../../utils/appError.js";

const postPoll = async (req, res, next) => {

    try {

        req.body.creater = '63e807678745ed6cb3a1b6d3'
        const pollFo = await PollForm.postPollForm(req.body);
        console.log(pollFo)

        res.status(200).json({
            data: pollFo,
            success: true
        })

        return pollFo;

    } catch (error) {
        next(error);
    }

}


const updatePoll = async (req, res, next) => {

    try {

        const pollFo = await PollForm.updatePollForm(req.params.id, req.body);

        res.status(200).json({
            data: pollFo,
            success: true
        });

        
    } catch (error) {
        next(error);
    }

}


const deletePoll = async (req, res, next) => {

    try {
        const pollFo = await PollForm.deletePollForm(req.params.id);

        res.status(200).json({
            data: pollFo,
            success: true
        });
        
    } catch (error) {
        next(error);
    }
    
}

const getPollById = async (req, res, next) => {

    try {
        const pollFo = await PollForm.getPollForm(req.params.id);

        res.status(200).json({
            data: pollFo,
            success: true
        });
        
    } catch (error) {
        next(error);
    }
    
}

const getPollFormByPosition = async (req, res, next) => {

    try {
        const pollFo = await PollForm.getPollFormByPosition(req.params.positionId);

        res.status(200).json({
            data: pollFo,
            success: true
        });
        
    } catch (error) {
        next(error);
    }
    
}

const votePollForm = async (req, res, next) => {

    try {
        const candidateId = req.body.candidateId;
        const votersId = "63e807678745ed6cb3a1b6d3";
        await PollForm.votePoll(req.params.pollId, candidateId, votersId);

        res.status(200).json({
            success: true
        });
        
    } catch (error) {
        next(error);
    }
    
}

const unVotePollForm = async (req, res, next) => {

    try {

        const candidateId = req.body.candidateId;
        const votersId = "63e807678745ed6cb3a1b6d3";
        await PollForm.unVotePoll(req.params.pollId, candidateId, votersId);

        res.status(200).json({
            success: true
        });
        
    } catch (error) {
        console.log("nsfjeiurhiusdgheriustdgyheriutngretng")
        next(error);
    }
    

}

const pollController = {getPollById, updatePoll, deletePoll, postPoll, getPollFormByPosition, votePollForm, unVotePollForm};

export default pollController;