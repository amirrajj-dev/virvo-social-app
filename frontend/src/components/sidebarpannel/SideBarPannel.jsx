import { useState } from "react";
import { USERS_FOR_RIGHT_PANEL } from "../../utils/db/dummy";
import UserToFollowBox from "../userToFollowBox/UserToFollowBox";
import RightPannelSkeleton from "../skeletons/RightPannelSkeleton";

const SideBarPannel = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="border-l border-white w-full lg:w-auto">
      <div className="p-4 bg-gray-800 rounded mt-4 lg:mt-14 ml-2 text-nowrap lg:w-[320px]">
        <h3 className="mb-3 text-white font-bold">Who To Follow</h3>
        {isLoading && (
          <div>
            <RightPannelSkeleton />
            <RightPannelSkeleton />
            <RightPannelSkeleton />
            <RightPannelSkeleton />
          </div>
        )}
        {!isLoading && USERS_FOR_RIGHT_PANEL.map((user) => (
          <UserToFollowBox key={user._id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default SideBarPannel;