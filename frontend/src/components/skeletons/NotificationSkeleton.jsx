import React from 'react';

const NotificationSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 flex items-center gap-4 animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 w-8 h-8 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;