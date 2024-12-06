import React, { useState } from "react";
import { FaCamera, FaUserFriends, FaUserPlus } from "react-icons/fa";
import EditProfileModal from "../../components/modals/EditModal";
import Post from "../../components/home/Post";
import PostSkeleton from "../../components/skeletons/PostSkeleton";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import useDeletePost from "../../hooks/useDeletePost";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useGetMe } from "../../hooks/useGetMe";

const ProfilePage = ({ likedPosts }) => {
  const { username } = useParams();

  const fetchUser = async (username) => {
    const res = await fetch(`/api/users/profile/${username}`, {
      method: "GET",
    });
    const data = await res.json();
    return data.data;
  };

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchUser(username),
    initialData: null,
    retry: 2,
  });

  const fetchUserPosts = async (userId) => {
    const res = await fetch(`/api/posts/user/${userId}`, { method: "GET" });
    const data = await res.json();
    return data.posts;
  };

  const { data: userPosts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["userPosts", user?._id],
    queryFn: () => (user ? fetchUserPosts(user._id) : []),
    enabled: !!user,
    initialData: [],
    retry: 2,
  });

  const location = useLocation();
  const { user: me } = useGetMe();

  const { deleteOnePost } = useDeletePost();
  const [activeTab, setActiveTab] = useState("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("/avatars/boy1.png");
  const [coverImg, setCoverImg] = useState("/avatars/boy1.png");
  const [isProfileImgChanged, setIsProfileImgChanged] = useState(false);
  const [isCoverImgChanged, setIsCoverImgChanged] = useState(false);

  const handleTabChange = (tab) => setActiveTab(tab);

  const openEditModal = () => setIsEditModalOpen(true);

  const closeEditModal = () => setIsEditModalOpen(false);

  const handleProfileImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImg(URL.createObjectURL(e.target.files[0]));
      setIsProfileImgChanged(true);
    }
  };

  const handleCoverImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImg(URL.createObjectURL(e.target.files[0]));
      setIsCoverImgChanged(true);
    }
  };

  const handleProfileImgUpdate = () => setIsProfileImgChanged(false);

  const handleCoverImgUpdate = () => setIsCoverImgChanged(false);

  const deletePost = (postId) => {
    const confirmation = confirm("Are you sure you want to delete this post?");
    if (confirmation) deleteOnePost(postId);
  };

  return (
    <div className="p-4 lg:p-8">
      {isLoadingUser ? (
        <ProfileHeaderSkeleton />
      ) : (
        <>
          <div className="relative">
            <img
              src={user?.coverImg || coverImg}
              alt="Cover"
              className="w-full h-48 object-cover rounded-lg"
            />
            <input
              type="file"
              accept="image/*"
              id="cover-upload"
              hidden
              onChange={handleCoverImgChange}
            />
            {location.pathname === `/profiles/${me?.username}` && (
              <label
              htmlFor="cover-upload"
              className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full cursor-pointer"
            >
              <FaCamera />
            </label>
            )}
          </div>
          <div className="relative w-fit">
            <img
              src={user?.profile || profileImg}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              id="profile-upload"
              hidden
              onChange={handleProfileImgChange}
            />
           {location.pathname === `/profiles/${me?.username}` && (
             <label
             htmlFor="profile-upload"
             className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer"
           >
             <FaCamera />
           </label>
           )}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-nowrap">
                {user?.fullName}
              </h2>
              <span className="text-gray-500 dark:text-gray-400">
                @{user?.username}
              </span>
            </div>
            <div className="flex gap-2.5 w-full justify-end">
              {location.pathname === `/profiles/${me?.username}` ? (
                <button
                  onClick={openEditModal}
                  className="btn btn-primary btn-sm text-white"
                >
                  Edit Profile
                </button>
              ) : (
                <button className="btn btn-primary btn-sm text-white">
                Follow
              </button>
              )}
              {isProfileImgChanged && (
                <button
                  onClick={handleProfileImgUpdate}
                  className="btn btn-primary btn-sm text-white"
                >
                  Update Profile
                </button>
              )}
              {isCoverImgChanged && (
                <button
                  onClick={handleCoverImgUpdate}
                  className="btn btn-primary btn-sm text-white"
                >
                  Update Cover
                </button>
              )}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-800 dark:text-white">{user?.bio}</p>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <FaUserFriends className="text-gray-800 dark:text-white" />
              <span className="text-gray-800 dark:text-white">
                {user?.following?.length} Following
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserPlus className="text-gray-800 dark:text-white" />
              <span className="text-gray-800 dark:text-white">
                {user?.followers?.length} Followers
              </span>
            </div>
          </div>
        </>
      )}
      <div className="border-b border-gray-300 dark:border-gray-700 mt-4">
        <button
          onClick={() => handleTabChange("posts")}
          className={`tab ${activeTab === "posts" ? "tab-active" : ""}`}
        >
          Posts
        </button>
        <button
          onClick={() => handleTabChange("likes")}
          className={`tab ${activeTab === "likes" ? "tab-active" : ""}`}
        >
          Likes
        </button>
      </div>
      <div className="mt-4 overflow-auto max-h-[470px]">
        {activeTab === "posts" &&
          (userPosts?.length > 0 ? (
            userPosts.map((post) => (
              <Post
                key={post.id}
                {...post}
                isMyPost={true}
                deletePost={() => deletePost(post._id)}
                onLike={() => {}}
                onSave={() => {}}
              />
            ))
          ) : isLoadingPosts ? (
            <PostSkeleton />
          ) : (
            <div>No posts available</div>
          ))}
        {activeTab === "likes" &&
          (likedPosts?.length > 0 ? (
            likedPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                user={user}
                isMyPost={false}
                onDelete={() => {}}
                onLike={() => {}}
                onSave={() => {}}
              />
            ))
          ) : (
            <PostSkeleton />
          ))}
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        user={user}
      />
    </div>
  );
};

export default ProfilePage;
