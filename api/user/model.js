import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE"],
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    role: {
        type: String, 
        enum: ["ADMIN HR", "HR", "EMPLOYEE"],
        required: true
    },
    education: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    positionId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    latestPayrollId: {
        type: mongoose.Types.ObjectId,
        required: true
    }, 
    password: {
        type: String,
        required: true
    } 
},    { createdAt: 'created_at', updatedAt: 'updated_at' }
)

const Employee = mongoose.model("Employee", employeeSchema)
export default Employee;