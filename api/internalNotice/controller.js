

import InternalNoticeDal from "./dal.js";
import AppError from "../../utils/appError.js";


const  postInternal = async (req, res, next) => {

    try {
        req.body.creater = '63e807678745ed6cb3a1b6d3'
        const internalNot = await InternalNoticeDal.postInternalNotice(req.body);
        
        res.status(200).json({
            data: internalNot,
            success: true
        })
    } catch (error) {
        next(error);
    }
}


const  getInternals = async (req, res, next) => {

    try {
        const internalNot = await InternalNoticeDal.getInternalNotices();
         res.status(200).json({
            data: {internalNot},
            success: true
        });
        
    } catch (error) {
        next(error);
    }
}


const updateInternal = async (req, res, next) => {

    try {
        const internalNot = await InternalNoticeDal.updateInternalNotice(req.body, req.params.id);
        
        res.status(200).json({
            data: internalNot,
            success: true
        });
        
    } catch (error) {
        next(error);
    }
}


const deleteInternal = async (req, res, next) => {

    try {
        const internalNot = await InternalNoticeDal.deleteInternalNotice(req.params.id);
        
        res.status(200).json({
            data: internalNot,
            success: true
        });
        
    } catch (error) {
        next(error);
    }
}


const searchInternal = async (req, res, next) => {

    try {
        console.log(req.query)
        if (!req.query){
            return next(new AppError("please add subject", 401))
        }
        const internalNot = await InternalNoticeDal.searchInternalNotice(req.query);
        
        res.status(200).json({
            data: internalNot,
            success: true
        });
        
    } catch (error) {
        next(error);
    }
}

const internalController = {postInternal, getInternals, searchInternal, updateInternal, deleteInternal}
export default internalController