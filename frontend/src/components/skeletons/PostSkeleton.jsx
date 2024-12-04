

const PostSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 transition-all duration-300">
      <div className="flex items-start gap-4 animate-pulse">
        <div className="bg-gray-300 dark:bg-gray-700 w-12 h-12 rounded-full"></div>
        <div className="w-full space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/6"></div>
          <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mt-4"></div>
          <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;