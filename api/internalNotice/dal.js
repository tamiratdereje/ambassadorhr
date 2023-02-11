

import InternalNotice from "./model.js";


class InternalNoticeDal {

    static async postInternalNotice (data){

        try {
            const internalNot = await InternalNotice(data).save();
            return internalNot;

        } catch (error) {

            throw error;
        }
    }

    static async getInternalNotices(){

        try {
            return await InternalNotice.find();
            
        } catch (error) {
            throw error
        }

    }

    static async updateInternalNotice(data, _id){

        try {
            const internalNot = await InternalNotice.findByIdAndUpdate(_id, data, {
                new: true,
                runValidators: true,
              });

            return internalNot
            
        } catch (error) {
            throw error;
        }
    }

    static async deleteInternalNotice(id) {

        try {
            const internalNot = await InternalNotice.findByIdAndDelete(id);
            return internalNot;
        } catch (error) {
            throw error;
        }
    }

    static async searchInternalNotice(data){

        try {
            const internalNot = await InternalNotice.find(data);
            return internalNot;
            
        } catch (error) {
            throw error;
        }
    }

}

export default InternalNoticeDal;