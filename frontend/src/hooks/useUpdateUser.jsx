import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const useUpdateUser = () => {
  const client = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async (formData) => {
      // Remove Content-Type header as fetch will automatically set it for FormData
      const res = await fetch(`/api/users/update`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
console.log(data);

      if (data?.error || res.status !== 200) {
        throw new Error(data?.error || 'Failed to update user');
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success('User updated successfully');
      client.invalidateQueries({ queryKey: ['getMe'] });
      client.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      toast.error('Failed to update user');
    },
    retry: 2,
  });

  return { updateUser, isPending };
};

export default useUpdateUser;