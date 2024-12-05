import { useState } from "react";
import { FaUser , FaEye, FaEyeSlash } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from 'react-hot-toast'
const LoginPage = () => {
  let [formData, setFormData] = useState({
    password: "",
    username: "",
  });
  const [showPassowrd, setShowPassword] = useState(false);

  const handleFormDatachange = (changes) => {
    setFormData({ ...formData, ...changes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  const client = useQueryClient()
  const { mutate : login , isError, error, isPending } = useMutation({
    mutationFn: async ({username , password}) => {
      try {
        const res = await fetch('/api/auth/login' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body : JSON.stringify({
            username ,
            password ,
          })
        })
        const data = await res.json()
        
        if (data.error || data.success === false) {
          throw new Error(data.message)
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      client.invalidateQueries({queryKey : ['getMe']})
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  return (
    <div className="h-screen flex items-center justify-center gap-4">
      <div className="flex flex-col gap-4 md:flex-row items-center justify-center md:gap-16">
        <div className="">
          <img
            src={`${
              window.innerWidth > 768
                ? "/avatars/virvo-responsive/icons8-chat-256.svg"
                : "/avatars/virvo-responsive/icons8-chat-128.svg"
            }`}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Let's Go
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <FaUser className="absolute top-4 left-4" />
              <input
                defaultValue={formData.username}
                type="text"
                placeholder="Username"
                className="input input-bordered w-full max-w-xs px-10"
                onChange={(e) =>
                  handleFormDatachange({ username: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <input
                defaultValue={formData.password}
                type={showPassowrd ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full max-w-xs px-10"
                onChange={(e) =>
                  handleFormDatachange({ password: e.target.value })
                }
              />
              <FaKey className="absolute top-4 left-4" />
              {showPassowrd ? (
                <FaEyeSlash
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {isPending ? "Loading ..." : "Sign In"}
            </button>
            {isError && (
              <div className="my-2 text-red-500">{error.message}</div>
            )}
          </form>
          <p className="my-2.5">don't have an account ?</p>
          <Link to={"/signup"} className="btn btn-outline btn-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
