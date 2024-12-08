import mongoose, { isValidObjectId } from "mongoose";
import postsModel from "../models/post.model.js";
import usersModel from '../models/user.model.js';
import notificationModel from '../models/notification.model.js';
import {writeFile} from 'fs/promises'
import path from "path";

export const getPosts = async (req, res) => {
  try {
    const cursor = req.query.cursor ? new mongoose.Types.ObjectId(req.query.cursor) : null;
    const limit = 3;  // Define the number of posts to fetch per request

    let query = cursor ? { _id: { $lt: cursor } } : {};
    const posts = await postsModel.find(query)
      .sort({ _id: -1 })
      .limit(limit)
      .populate('user', 'username profile -_id')
      .populate('comments.user', 'username profile -_id');

    const nextCursor = posts.length === limit ? posts[posts.length - 1]._id : null;

    res.status(200).json({ posts, nextCursor });
  } catch (error) {
    return res.status(500).json({ message: 'error getting posts', error: error.message });
  }
}
 

export const createPost = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const img = req.file; // Access the uploaded file
    
    if (!userId || !isValidObjectId(userId)) {
      return res.status(400).json({ message: "Please fill in all fields u." });
    }

    const user = await usersModel.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!text && !img) {
      return res.status(400).json({ message: "Please fill in all fields t/i." });
    }

    let newPost = {};
    if (text) newPost.text = text;
    if (img) {
      newPost.img = img.filename; // Store the filename of the uploaded image
    }

    const post = await postsModel.create({ user: user._id, ...newPost });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};



export const likeUnlikePost = async (req , res)=>{
    try {
        const {id} = req.params
        const currentUser = await usersModel.findById(req.user._id)
        if (!currentUser){
            return res.status(400).json({message : "Please login first"})
        }
        const post = await postsModel.findById(id) //post that we want to like  or unlike :)
        const didUserLikeThisPostOrNot = post.likes.some(like=>like.toString() === currentUser._id.toString())
        
        if (didUserLikeThisPostOrNot){ // unlike scenario
            post.likes = post.likes.filter(like=>like.toString() !== currentUser._id.toString())
            await post.save()
            currentUser.likedPosts = currentUser.likedPosts.filter(like=>like.toString() !== post._id.toString())
            await currentUser.save()
            return res.status(200).json({message : "Post unliked successfully" , post})
        }else{ //like scenario
            post.likes.push(currentUser._id)
            currentUser.likedPosts.push(post._id)
            await currentUser.save()
            await post.save()
            // handling like notification to the user which post get liked
            const notification = new notificationModel(
                {
                 to : post.user,
                 from : currentUser,
                 type : "like",
                }
             )
             await notification.save()
            return res.status(200).json({message : "Post liked successfully" , post})
        }
    } catch (error) {
        return res.status(500).json({message : 'error liking/unliking post' , error : error.message})
    }
}

export const commentOnPost = async (req , res)=>{
    try {
        const {id} = req.params
        const {comment} = req.body
        const post = await postsModel.findById(id) // post which gonna get comment 
        const user = await usersModel.findById(req.user._id) //user who comments 
        if (!post){
            return res.status(400).json({message : "Post not found."})
        }
        if (!comment){
            return res.status(400).json({message : "Please fill in all fields."})
        }
        if (!isValidObjectId(id)){
            return res.status(400).json({message : "Invalid post id."})
        }
        if (!user){
            return res.status(400).json({message : "Please login first"})
        }
        const newComment = {
            comment ,
            user : user._id
        }
        const notification = new notificationModel({
            to : post.user ,
            from : user ,
            type : "comment",
        })
        await notification.save()
        post.comments.push(newComment)
        await post.save()
        res.status(201).json({message : "Comment created successfully" , comment : newComment})
        
    } catch (error) {
        return res.status(500).json({message : 'error commenting on post' , error : error.message})
    }
}

export const deletePost = async (req , res)=>{
    try {
        const {id} = req.params
        const user = await usersModel.findById(req.user._id)
        if (!user){
            return res.status(400).json({message : 'unauthorized'})
        }
        if (!isValidObjectId(id)){
            return res.status(400).json({message : "Invalid post id."})
        }
        await postsModel.findByIdAndDelete(id)
        return res.status(200).json({message : 'post deleted succesfully' , success : true})
    } catch (error) {
        return res.status(500).json({message : 'error deleting post' , error : error.message})
    }
}

export const getLikedPosts = async (req , res)=>{
    try {
        const user = await usersModel.findById(req.user._id)
        if (!user){
            return res.status(400).json({message : 'unauthorized'})
        }
        const likedPosts = await postsModel.find({_id : { $in : user.likedPosts}})
        res.status(200).json({likedPosts})
    } catch (error) {
        return res.status(500).json({message : 'error getting liked posts' , error : error.message})
    }
}

export const getPostsOfUserWeFollow = async (req , res)=>{
    try {
        const currentUser = await usersModel.findById(req.user._id);
        
        if (!currentUser){
            return res.status(400).json({message : 'unauthorized'})
        }
        
        const followedUsers = currentUser.following
        
        // posts of the people we follow
        const followedUsersPosts = await postsModel.find({user : { $in : followedUsers}}).sort({createdAt : -1}).populate('user' , '-password').populate('comments.user' , '-password')
        res.status(200).json({followedUsersPosts})
    } catch (error) {
        return res.status(500).json({message : 'error getting posts of users we follow' , error : error.message})
    }
}

export const getUserPosts = async (req , res)=>{
    try {
        const {id} = req.params;
        const currentUser = await usersModel.findById(id);
        if (!currentUser){
            return res.status(400).json({message : 'unauthorized'})
        }
        const posts = await postsModel.find({user : currentUser._id}).sort({createdAt : -1}).populate('user' , '-password').populate('comments.user' , '-password') // get posts in an asc order we can use _id too
        res.status(200).json({posts}) 
    } catch (error) {
        return res.status(500).json({message : 'error getting user posts' , error : error.message})
    }
}