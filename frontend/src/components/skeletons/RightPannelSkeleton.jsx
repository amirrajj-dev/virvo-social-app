const RightPannelSkeleton = () => {
  return (
    <div className="flex items-center justify-between my-3">
      <div className="flex items-center gap-2">
        <div className="skeleton bg-slate-700 w-8 h-8 rounded-full"></div>
        <div className="flex flex-col gap-1">
          <div className="skeleton bg-slate-700 w-16 h-3"></div>
          <div className="skeleton bg-slate-700 w-20 h-3"></div>
        </div>
      </div>
      <div className="skeleton bg-slate-700 w-16 h-8 rounded-3xl"></div>
    </div>
  );
};

export default RightPannelSkeleton;