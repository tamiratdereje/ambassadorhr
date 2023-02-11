import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
    employeeId: mongoose.Types.ObjectId,
    status: {
        type: String, 
        enum: ["UNPAID", "PAID", "REJECTED", "CUTOFF"],
        default: "UNPAID"
    },
    description: {
        type: String,
    } 
    
},    { createdAt: 'created_at', updatedAt: 'updated_at' }
)

const Payroll = mongoose.model("Payroll", payrollSchema)
export default Payroll;