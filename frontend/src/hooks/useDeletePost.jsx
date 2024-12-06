import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useDeletePost = () => {
  const client = useQueryClient();

  const { isLoading, mutate: deleteOnePost } = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: async (postId) => {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      console.log(data);
      
      if (data?.error) {
        throw new Error(data?.error);
      }
      return data;
    },
    onSuccess: () => {
      toast.success('Post deleted successfully');
      client.invalidateQueries({ queryKey: ['myPosts'] });
      client.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, deleteOnePost };
};

export default useDeletePost;