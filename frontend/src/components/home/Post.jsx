import { useState, useEffect } from 'react';
import { FaTrashAlt, FaHeart, FaRegComment, FaRegHeart, FaSave } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useGetMe } from '../../hooks/useGetMe';
import CommentModal from '../modals/CommentModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import moment from 'moment';

const Post = ({ text, _id, img, user, comments, likes, createdAt, tabValue, deletePost, likePost }) => {
  const { user: me } = useGetMe();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postComments, setPostcomments] = useState(comments);
  const [displayTime, setDisplayTime] = useState(moment(createdAt).fromNow());

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const client = useQueryClient();
  const { mutate: addComment } = useMutation({
    mutationFn: async (commentText) => {
      const res = await fetch(`/api/posts/comment/${_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: commentText }),
      });
      const data = await res.json();
      if (data?.error) {
        throw new Error(data.error);
      }
      return data;
    },
    onSuccess: data => {
      toast.success(data.message);
      setPostcomments([...postComments, { ...data.comment, user: me }]);
      client.invalidateQueries({ queryKey: 'notifications' });
    },
    onError: error => {
      toast.error(error.message);
    }
  });

  const handleCommentSubmit = (commentText) => {
    addComment(commentText);
  };

  // Update the display time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTime(moment(createdAt).fromNow());
    }, 60000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <div className="bg-base-100 dark:bg-base-300 rounded-lg shadow-md p-4 mb-4 transition-all duration-300">
      <div className="flex items-start gap-4">
        <img src={user.profile ? `http://localhost:5000/profiles/${user.profile}` : '/avatar-placeholder.png'} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <Link to={`/profiles/${user.username}`}>
              <div>
                <h4 className="font-bold text-base-content">{user.fullName}</h4>
                <span className="text-sm text-base-content">@{user.username}</span>
                <span className="text-sm text-base-content ml-2">{displayTime}</span>
              </div>
            </Link>
            {(tabValue === 'for you' || location.pathname === `/profiles/${me?.username}`) && (
              <button className="text-error hover:text-error-content transition-all duration-300" onClick={() => deletePost(_id)}>
                <FaTrashAlt />
              </button>
            )}
          </div>
          {text && <p className="mt-2 text-base-content">{text}</p>}
          {img && (
            <img src={`http://localhost:5000/posts/${img}`} alt="Post" className="w-full h-auto lg:h-80 object-cover rounded-lg mt-2" />
          )}
          <div className="flex items-center justify-between gap-4 mt-4">
            <button className="text-primary hover:text-primary-content transition-all duration-300" onClick={() => likePost(_id)}>
              {likes.length > 0 ? <FaHeart /> : <FaRegHeart />}
              <span>{likes.length}</span>
            </button>
            <button className="text-success hover:text-success-content transition-all duration-300">
              <FaSave />
              <span className="opacity-0">0</span>
            </button>
            <button className="text-warning hover:text-warning-content transition-all duration-300" onClick={openModal}>
              <FaRegComment className="-translate-y-[px]" />
              <span>{postComments.length}</span>
            </button>
          </div>
        </div>
      </div>
      <CommentModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleCommentSubmit} postId={_id} comments={postComments} />
    </div>
  );
};

export default Post;