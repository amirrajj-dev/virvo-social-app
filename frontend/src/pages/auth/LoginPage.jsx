import { useState } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  let [formData, setFormData] = useState({
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleFormDatachange = (changes) => {
    setFormData({ ...formData, ...changes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const client = useQueryClient();
  const { mutate: login, isError, error, isPending } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          })
        });
        const data = await res.json();
        
        if (data.error || data.success === false) {
          throw new Error(data.message);
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      client.invalidateQueries({ queryKey: ['getMe'] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <div className="h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center gap-4 bg-base-100 dark:bg-base-300 transition-all duration-300">
      <div className="flex flex-col gap-4 md:flex-row items-center justify-center md:gap-16">
        <div className="">
          <img
            src={`${
              window.innerWidth > 768
                ? "/avatars/virvo-responsive/icons8-chat-256.svg"
                : "/avatars/virvo-responsive/icons8-chat-128.svg"
            }`}
            alt="Chat Icon"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-base-content text-4xl md:text-5xl font-bold mb-4">
            Let's Go
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <FaUser className="absolute top-4 left-4 text-base-content" />
              <input
                value={formData.username}
                type="text"
                placeholder="Username"
                className="input input-bordered w-full max-w-xs pl-10"
                onChange={(e) =>
                  handleFormDatachange({ username: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <input
                value={formData.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full max-w-xs pl-10"
                onChange={(e) =>
                  handleFormDatachange({ password: e.target.value })
                }
              />
              <FaKey className="absolute top-4 left-4 text-base-content" />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute top-4 right-4 cursor-pointer text-base-content"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="absolute top-4 right-4 cursor-pointer text-base-content"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {isPending ? "Loading ..." : "Sign In"}
            </button>
            {isError && (
              <div className="my-2 text-error">{error.message}</div>
            )}
          </form>
          <p className="my-2.5 text-base-content">
            Don't have an account?
          </p>
          <Link to="/signup" className="btn btn-outline btn-primary w-full">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;