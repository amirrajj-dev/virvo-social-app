import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetPosts = () => {
  const fetchMe = async ({ pageParam = null }) => {
    const res = await fetch(`/api/posts?cursor=${pageParam || ''}`);
    if (!res.ok) {
      throw new Error('Error fetching posts');
    }
    const data = await res.json();
    return data;
  };

  const {
    data: posts,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchMe,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return { posts, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};

export default useGetPosts;