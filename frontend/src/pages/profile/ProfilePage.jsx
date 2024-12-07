import { useState } from "react";
import { FaCamera, FaUserFriends, FaUserPlus } from "react-icons/fa";
import EditProfileModal from "../../components/modals/EditModal";
import Post from "../../components/home/Post";
import PostSkeleton from "../../components/skeletons/PostSkeleton";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import useDeletePost from "../../hooks/useDeletePost";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useGetMe } from "../../hooks/useGetMe";
import useFollow from "../../hooks/useFollow";
import useLike from "../../hooks/useLike";
import useGetLikedPosts from "../../hooks/useGetLikedPosts";
import useUpdateUser from "../../hooks/useUpdateUser";
import moment from "moment";
const ProfilePage = () => {
  const { username } = useParams();
  const { updateUser, isPending } = useUpdateUser();
  const [userProfile, setUserProfile] = useState(null);
  const [userCover, setUserCover] = useState(null);
  const fetchUser = async (username) => {
    const res = await fetch(`/api/users/profile/${username}`, {
      method: "GET",
    });
    const data = await res.json();
    setUserProfile(data.data.profile);
    setUserCover(data.data.coverImg);
    return data.data;
  };

  const { likeUnlikePost } = useLike();
  const { likedPosts, isLoading: isLoadingLikedPosts } = useGetLikedPosts();
  
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
  const [profileImg, setProfileImg] = useState("/avatar-placeholder.png");
  const [coverImg, setCoverImg] = useState("/avatar-placeholder.png");
  const [isProfileImgChanged, setIsProfileImgChanged] = useState(false);
  const [isCoverImgChanged, setIsCoverImgChanged] = useState(false);
  const { followUnfollow, isLoading } = useFollow();
  const [img, setImg] = useState(null);
  const [cover, setCover] = useState(null);
  const handleTabChange = (tab) => setActiveTab(tab);

  const openEditModal = () => setIsEditModalOpen(true);

  const closeEditModal = () => setIsEditModalOpen(false);

  const handleProfileImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
      setUserProfile(null);
      setProfileImg(URL.createObjectURL(e.target.files[0]));
      setIsProfileImgChanged(true);
    }
  };

  const handleCoverImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCover(e.target.files[0]);
      setUserCover(null)
      setCoverImg(URL.createObjectURL(e.target.files[0]));
      setIsCoverImgChanged(true);
    }
  };

  const handleProfileImgUpdate = () => {
    const formData = new FormData();
    formData.append("profileImage", img);
    updateUser(formData);
    setIsProfileImgChanged(false);
    setProfileImg(null);
  };

  const handleCoverImgUpdate = () => {
    const formData = new FormData();
    formData.append("coverImage", cover);
    updateUser(formData);
    setIsCoverImgChanged(false);
  };

  const deletePost = (postId) => {
    const confirmation = confirm("Are you sure you want to delete this post?");
    if (confirmation) deleteOnePost(postId);
  };

  const handleLikeunlikePost = (postId) => {
    likeUnlikePost(postId);
  };

  //adding member since to ui with moment lib and createdAt field user
  const memberSince = moment(user?.createdAt).format("DD MMMM YYYY");
  return (
    <div className="p-4 lg:p-8">
      {isLoadingUser ? (
        <ProfileHeaderSkeleton />
      ) : (
        <>
          <div className="relative">
            <img
              src={
                coverImg && user && !userCover
                  ? coverImg
                  : `http://localhost:5000/coverImgs/${userCover}`
              }
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
            {location.pathname === `/profiles/${user?.username}` && (
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
              src={
                profileImg && user && !userProfile
                  ? profileImg
                  : `http://localhost:5000/profiles/${userProfile}`
              }
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
                  className="btn btn-primary btn-xs text-white"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm text-white"
                  onClick={() => {
                    followUnfollow(user._id);
                  }}
                >
                  {me.following.includes(user?._id) ? "unfollow" : "follow"}
                </button>
              )}
              {isProfileImgChanged && (
                <button
                  onClick={handleProfileImgUpdate}
                  className="btn btn-primary btn-xs text-white"
                >
                  Update Profile
                </button>
              )}
              {isCoverImgChanged && (
                <button
                  onClick={handleCoverImgUpdate}
                  className="btn btn-primary btn-xs text-white"
                >
                  Update Cover
                </button>
              )}
              {(isProfileImgChanged || isCoverImgChanged) && (
                <button
                  onClick={() => {
                    console.log(user)
                    setUserProfile(user.profile);
                    setIsProfileImgChanged(false);
                    setIsCoverImgChanged(false);
                    setUserCover(user.coverImg);
                  }}
                  className="btn btn-primary btn-xs text-white"
                >
                  cancel changes
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
          <span className="text-sm mt-1 text-white">🟦Member Since {memberSince}</span>
        </>
      )}
      <div className="border-b border-gray-300 dark:border-gray-700 mt-4">
        <button
          onClick={() => handleTabChange("posts")}
          className={`tab ${activeTab === "posts" ? "tab-active" : ""}`}
        >
          Posts
        </button>
        {location.pathname === `/profiles/${me?.username}` && (
          <button
            onClick={() => handleTabChange("likes")}
            className={`tab ${activeTab === "likes" ? "tab-active" : ""}`}
          >
            Likes
          </button>
        )}
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
                likePost={handleLikeunlikePost}
              />
            ))
          ) : isLoadingPosts ? (
            <PostSkeleton />
          ) : (
            <div>No posts available</div>
          ))}
        {activeTab === "likes" &&
          (likedPosts?.length > 0 ? (
            likedPosts?.map((post) => (
              <Post
                key={post.id}
                {...post}
                isMyPost={false}
                likePost={handleLikeunlikePost}
              />
            ))
          ) : (
            <p>you dont liked any post🐥</p>
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
