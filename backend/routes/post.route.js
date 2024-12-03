import express from 'express';
import { commentOnPost, createPost, deletePost, likeUnlikePost , getPosts , getLikedPosts , getPostsOfUserWeFollow , getUserPosts } from '../controllers/post.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router()
router.get('/' , getPosts)
router.post('/' , protectRoute ,  createPost)
router.post('/:id' , protectRoute ,  likeUnlikePost)
router.post('/comment/:id' , protectRoute ,  commentOnPost)
router.delete('/:id' , protectRoute ,  deletePost)
router.get('/likedposts' , protectRoute , getLikedPosts)
router.get('/following' , getPostsOfUserWeFollow) //to be able to see posts of the users we follow
router.get('/user/:id' , getUserPosts)

export default router;