import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useGetMe } from './useGetMe';


export const useGetMePosts = () => {
  const {user} = useGetMe()
  const fetchMe = async () => {
      const res = await fetch(`/api/posts/user/${user._id}`);
      if (!res.ok) {
        return null;
      }
      return res.json();
    };
  const {data : posts , error , isError , isLoading} = useQuery({
    queryKey : ['myPosts'],
        queryFn : fetchMe,
        retry: false
    })
    return {posts : posts?.posts , error , isError , isLoading}
}

export default useGetMePosts