import { useState } from 'react';
import {Link, Links} from 'react-router-dom'
import { FaTimes } from 'react-icons/fa';

const CommentModal = ({ isOpen, onClose, onSubmit, comments }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(commentText);
    setCommentText('');
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto w-full shadow-lg">
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Comments</h2>
            <button onClick={onClose} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
              <FaTimes />
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
            {comments?.length > 0 ? comments?.map((comment, index) => (
              <Link to={`/profiles/${comment.user.username}`}  key={index} className="flex items-start space-x-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <img
                  src={`http://localhost:5000/profiles/${comment.user?.profile}` || '/avatar-placeholder.png'}
                  alt={comment.user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{comment.user.username}</p>
                  <p className="text-sm text-gray-800 dark:text-white">{comment.comment}</p>
                </div>
              </Link>
            )) : (
              <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className="w-full h-24 p-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
            ></textarea>
            <button
              type="submit"
              className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-2 rounded-lg shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default CommentModal;