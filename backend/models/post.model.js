import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    text : {
        type : String,
    },
    img : {
        type : String,
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            default : []
        }
    ],
    comments : [
        {
            comment : {
                type : String,
                required : true,
            },
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user',
                required : true
            }
        },
    ]
},
{
    timestamps : true
})

const postsModel = mongoose.models.post || mongoose.model('post' , schema);

export default postsModel