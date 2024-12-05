import { useState } from "react";
import CreatePost from "../../components/home/CreatePost";
import Post from "../../components/home/Post";
import useGetMePosts from "../../hooks/useGetMePosts";
import useGetPosts from "../../hooks/useGetPosts";
import PostSkeleton from '../../components/skeletons/PostSkeleton'
const HomePage = () => {
  const {posts : myPosts , error , isError , isLoading : isLoadingMyPosts} = useGetMePosts()
  const [tabValue , setTabValue] = useState('for you')
  const {posts : allPosts} = useGetPosts()
  
  return (
    <div className="px-4 ">
      <div
        role="tablist"
        className="flex items-center justify-between w-full border-b border-white tabs tabs-bordered"
      >
        <a role="tab" className={`tab ${tabValue === 'for you' ? 'tab-active' : null}`} onClick={()=>setTabValue('for you')}>
          For You
        </a>
        <a role="tab" className={`tab ${tabValue === 'following' ? 'tab-active' : null}`} onClick={()=>setTabValue('following')}>
          Following
        </a>
      </div>
      <div role="tabpanel" className="tab-content p-4">
        Tab content 1
      </div>
      <div className="mt-4">
        <CreatePost />
        <div className="overflow-auto max-h-[450px]">
          {tabValue === 'for you' && (
            isLoadingMyPosts ? (
              [...Array(myPosts?.length)].map((post , index)=>(
                <PostSkeleton key={index + 1} />
              ))
            ) : (
              myPosts?.map((post) => (
                <Post key={post._id} {...post} />
              ))
            )
          )}

          {tabValue === 'following' && (
            <>
            you dont follow anyone
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default HomePage;
