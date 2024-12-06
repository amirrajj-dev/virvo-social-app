import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useFollow = () => {
  const client = useQueryClient();
  
  const { isLoading, mutate: followUnfollow } = useMutation({
    mutationKey: ['followUnfollow'],
    mutationFn: async (userId) => {
      const res = await fetch(`/api/users/follow/${userId}`, {
        method: 'POST'
      });
      const data = await res.json();
      console.log(data);
      
      if (data?.error) {
        throw new Error(data.error);
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      client.invalidateQueries({ queryKey: ['suggestedUsers'] });
      client.invalidateQueries({ queryKey: ['getMe'] });
      client.invalidateQueries({queryKey : ['getPostsOfUserIFollow']})
      client.invalidateQueries({queryKey : ['notifications']})
    },
    onError: (error) => {
      toast.error(error.message);
    },
    retry: 1
  });

  return { isLoading, followUnfollow };
};

export default useFollow;