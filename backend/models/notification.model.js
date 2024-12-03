import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    to : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User',
        required : true
    },
    from : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User',
        required : true
    },
    type : {
        type : String ,
        enum : ['like' , 'comment' , 'follow' , 'followed' , 'unfollow' ,  'unfollowed'],
        required : true
    },
    read : {
        type : Boolean ,
        default : false
    }
},
{
    timestamps : true
})

const notificationModel = mongoose.models.notification || mongoose.model('notification' , schema)

export default notificationModel;