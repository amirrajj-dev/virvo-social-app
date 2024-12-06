import { useQuery } from "@tanstack/react-query";

const fetchPostsOfUserIFollow = async () => {
  const res = await fetch("/api/posts/following");
  const data = await res.json();
  
  if (!res.ok) {
    return null;
  }
  
  return data
};

const useGetFollowingPosts = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey : ['getPostsOfUserIFollow'],
    queryFn: fetchPostsOfUserIFollow,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log("error getting posts => ", error);
    },
    retry : false
  });
  

  return {
    followedUserPosts: data?.followedUsersPosts
    ,
    error,
    isLoading,
    isError,
  };
};

export default useGetFollowingPosts;