import { isValidObjectId } from "mongoose";
import notificationModel from "../models/notification.model.js"
import usersModel from "../models/user.model.js"

export const getNotifications = async (req , res)=>{
    
    try {
        const user = await usersModel.findById(req.user._id);
        
        if (!user){
            return res.status(404).json({message : "User not found" , success : false});
        }
        const notifications = await notificationModel.find({to : user._id}).sort({createdAt :-1}).populate('from' , 'username profile')
        
        await notificationModel.updateMany({to : user._id}, {
            $set : {
                read : true
            }
        })
        res.status(200).json({message : "Notifications fetched successfully" , success : true , data : notifications})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message : "Error fetching notifications", error : error})
    }
}
export const deleteNotifications = async (req , res)=>{
    
    try {
        const userId = req.user._id;
        await notificationModel.deleteMany({
            $and : [
                {to : userId},
                {read : true}
            ]
        })
        res.status(200).json({message : "Notifications deleted successfully" , success : true})
    } catch (error) {
        res.status(500).json({message : "Error deleting notifications" , success : false , error : error.message})
    }
}

export const deleteNotification = async (req , res)=>{
    try {
        const userId = req.user._id;
        const notificationId = req.params.id;
        if (isValidObjectId(notificationId)) {
            return res.status(400).json({message : "Invalid notification id" , success : false});
        }
        await notificationModel.findByIdAndDelete({
            _id : notificationId,
            to : userId
        })    
        res.status(200).json({message : "Notification deleted successfully" , success : true})
    } catch (error) {
        
    }
}