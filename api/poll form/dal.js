import PollCandidate from './model.js';

class PollForm {

    static async postPollForm (data) {

        try {
            const candidateResult = await PollCandidate.Candidate.insertMany(data.candidates);
            let candidateIds = []
            for (let ele in candidateResult){
                candidateIds.push(candidateResult[ele]._id);
            }
            data.candidates = candidateIds;
            const pollfo = await PollCandidate.Poll(data).save();
            return pollfo;
            
        } catch (error) {
            throw error;
        }

    }

    static async getPollForm (id) {

        try {
            
            const poll = await PollCandidate.Poll.findById(id)
            return poll


        } catch (error) {
            throw error

        }
    }

    static async getPollFormByPosition (positionId) {

        try {
            
            const poll = await PollCandidate.Poll.find({voterPositions : positionId})
            return poll

        } catch (error) {
            throw error
            
        }
    }

    static async updatePollForm(_id, data){

        try {
            const updatePoll = await PollCandidate.Poll.findByIdAndUpdate(_id, data, {
                new: true,
                runValidators: true,
              });

            return updatePoll
            
        } catch (error) {
            
        }
    }

    static async deletePollForm(id) {

        try {
            const deletePoll = await PollCandidate.Poll.findByIdAndDelete(id);
            return deletePoll;
            
        } catch (error) {
            throw error;
        }
    }

    static async votePoll(pollId, candidateId, votersId) {

        try {
            const candi = await PollCandidate.Candidate.findById(candidateId);
            candi.votersId.push(votersId);
            candi.result += 1;
            await candi.save();
            return 
            
        } catch (error) {
            throw error;
            
        }
    }

    static async unVotePoll(pollId, candidateId, votId) {

        try {

            const candi = await PollCandidate.Candidate.findById(candidateId);
            let index = candi.votersId.indexOf(votId)

            if (index === -1){
                throw error;
            }
            candi.votersId.splice(index, 1);
            candi.result -= 1;
            await candi.save();

        } catch (error) {
            throw error;
        }   
    }       
}

export default PollForm;