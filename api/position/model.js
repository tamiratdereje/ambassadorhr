import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
    title: { type: String,required: true },
    initialSalary: { type: Number, required: true }

}, { createdAt: 'created_at', updatedAt: 'updated_at' }
)

const Position = mongoose.model("Position", positionSchema)
export default Position;