const UserToFollowBox = ({ fullName, username, profileImg }) => {
  return (
    <div className="flex items-center justify-between my-3">
      <div className="flex items-center gap-2">
        <img src={profileImg} className="w-8 h-8 rounded-full object-cover" alt="profile" />
        <div className="flex flex-col">
          <span>{fullName}</span>
          <span className="text-xs text-gray-500">@{username}</span>
        </div>
      </div>
      <button className="btn btn-sm bg-white text-black hover:bg-slate-800 hover:border-white hover:text-white rounded-3xl transition-all duration-300">
        Follow
      </button>
    </div>
  );
};

export default UserToFollowBox;