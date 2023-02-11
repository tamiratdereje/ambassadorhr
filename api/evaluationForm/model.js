import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questionId: {
        type: [mongoose.Types.ObjectId],
        require: true
    },
    evaluatedPositions: {
        type: [mongoose.Types.ObjectId],
        require: true
    },
    evaluatorPositions: {
        type: [mongoose.Types.ObjectId],
        require: true
    },
    deadline: {
        type: Date,
        required: true
    }
},    { createdAt: 'created_at', updatedAt: 'updated_at' }
)

const Evaluation = mongoose.model("Evaluation", evaluationSchema)
export default Evaluation;