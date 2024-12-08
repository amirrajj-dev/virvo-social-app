import { useRef, useState, useEffect } from "react";
import CreatePost from "../../components/home/CreatePost";
import Post from "../../components/home/Post";
import useGetMePosts from "../../hooks/useGetMePosts";
import useGetPosts from "../../hooks/useGetPosts";
import useGetFollowingPosts from "../../hooks/useGetFollowingPosts";
import PostSkeleton from "../../components/skeletons/PostSkeleton";
import { TfiFaceSad } from "react-icons/tfi";
import useDeletePost from "../../hooks/useDeletePost";
import useLike from "../../hooks/useLike";

const HomePage = () => {
  const { posts: myPosts, isLoading: isLoadingMyPosts } = useGetMePosts();
  const { posts, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPosts(); // Infinite query for suggested posts
  const { followedUserPosts, isLoading: isLoadingFollowingPosts } = useGetFollowingPosts(); // Infinite query for followed user posts
  const { likeUnlikePost, isPending } = useLike();
  
  const [tabValue, setTabValue] = useState("for you");
  const textAreaRef = useRef(null);
  const { isLoading, deleteOnePost } = useDeletePost();

  const deletePost = (postId) => {
    const confirmDelete = confirm("Are you sure about this?");
    if (confirmDelete) {
      deleteOnePost(postId);
    }
  };

  const handleLikeunlikePost = (postId) => {
    likeUnlikePost(postId);
  };

  const loadMorePosts = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      loadMorePosts();
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div role="tablist" className="flex items-center justify-between w-full border-b border-base-300 tabs tabs-boxed">
        <a role="tab" className={`tab ${tabValue === "for you" ? "tab-active" : ""}`} onClick={() => setTabValue("for you")}>
          For You
        </a>
        <a role="tab" className={`tab ${tabValue === "following" ? "tab-active" : ""}`} onClick={() => setTabValue("following")}>
          Following
        </a>
      </div>
      <div role="tabpanel" className="tab-content p-4">Tab content 1</div>
      <div className="mt-4">
        <CreatePost textAreaRef={textAreaRef} />
        <div className="overflow-auto max-h-[470px] scrollbar" onScroll={handleScroll}>
          {tabValue === "for you" ? (
            isLoading ? (
              [...Array(5)].map((_, index) => (
                <PostSkeleton key={index} />
              ))
            ) : posts?.pages?.length > 0 ? (
              posts.pages.map((page, pageIndex) => (
                <div key={pageIndex}>
                  {page.posts.map((post, postIndex) => (
                    <Post key={`${pageIndex}-${postIndex}`} {...post} tabValue={tabValue} deletePost={deletePost} likePost={handleLikeunlikePost} />
                  ))}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <TfiFaceSad size={76} className="mb-4 text-base-content" />
                <h2 className="text-2xl font-semibold text-base-content mb-2">No Posts Yet</h2>
                <p className="text-base-content mb-4">It looks like there are no posts here yet. Why not create your first post and share your thoughts?</p>
                <button className="btn btn-primary" onClick={() => textAreaRef.current.focus()}>
                  Create Post
                </button>
              </div>
            )
          ) : (
            isLoadingFollowingPosts ? (
              [...Array(5)].map((_, index) => (
                <PostSkeleton key={index} />
              ))
            ) : followedUserPosts?.length > 0 ? (
              followedUserPosts.map((post) => (
                <Post key={post._id} {...post} tabValue={tabValue} deletePost={deletePost} likePost={handleLikeunlikePost} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <TfiFaceSad size={76} className="mb-4 text-base-content" />
                <h2 className="text-2xl font-semibold text-base-content mb-2">No Posts Yet</h2>
                <p className="text-base-content mb-4">It looks like there are no posts from the users you follow yet.</p>
              </div>
            )
          )}
          {isFetchingNextPage && <PostSkeleton />}
        </div>
        <button onClick={loadMorePosts} disabled={!hasNextPage || isFetchingNextPage} className="btn btn-primary btn-block mt-4">
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'No More Posts'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;