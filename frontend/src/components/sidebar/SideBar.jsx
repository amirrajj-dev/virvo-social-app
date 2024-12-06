import { Link, useNavigate } from "react-router-dom";
import VirvoLogo from "../../components/logo/VirvoLogo";
import { FaUser, FaHome } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useGetMe } from "../../hooks/useGetMe";

const SideBar = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const client = useQueryClient();
  const data = {
    username: "john doe",
    fullName: "@johndoe",
    avatar: "/avatars/boy1.png",
  };

  // get me
  const { error, isError, isLoading, user } = useGetMe();
  
  // logout
  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        if (res.status === 200) {
          return res.json();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      client.invalidateQueries({ queryKey: ['getMe'] }).then(() => {
        console.log('yes');
        
        navigate('/login');
      });
      navigate('/login')
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <div className="flex flex-col justify-between h-screen w-full lg:w-auto p-4 lg:pr-14 pb-6 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
      <div>
        <div className="mb-6">
          <VirvoLogo />
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/">
              <button className="btn btn-neutral glass btn-wide flex items-center gap-2">
                <FaHome size={18} />
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/notifications">
              <button className="btn btn-neutral glass btn-wide flex items-center gap-2">
                <IoMdNotifications size={18} />
                Notifications
              </button>
            </Link>
          </li>
          <li>
            <Link to={`/profiles/${user?.username}`}>
              <button className="btn btn-neutral glass btn-wide flex items-center gap-2">
                <FaUser size={18} />
                Profile
              </button>
            </Link>
          </li>
        </ul>
      </div>
      {user && !isError ? (
        <div className="mt-4 w-full flex items-center justify-between">
          <Link to={`/profiles/${user.username}`} className="flex items-center gap-4">
            <img
              src={user.profile || data.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-white font-bold">
                {user?.fullName}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {user?.username}
              </span>
            </div>
          </Link>
          <div className="mt-4 flex items-center justify-end">
            <button
              className="text-red-500 hover:text-red-700 transition-all duration-300"
              onClick={() => {
                const isConfirm = confirm('Are you sure?');
                if (isConfirm) {
                  logout();
                }
              }}
            >
              <IoLogOutOutline size={24} />
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 w-full text-center">
          <Link to="/login">
            <button className="btn btn-neutral glass btn-wide mb-2">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-neutral glass btn-wide">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;