
import UserToFollowBox from "../userToFollowBox/UserToFollowBox";
import RightPannelSkeleton from "../skeletons/RightPannelSkeleton";
import {useQuery} from '@tanstack/react-query'
const SideBarPannel = () => {
  const {data : suggestedUsers , isLoading} = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: async () => {
      const res = await fetch('/api/users/suggested')
      const data = await res.json()
      if (data.error){
        throw new Error(data.error);
      }
      return data.data;
    }
  })

  if (suggestedUsers?.length === 0) return (<div className="md:w-64 w-0" ></div>)
  
  
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
        {!isLoading && suggestedUsers?.map((user) => (
          <UserToFollowBox key={user._id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default SideBarPannel;