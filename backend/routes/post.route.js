import express from "express";
import {
  commentOnPost,
  createPost,
  deletePost,
  likeUnlikePost,
  getPosts,
  getLikedPosts,
  getPostsOfUserWeFollow,
  getUserPosts,
} from "../controllers/post.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null , process.cwd() + '/backend/public/posts');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const router = express.Router();
router.get("/", getPosts);
router.post("/", protectRoute, upload.single('image') ,  createPost);
router.post("/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);
router.get("/likedposts", protectRoute, getLikedPosts);
router.get("/following", getPostsOfUserWeFollow); //to be able to see posts of the users we follow
router.get("/user/:id", getUserPosts);

export default router;
