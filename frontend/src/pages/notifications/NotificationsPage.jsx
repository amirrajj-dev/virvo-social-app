import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaComment, FaUserPlus, FaHeart } from 'react-icons/fa';
import NotificationSkeleton from '../../components/skeletons/NotificationSkeleton';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications([
        { id: 1, type: 'follow', username: 'johndoe' },
        { id: 2, type: 'comment', username: 'janedoe' },
        { id: 3, type: 'like', username: 'samsmith' },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notifications</h2>
        <div className="dropdown dropdown-bottom dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-none text-red-500"><FaTrashAlt/></div>
  <ul tabIndex={0} className="dropdown-content text-white menu bg-slate-700 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Delete All Notifications</a></li>
  </ul>
</div>
      </div>
      {isLoading && (
        <>
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
        </>
      )}
      {!isLoading && notifications.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No notifications to show.</p>
      )}
      {!isLoading && notifications.map(notification => (
        <div key={notification.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 flex items-center gap-4 transition-all duration-300">
          {notification.type === 'follow' && <FaUserPlus className="text-green-500" />}
          {notification.type === 'comment' && <FaComment className="text-blue-500" />}
          {notification.type === 'like' && <FaHeart className="text-red-500" />}
          <p className="text-gray-800 dark:text-white">
            <span className="font-bold">@{notification.username}</span> {notification.type}ed your post.
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;