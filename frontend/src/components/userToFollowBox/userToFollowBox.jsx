const UserToFollowBox = ({ fullName, username, profileImg }) => {
  return (
    <div className="flex items-center justify-between my-3 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <img src={profileImg} className="w-8 h-8 rounded-full object-cover" alt="profile" />
        <div className="flex flex-col">
          <span className="font-bold text-gray-900 dark:text-white">{fullName}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">@{username}</span>
        </div>
      </div>
      <button className="btn btn-sm bg-blue-500 border-none text-white hover:bg-blue-600 rounded-3xl transition-all duration-300">
        Follow
      </button>
    </div>
  );
};

export default UserToFollowBox;