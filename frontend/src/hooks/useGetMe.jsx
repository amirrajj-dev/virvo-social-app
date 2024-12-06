import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchMe = async () => {
  const res = await fetch("/api/auth/me");
  if (!res.ok) {
    return null;
  }
  return res.json();
};

export const useGetMe = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey : ['getMe'],
    queryFn: fetchMe,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log("error get me => ", error);
    },
    retry : false
  });

  return {
    user: data?.data,
    error,
    isLoading,
    isError,
  };
};