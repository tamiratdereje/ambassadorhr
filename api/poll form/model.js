

import mongoose from 'mongoose';


const PollSchema = new mongoose.Schema({
    
    title : {
        type: String,
        required: [true, 'Please add title ']
        
    },

    description: {
        type : String,
        required: [true, 'Please add subjects '],
    },

    creater : {
        type: mongoose.Types.ObjectId,
        required:  [true, 'Please creater id ']
    },

    createdAt :{
        type: Date,
        default: Date.now()
    },

    updatedAt : {
        type: Date,
        default: Date.now()
    },

    deadline :{
        type: Date,
        required:  [true, 'Please enter deadline']
    },

    voterPositions : {
        type: [mongoose.Types.ObjectId],
        required:  [true, 'Please voters positions ']
    },
    
    candidates : {
        type : [Candidate],
        required: [true, "please provide candidates"]
    }
  
    },
)

const CandidateSchema = new mongoose.Schema({

    candidate: {
        type: mongoose.Types.ObjectId,
        required : [true, 'please provide the candidate index'],
        ref: "employee"
    },

    result: {
        type: Number,
        default: 0
    }

})

const Poll = mongoose.model("Poll", PollSchema)
const Candidate = mongoose.model("Candidate", CandidateSchema)

const PollCandidate = {Poll, Candidate}

export default PollCandidate;