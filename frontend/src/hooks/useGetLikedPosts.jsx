import { useQuery } from "@tanstack/react-query"


const useGetLikedPosts = () => {
    const {data : likedPosts , isLoading} = useQuery({
        queryKey : ['likedPosts'],
        queryFn : async ()=>{
            const res = await fetch('/api/posts/likedposts')
            const data = await res.json()
            if (data?.error){
                throw new Error(data.error)
            }
            return data.likedPosts;
        },

    })
    return {
        likedPosts,
        isLoading
    }
}

export default useGetLikedPosts