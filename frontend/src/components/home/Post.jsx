import { FaTrashAlt, FaHeart, FaRegComment , FaRegHeart , FaSave } from "react-icons/fa";
import {Link, useLocation} from 'react-router-dom'
import { useGetMe } from "../../hooks/useGetMe";

const Post = ({ text, _id , img, user, comments, likes , createdAt , tabValue , deletePost , likePost }) => {
  //   const { avatar, fullName, username, text, image, createdAt } = post;
  //   const timeAgo = new Date(createdAt).toLocaleString(); // This can be replaced with a library like moment.js for better time formatting
  const {user : me} = useGetMe()
  const location = useLocation();

  
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 transition-all duration-300">
      <div className="flex items-start gap-4">
        <img
          src={user.profile || '/avatars/boy1.png'}
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <Link to={`/profiles/${user.username}`}>
              <h4 className="font-bold text-gray-800 dark:text-white">
                {user.fullName}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                @{user.username}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </Link>
           {(tabValue === 'for you' || location.pathname === `/profiles/${me?.username}`) && (
             <button className="text-red-500 hover:text-red-700 transition-all duration-300" onClick={()=>deletePost(_id)}>
             <FaTrashAlt />
           </button>
           )}
         
          </div>
          {text && <p className="mt-2 text-gray-800 dark:text-white">{text}</p>}
          {img && (
            <img src={`http://localhost:5000/posts/${img}`} alt="Post" className="w-full h-48 object-cover rounded-lg mt-2" />
          )}
          <div className="flex items-center justify-between gap-4 mt-4">
            <button className="text-blue-500 hover:text-blue-700 transition-all duration-300" onClick={()=>likePost(_id)}>
              {likes.length > 0 ? <FaHeart/> : <FaRegHeart/>}
              <span>{likes.length}</span>
            </button>
            <button className="text-green-500 hover:text-green-700 transition-all duration-300">
              <FaSave />
              <span className="opacity-0">0</span>
            </button>
            <button className="text-yellow-500 hover:text-yellow-700 transition-all duration-300 ">
              <FaRegComment className="-translate-y-[px]" />
              <span>{comments.length}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
