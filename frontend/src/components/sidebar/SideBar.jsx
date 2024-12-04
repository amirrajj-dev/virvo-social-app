import { Link } from "react-router-dom";
import VirvoLogo from "../../components/logo/VirvoLogo";
import { FaUser, FaHome } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

const SideBar = () => {
  const data = {
    username: 'john doe',
    fullName: '@johndoe',
    avatar: '/avatars/boy1.png',
  };

  return (
    <div className="flex flex-col justify-between items-start p-4 lg:pr-14 pb-6 border-r border-white h-full w-full lg:w-auto">
      <div>
        <div className="mb-3">
          <VirvoLogo />
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/">
              <button className="btn btn-neutral btn-wide glass flex items-center gap-2">
                <FaHome size={18} />
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/notifications">
              <button className="btn btn-neutral btn-wide glass flex items-center gap-2">
                <IoMdNotifications size={18} />
                Notifications
              </button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <button className="btn btn-neutral btn-wide glass flex items-center gap-2">
                <FaUser size={18} />
                Profile
              </button>
            </Link>
          </li>
        </ul>
      </div>
      {data && (
        <div className="flex items-center justify-between text-sm w-full mt-4 lg:mt-0">
          <div className="flex items-center gap-2">
            <img src={data.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-white">{data.username}</span>
              <span className="text-white">{data.fullName}</span>
            </div>
          </div>
          <IoLogOutOutline size={20} className="text-white cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default SideBar;