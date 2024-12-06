import { useMutation, useQueryClient } from "@tanstack/react-query"
import {toast} from 'react-hot-toast'

const useLike = () => {
    const client = useQueryClient()
  const {mutate : likeUnlikePost , isPending} = useMutation({
    mutationKey : ['likeUnlikePost'],
    mutationFn : async (postId)=>{
        const res = await fetch(`/api/posts/${postId}` , {
            method : 'POST'
        })
        const data = await res.json()
        if (data?.error){
            throw new Error(data.error)
        }
        return data;
    },
    onSuccess : data=>{
        toast.success(data.message)
        client.invalidateQueries({queryKey : ['posts']})
        client.invalidateQueries({queryKey : ['myPosts']})
        client.invalidateQueries({queryKey : ['notifications']})
        client.invalidateQueries({queryKey : ['getPostsOfUserIFollow']})
        client.invalidateQueries({queryKey : ['userPosts']})
        client.invalidateQueries({queryKey : ['likedPosts']})
    },
    onError : error=>{
        toast.error(error.message)
    }
  })
  return {likeUnlikePost , isPending}
}

export default useLike