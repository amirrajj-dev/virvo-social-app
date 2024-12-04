import { useState } from 'react';

const CreatePost = () => {
  const data = {
    img : '/avatars/boy1.png'
  }
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle post submission
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 transition-all duration-300">
      <div className="flex items-start gap-4">
        <img src={data.img} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
        <div className="w-full">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            className="w-full h-24 p-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
          ></textarea>
          {image && (
            <div className="relative mt-4">
              <img src={image} alt="Selected" className="w-full h-48 object-cover rounded-lg" />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-all duration-300"
              >
                &#10005;
              </button>
            </div>
          )}
          <div className="flex items-center justify-between mt-4">
            <input
              type="file"
              accept="image/*"
              id="upload"
              hidden
              onChange={handleImageChange}
            />
            <label
              htmlFor="upload"
              className="cursor-pointer bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            >
              Select Image
            </label>
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-2 rounded-lg shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;