import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const LoginPage = () => {
  let [formData, setFormData] = useState({
    password: "",
    username: "",
  });

  const handleFormDatachange = (changes)=>{
    setFormData({...formData, ...changes})
  }

  const handleSubmit  = e=>{
    e.preventDefault()
    console.log(formData);
    
  }

  return (
    <div className="h-screen flex items-center justify-center gap-4">
      <div className="flex flex-col gap-4 md:flex-row items-center justify-center md:gap-16">
        <div className="">
          <img
            src={`${window.innerWidth > 768 ? '/avatars/virvo-responsive/icons8-chat-256.svg' : '/avatars/virvo-responsive/icons8-chat-128.svg'}`}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Let's Go</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <FaUser className="absolute top-4 left-4" />
            <input
              defaultValue={formData.username}
              type="text"
              placeholder="Username"
              className="input input-bordered w-full max-w-xs px-10"
              onChange={e=>handleFormDatachange({username : e.target.value})}
            />
            </div>
            <div className="relative">
            <input
              defaultValue={formData.password}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs px-10"
              onChange={e=>handleFormDatachange({password : e.target.value})}
            />
            <FaKey className="absolute top-4 left-4" />
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>
          <p className="my-2.5">don't have an account ?</p>
          <Link to={'/signup'} className="btn btn-outline btn-primary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;