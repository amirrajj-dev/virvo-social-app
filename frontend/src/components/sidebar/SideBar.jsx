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
  const navigate = useNavigate();
  const client = useQueryClient();

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
        navigate('/login');
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex flex-col justify-between lg:h-screen w-full lg:w-auto p-4 lg:pr-14 pb-6 border-r border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
      <div>
        <div className="mb-6 text-center flex justify-center lg:block">
          <VirvoLogo className="text-primary text-4xl" />
        </div>
        <ul className="space-y-6">
          <li>
            <Link to="/" className="group">
              <button className="btn btn-neutral  w-full lg:w-72 flex items-center gap-2 transition duration-300 hover:bg-primary hover:text-white transform hover:scale-105">
                <FaHome size={18} />
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="group">
              <button className="btn btn-neutral w-full flex items-center gap-2 transition duration-300 hover:bg-primary hover:text-white transform hover:scale-105">
                <IoMdNotifications size={18} />
                Notifications
              </button>
            </Link>
          </li>
          <li>
            <Link to={`/profiles/${user?.username}`} className="group">
              <button className="btn btn-neutral w-full flex items-center gap-2 transition duration-300 hover:bg-primary hover:text-white transform hover:scale-105">
                <FaUser size={18} />
                Profile
              </button>
            </Link>
          </li>
        </ul>
      </div>
      {user && !isError ? (
        <div className="mt-4 w-full flex items-center justify-between bg-gray-100 dark:bg-slate-900/70 p-4 rounded-lg shadow-lg transition duration-300">
          <Link to={`/profiles/${user.username}`} className="flex items-center gap-4">
            <img
              src={user.profile ? `http://localhost:5000/profiles/${user.profile}` : '/avatar-placeholder.png'}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-white font-bold">
                {user?.fullName}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                @{user?.username}
              </span>
            </div>
          </Link>
          <button
            className="text-red-500 hover:text-red-700 transition duration-300 transform hover:scale-110"
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
      ) : (
        <div className="mt-4 w-full text-center">
          <Link to="/login">
            <button className="btn btn-neutral glass btn-wide mb-2 transition duration-300 hover:bg-primary hover:text-white">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-neutral glass btn-wide transition duration-300 hover:bg-primary hover:text-white">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;