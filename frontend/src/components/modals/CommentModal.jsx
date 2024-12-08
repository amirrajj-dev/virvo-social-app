import { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="bg-base-100 dark:bg-base-300 rounded-lg p-6 max-w-md mx-auto w-full shadow-lg">
          <div className="flex items-center justify-between mb-4 border-b border-base-200 dark:border-base-700 pb-2">
            <h2 className="text-xl font-bold text-base-content">Comments</h2>
            <button onClick={onClose} className="text-base-content hover:text-base-600 dark:hover:text-base-content">
              <FaTimes />
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
            {comments?.length > 0 ? comments.map((comment, index) => (
              <Link to={`/profiles/${comment.user.username}`} key={index} className="flex items-start space-x-3 p-2 rounded-lg bg-base-200 dark:bg-base-700">
                <img
                  src={`http://localhost:5000/profiles/${comment.user?.profile}` || '/avatar-placeholder.png'}
                  alt={comment.user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-base-content">{comment.user.username}</p>
                  <p className="text-sm text-base-content">{comment.comment}</p>
                </div>
              </Link>
            )) : (
              <p className="text-base-600">No comments yet. Be the first to comment!</p>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className="textarea textarea-bordered w-full h-24 bg-transparent resize-none focus:outline-none text-base-content"
            ></textarea>
            <button
              type="submit"
              className="mt-4 w-full btn btn-primary"
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