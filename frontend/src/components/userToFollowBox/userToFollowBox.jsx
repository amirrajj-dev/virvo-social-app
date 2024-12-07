import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import { FaCheck } from "react-icons/fa6";

const UserToFollowBox = ({ fullName, username, profile , _id }) => {
  const {followUnfollow , isLoading} = useFollow()
  const handleFollowUnfollowUser = (userId)=>{
    followUnfollow(userId)
  }
  return (
    <div className="flex items-center justify-between my-3 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
      <Link to={`/profiles/${username}`} className="flex items-center gap-2">
        <img src={profile ? `http://localhost:5000/profiles/${profile}` : '/avatar-placeholder.png'} className="w-8 h-8 rounded-full object-cover" alt="profile" />
        <div className="flex flex-col">
          <span className="font-bold text-gray-900 dark:text-white">{fullName}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">@{username}</span>
        </div>
      </Link>
      <button onClick={()=>handleFollowUnfollowUser(_id)} className="btn btn-sm bg-blue-500 border-none text-white hover:bg-blue-600 rounded-3xl transition-all duration-300">
      {isLoading ? (
        <span className="loading loading-spinner text-white"></span>
      ) : (
        <span>Follow</span>
      )}
      </button>
    </div>
  );
};

export default UserToFollowBox;