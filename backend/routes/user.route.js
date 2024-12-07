import express from 'express';
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import protectRoute from '../middlewares/protectRoute.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// File storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = file.fieldname === 'profileImage' ? 'profiles' : 'coverImgs';
    cb(null, path.join(process.cwd(), '/backend/public/', folder));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Routes
router.get('/profile/:username', protectRoute, getUserProfile);
router.get('/suggested', protectRoute, getSuggestedUsers);
router.post('/follow/:id', protectRoute, followUnfollowUser);
router.post('/update', protectRoute, upload.fields([{ name: 'profileImage' }, { name: 'coverImage' }]), updateUserProfile);

export default router;