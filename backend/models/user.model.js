import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    fullName : {
        type : String ,
        required : true ,
        unique : true,
    },
    password : {
        type : String ,
        required : true ,
        minlength : 6
    },
    email : {
        type : String ,
        required : true ,
        unique : true ,
    },
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'user',
            default : []
        }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'user',
            default : []
        }
    ],
    profile : {
        type : String ,
        default : ''
    },
    coverImg : {
        type : String ,
        default : ''
    },
    bio : {
        type : String ,
        default : ''
    },
    link : {
        type : String ,
        default : ''
    }
},
{
    timestamps : true
})

const usersModel = mongoose.models.user || mongoose.model('user' , schema);

export default usersModel;