import { useRef, useState } from "react";
import CreatePost from "../../components/home/CreatePost";
import Post from "../../components/home/Post";
import useGetMePosts from "../../hooks/useGetMePosts";
import useGetPosts from "../../hooks/useGetPosts";
import PostSkeleton from "../../components/skeletons/PostSkeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TfiFaceSad } from "react-icons/tfi";
const HomePage = () => {
  const {
    posts: myPosts,
    error,
    isError,
    isLoading: isLoadingMyPosts,
  } = useGetMePosts();
  const [tabValue, setTabValue] = useState("for you");
  const { posts: allPosts } = useGetPosts();
  const textAreaRef = useRef(null);
  const client = useQueryClient();
  const deletePost = (postId) => {
    const confirmDelete = confirm("are you sure about this ?");
    if (confirmDelete) {
      deleteOnePost(postId);
    }
  };

  const { mutate: deleteOnePost } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (postId) => {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data?.error) {
        throw new Error(data?.error);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("post deleted succesfully");
      client.invalidateQueries({ queryKey: ["myPosts"] });
      client.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <div className="px-4 ">
      <div
        role="tablist"
        className="flex items-center justify-between w-full border-b border-white tabs tabs-bordered"
      >
        <a
          role="tab"
          className={`tab ${tabValue === "for you" ? "tab-active" : null}`}
          onClick={() => setTabValue("for you")}
        >
          For You
        </a>
        <a
          role="tab"
          className={`tab ${tabValue === "following" ? "tab-active" : null}`}
          onClick={() => setTabValue("following")}
        >
          Following
        </a>
      </div>
      <div role="tabpanel" className="tab-content p-4">
        Tab content 1
      </div>
      <div className="mt-4">
        <CreatePost textAreaRef={textAreaRef} />
        <div className="overflow-auto max-h-[470px]">
          {tabValue === "for you" ? (
            isLoadingMyPosts ? (
              [...Array(myPosts?.length)].map((post, index) => (
                <PostSkeleton key={index + 1} />
              ))
            ) : myPosts?.length > 0 ? (
              myPosts?.map((post) => (
                <Post
                  key={post._id}
                  {...post}
                  tabValue={tabValue}
                  deletePost={deletePost}
                />
              ))
            ) : (
              <>
                <div className="flex flex-col items-center justify-center py-10">
                  <TfiFaceSad size={76} className="mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    No Posts Yet
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    It looks like there are no posts here yet. Why not create
                    your first post and share your thoughts?
                  </p>
                  <button
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
                    onClick={() => textAreaRef.current.focus()}
                  >
                    Create Post
                  </button>
                </div>
              </>
            )
          ) : (
            <></>
          )}

          {tabValue === "following" && <>you dont follow anyone</>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
