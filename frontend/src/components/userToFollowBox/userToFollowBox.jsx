import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";

const UserToFollowBox = ({ fullName, username, profile, _id }) => {
  const { followUnfollow, isLoading } = useFollow();

  const handleFollowUnfollowUser = (userId) => {
    followUnfollow(userId);
  };

  return (
    <div className="flex items-center justify-between my-3 bg-base-100 dark:bg-base-300 p-4 rounded-lg shadow-md transition-all duration-300">
      <Link to={`/profiles/${username}`} className="flex items-center gap-3">
        <img src={profile ? `http://localhost:5000/profiles/${profile}` : '/avatar-placeholder.png'} className="w-10 h-10 rounded-full object-cover" alt="profile" />
        <div className="flex flex-col">
          <span className="font-semibold text-base-content">{fullName}</span>
          <span className="text-sm text-base-content">@{username}</span>
        </div>
      </Link>
      <button onClick={() => handleFollowUnfollowUser(_id)} className="btn btn-sm btn-outline btn-primary rounded-full transition-all duration-300">
        {isLoading ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : (
          <span>Follow</span>
        )}
      </button>
    </div>
  );
};

export default UserToFollowBox;