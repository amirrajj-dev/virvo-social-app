import React, { useState } from 'react';
import { FaEdit, FaCamera, FaHeart, FaUserFriends, FaUserPlus } from 'react-icons/fa';
import EditProfileModal from '../../components/modals/EditModal';
import Post from '../../components/home/Post';
import PostSkeleton from '../../components/skeletons/PostSkeleton';
import { POSTS } from '../../utils/db/dummy';
import ProfileHeaderSkeleton from '../../components/skeletons/ProfileHeaderSkeleton';
import { useGetMe } from '../../hooks/useGetMe';

const ProfilePage = ({ posts, likedPosts }) => {
  const {user , error , isError , isPending} = useGetMe()
  
  
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState('/avatars/boy1.png');
  const [coverImg, setCoverImg] = useState('/avatars/boy1.png');
  const [isProfileImgChanged, setIsProfileImgChanged] = useState(false);
  const [isCoverImgChanged, setIsCoverImgChanged] = useState(false);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

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

  const handleProfileImgUpdate = () => {
    // Logic to update profile image
    setIsProfileImgChanged(false);
  };

  const handleCoverImgUpdate = () => {
    // Logic to update cover image
    setIsCoverImgChanged(false);
  };

  return (
    <div className="p-4 lg:p-8">
      {isPending ? (
        <>
        <ProfileHeaderSkeleton/>
        </>
      ) : (
        <>
      <div className="relative">
        <img src={user?.coverImg || coverImg} alt="Cover" className="w-full h-48 object-cover rounded-lg" />
        <input type="file" accept="image/*" id="cover-upload" hidden onChange={handleCoverImgChange} />
        <label htmlFor="cover-upload" className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
          <FaCamera />
        </label>
      </div>
        <div className="relative w-fit">
          <img src={user?.profile || profileImg} alt="User Avatar" className="w-24 h-24 rounded-full object-cover" />
          <input type="file" accept="image/*" id="profile-upload" hidden onChange={handleProfileImgChange} />
          <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
            <FaCamera />
          </label>
          
        </div>
      <div className="flex items-center gap-4 mt-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-nowrap">{user?.fullName}</h2>
          <span className="text-gray-500 dark:text-gray-400">@{user?.username}</span>
        </div>
       <div className="flex gap-2.5 w-full justify-end">
       <button onClick={openEditModal} className="btn btn-primary btn-sm text-white">
          Edit Profile
        </button>
        {isProfileImgChanged && (
            <button onClick={handleProfileImgUpdate} className="btn btn-primary btn-sm text-white">
              Update Profile
            </button>
          )}
           {isCoverImgChanged && (
          <button onClick={handleCoverImgUpdate} className="btn btn-primary btn-sm text-white">
            Update Cover
          </button>
        )}
       </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-800 dark:text-white">{user?.bio}</p>
        {/* {user.link && <a href={user.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{user.link}</a>} */}
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <FaUserFriends className="text-gray-800 dark:text-white" />
          <span className="text-gray-800 dark:text-white">{user?.following?.length} Following</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUserPlus className="text-gray-800 dark:text-white" />
          <span className="text-gray-800 dark:text-white">{user?.followers?.length} Followers</span>
        </div>
      </div>
        
        </>
      )}
      <div className="border-b border-gray-300 dark:border-gray-700 mt-4">
        <button onClick={() => handleTabChange('posts')} className={`tab ${activeTab === 'posts' ? 'tab-active' : ''}`}>Posts</button>
        <button onClick={() => handleTabChange('likes')} className={`tab ${activeTab === 'likes' ? 'tab-active' : ''}`}>Likes</button>
      </div>
      <div className="mt-4">
        {activeTab === 'posts' && (
          POSTS.length > 0 ? POSTS.map(post => <Post key={post.id} {...post} isMyPost={true} onDelete={() => {}} onLike={() => {}} onSave={() => {}} />) : <PostSkeleton />
        )}
        {activeTab === 'likes' && (
          likedPosts.length > 0 ? likedPosts.map(post => <Post key={post.id} post={post} user={user} isMyPost={false} onDelete={() => {}} onLike={() => {}} onSave={() => {}} />) : <PostSkeleton />
        )}
      </div>
      <EditProfileModal isOpen={isEditModalOpen} onClose={closeEditModal} user={user} />
    </div>
  );
};

export default ProfilePage;