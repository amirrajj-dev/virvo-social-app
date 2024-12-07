import { isValidObjectId } from "mongoose";
import notificationModel from "../models/notification.model.js";
import usersModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import {unlink, writeFile} from 'fs/promises'
import path from "path";
// import { promisify } from 'util';

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await usersModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({
        message: "User profile fetched successfully",
        success: true,
        data: user,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching user profile", error: error });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const usersFollowedByMe = await usersModel.findById(userId).select("following").lean();

    if (!usersFollowedByMe || !usersFollowedByMe.following) {
      return res.status(404).json({ message: "User or following list not found", success: false });
    }

    const users = await usersModel
      .find({
        _id: { $nin: [userId, ...usersFollowedByMe.following] }
      })
      .limit(10)
      .lean();

    // Randomly pick 4 suggested users if more than 4
    const shuffledUsers = users.sort(() => 0.5 - Math.random());
    const suggestedUsers = shuffledUsers.slice(0, 4).map(user => ({ ...user, password: null }));

    res.status(200).json({
      message: "Suggested users fetched successfully",
      success: true,
      data: suggestedUsers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching suggested users', error: error.message });
  }
};



export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await usersModel.findById(req.user._id);
    const userToFollowOrUnfollow = await usersModel.findById(id);

    if (currentUser._id.toString() === userToFollowOrUnfollow._id.toString()) {
      return res
        .status(400)
        .json({ message: "You can't follow or unfollow yourself :)" });
    }
    if (!currentUser || !userToFollowOrUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }
    if (currentUser.following.includes(userToFollowOrUnfollow._id)) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() != userToFollowOrUnfollow._id.toString()
      );
      userToFollowOrUnfollow.followers =
        userToFollowOrUnfollow.followers.filter(
          (id) => id.toString() != currentUser._id.toString()
        );
      await currentUser.save();
      await userToFollowOrUnfollow.save();
      //send notification
      // notification for user to follow or unfollow
      const notification = new notificationModel({
        to: userToFollowOrUnfollow,
        from: currentUser,
        type: "unfollowed",
      });
      // notification for currentuser
      const notification2 = new notificationModel({
        to: currentUser,
        from: userToFollowOrUnfollow,
        type: "unfollow",
      });
      await notification.save();
      await notification2.save();
      return res
        .status(200)
        .json({ message: "User unfollowed successfully", success: true });
    } else {
      currentUser.following.push(userToFollowOrUnfollow._id);
      userToFollowOrUnfollow.followers.push(currentUser._id);
      await currentUser.save();
      await userToFollowOrUnfollow.save();
      //send notification
      // notification for user to follow or unfollow
      const notification = new notificationModel({
        to: userToFollowOrUnfollow,
        from: currentUser,
        type: "follow",
      });
      // notification for currentuser
      const notification2 = new notificationModel({
        to: currentUser,
        from: userToFollowOrUnfollow,
        type: "followed",
      });
      await notification.save();
      await notification2.save();
      return res
        .status(200)
        .json({ message: "User followed successfully", success: true });
      return res
        .status(200)
        .json({ message: "User followed successfully", success: true });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error following/unfollowing user", error: error });
  }
};


// const unlinkAsync = promisify(fs.unlink);
// const writeFileAsync = promisify(fs.writeFile);

export const updateUserProfile = async (req, res) => {
  try {
    const {
      username,
      fullName,
      currentPassword,
      newPassword,
      email,
      bio,
      link,
    } = req.body;
    console.log(req.body);
    
    const userId = req.user._id;
    const user = await usersModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if ((currentPassword && !newPassword) || (!currentPassword && newPassword)) {
      return res.status(400).json({ message: "Please enter both current and new password" });
    }

    let isValidCurrentPassword;
    let hashedPassword = null;
    
    if (currentPassword && newPassword) {
      console.log('yes');
      
      isValidCurrentPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidCurrentPassword) {
        return res.status(400).json({ message: "Invalid current password" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
      hashedPassword = await bcrypt.hash(newPassword, 12);
    }

    // Image uploader
    let profileName = user.profile;
    let coverName = user.coverImg;

    if (req.files) {
      if (req.files.profileImage) {
        if (user.profile) {
          const oldProfilePath = path.join(process.cwd(), '/backend/public/profiles/', user.profile);
          await unlink(oldProfilePath); // Delete the old profile image
        }
        profileName = req.files.profileImage[0].filename;
      }

      if (req.files.coverImage) {
        if (user.coverImg) {
          const oldCoverPath = path.join(process.cwd(), '/backend/public/coverImgs/', user.coverImg);
          await unlink(oldCoverPath); // Delete the old cover image
        }
        coverName = req.files.coverImage[0].filename;
      }
    }

    // End image uploader
    user.password = hashedPassword || user.password;
    user.username = username || user.username;
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.profile = profileName;
    user.coverImg = coverName;
    user.bio = bio || user.bio;
    user.link = link || user.link;

    const updatedUser = await user.save();
    updatedUser.password = null;

    return res.status(200).json({ message: "User profile updated successfully", data: updatedUser, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error for updating user', error: error.message });
  }
};


