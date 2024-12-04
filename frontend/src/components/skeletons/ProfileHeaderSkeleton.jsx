

const ProfileHeaderSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md mb-4 animate-pulse">
      <div className="relative h-48 w-full bg-base-300 rounded-t-lg"></div>
      <div className="flex items-center gap-4 p-4">
        <div className="relative w-24 h-24 bg-base-300 rounded-full"></div>
        <div className="flex flex-col w-full space-y-2">
          <div className="h-6 bg-base-300 rounded w-3/4"></div>
          <div className="h-4 bg-base-300 rounded w-1/4"></div>
        </div>
        <div className="ml-auto">
          <div className="h-8 w-24 bg-base-300 rounded"></div>
        </div>
      </div>
      <div className="p-4">
        <div className="h-4 bg-base-300 rounded mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-1/2"></div>
      </div>
      <div className="flex items-center gap-4 p-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-base-300 rounded-full"></div>
          <div className="h-4 bg-base-300 rounded w-16"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-base-300 rounded-full"></div>
          <div className="h-4 bg-base-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;