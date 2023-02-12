import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    answer:{
        type: [String],
        // "VERY_GOOD", "GOOD", "FAIR", "POOR"
       
    }
    
},    { createdAt: 'created_at', updatedAt: 'updated_at' }
)

const Question = mongoose.model("Question", questionSchema)
export default Question;