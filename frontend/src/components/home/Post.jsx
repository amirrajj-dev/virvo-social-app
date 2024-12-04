import { FaTrashAlt, FaHeart, FaSave } from "react-icons/fa";

const Post = ({ text, img, user, comments, likes }) => {
  //   const { avatar, fullName, username, text, image, createdAt } = post;
  //   const timeAgo = new Date(createdAt).toLocaleString(); // This can be replaced with a library like moment.js for better time formatting

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 transition-all duration-300">
      <div className="flex items-start gap-4">
        <img
          src={"/avatars/boy1.png"}
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white">
                {"john doe"}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                @{"johndoe"}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                {"2h"}
              </span>
            </div>
            {/* {isMyPost && ( */}
            <button className="text-red-500 hover:text-red-700 transition-all duration-300">
              <FaTrashAlt />
            </button>
            {/* )} */}
          </div>
          {text && <p className="mt-2 text-gray-800 dark:text-white">{text}</p>}
          {img && (
            <img src={img} alt="Post" className="w-full h-48 object-cover rounded-lg mt-2" />
          )}
          <div className="flex items-center gap-4 mt-4">
            <button className="text-blue-500 hover:text-blue-700 transition-all duration-300">
              <FaHeart />
            </button>
            <button className="text-green-500 hover:text-green-700 transition-all duration-300">
              <FaSave />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
