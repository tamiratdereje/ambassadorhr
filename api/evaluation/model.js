import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema({
    evaluatorId: mongoose.Types.ObjectId,
    evaluatedId: mongoose.Types.ObjectId,
    formId: mongoose.Types.ObjectId,
    result: {
        type: Object,
    } 
    
},    { createdAt: 'created_at', updatedAt: 'updated_at' }
)

const Evaluation = mongoose.model("Evaluation", evaluationSchema)
export default Evaluation;