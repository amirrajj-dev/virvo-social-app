import CreatePost from "../../components/home/CreatePost";
import Post from "../../components/home/Post";
import { POSTS } from "../../utils/db/dummy.js";
const HomePage = () => {
  return (
    <div className="px-4 ">
      <div
        role="tablist"
        className="flex items-center justify-between w-full border-b border-white tabs tabs-bordered"
      >
        <a role="tab" className="tab tab-active">
          For You
        </a>
        <a role="tab" className="tab">
          Following
        </a>
      </div>
      <div role="tabpanel" className="tab-content p-4">
        Tab content 1
      </div>
      <div className="mt-4">
        <CreatePost />
        <div className="overflow-auto max-h-[450px]">
          {POSTS.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
