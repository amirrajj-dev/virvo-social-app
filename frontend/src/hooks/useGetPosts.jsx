import { useQuery } from '@tanstack/react-query'
import React from 'react'


export const useGetPosts = () => {
  const fetchMe = async () => {
      const res = await fetch(`/api/posts`);
      if (!res.ok) {
        return null;
      }
      return res.json();
    };
  const {data : posts , error , isError , isLoading} = useQuery({
    queryKey : ['posts'],
        queryFn : fetchMe,
        retry: false
    })
    return {posts : posts?.posts , error , isError , isLoading}
}

export default useGetPosts;