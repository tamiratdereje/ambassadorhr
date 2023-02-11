

import mongoose from 'mongoose';


const internalNoticeSchema = new mongoose.Schema({
    title : {
        type: String,
        
    },
    subject : {
        type : String,
        required: [true, 'Please add subjects '],
    },
    creater : {
        type: mongoose.Types.ObjectId,
        required:  [true, 'Please creator id ']
    },
    // position : {
    //     type: String,
    //     enum: [
    //         ''
    //     ]
    // }
    
    },
    { createdAt: 'created_at', updatedAt: 'updated_at' }
)

const InternalNotice = mongoose.model("InternalNotice", internalNoticeSchema)

export default InternalNotice;