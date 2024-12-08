import { useState } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  let [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleFormDatachange = (changes) => {
    setFormData({ ...formData, ...changes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  const { mutate: signup, isError, isPending, error } = useMutation({
    mutationFn: async ({ fullName, email, password, username }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName,
            email: email,
            password: password,
            username: username,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          throw new Error(data.message);
        }

        return data;
      } catch (error) {
        toast.error(error.message);
        throw error;  // Rethrow the error to ensure the promise is rejected
      }
    },
    onSuccess: () => {
      toast.success("Signed Up successfully");
      setTimeout(() => {
        navigate('/')
      }, 3000);
    },
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
            Join Us Today
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <MdMailOutline className="absolute top-4 left-4 text-base-content" />
              <input
                value={formData.email}
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs pl-10"
                onChange={(e) =>
                  handleFormDatachange({ email: e.target.value })
                }
              />
            </div>
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
              <MdDriveFileRenameOutline className="absolute top-4 left-4 text-base-content" />
              <input
                value={formData.fullName}
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full max-w-xs pl-10"
                onChange={(e) =>
                  handleFormDatachange({ fullName: e.target.value })
                }
              />
            </div>
            <div className="relative">
              <FaKey className="absolute top-4 left-4 text-base-content" />
              <input
                value={formData.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full max-w-xs pl-10"
                onChange={(e) =>
                  handleFormDatachange({ password: e.target.value })
                }
              />
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
              {isPending ? "Loading ..." : "Sign Up"}
            </button>
            {isError && (
              <div className="my-2 text-error">{error.message}</div>
            )}
          </form>
          <p className="my-2.5 text-base-content">
            Already have an account?
          </p>
          <Link to="/login" className="btn btn-outline btn-primary w-full">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;