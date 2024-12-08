import { Link, useNavigate } from "react-router-dom";
import VirvoLogo from "../../components/logo/VirvoLogo";
import { FaUser, FaHome } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useGetMe } from "../../hooks/useGetMe";
import { useEffect, useState } from "react";

const SideBar = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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
        navigate('/login');
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="flex flex-col justify-between lg:h-screen w-full lg:w-auto p-4 lg:pr-14 pb-6 border-r border-base-300 bg-base-100 dark:bg-base-300 shadow-lg">
      <div>
        <div className="mb-6 text-center flex justify-center lg:block">
          <VirvoLogo className="text-primary text-4xl" />
        </div>
        <ul className="space-y-6">
          <li>
            <Link to="/" className="group">
              <button className="btn btn-neutral w-full lg:w-72 flex items-center gap-2 transition duration-300 hover:bg-primary hover:text-white transform hover:scale-105">
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
          <li onClick={toggleTheme}>
              <button className="btn btn-neutral w-full flex items-center gap-2 transition duration-300 hover:bg-primary hover:text-white transform hover:scale-105">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
          </li>
        </ul>
      </div>
      {user && !isError ? (
        <div className="mt-4 w-full flex items-center justify-between bg-base-200 dark:bg-base-700 p-4 rounded-lg shadow-lg transition duration-300">
          <Link to={`/profiles/${user.username}`} className="flex items-center gap-4">
            <img
              src={user.profile ? `http://localhost:5000/profiles/${user.profile}` : '/avatar-placeholder.png'}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-base-content font-bold">
                {user?.fullName}
              </span>
              <span className="text-base-content">
                @{user?.username}
              </span>
            </div>
          </Link>
          <button
            className="text-error hover:text-error-content transition duration-300 transform hover:scale-110"
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
