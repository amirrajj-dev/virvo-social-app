import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useGetMe } from '../../hooks/useGetMe';

const CreatePost = ({textAreaRef}) => {
  const data = {
    img: '/avatars/boy1.png',
  };
  const [text, setText] = useState('');
  const [blobImage, setBlobImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBlobImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setBlobImage(null);
    setImage(null);
  };

  const { user } = useGetMe();
  const client = useQueryClient()
  const { mutate: createPost, isError, error, isPending } = useMutation({
    mutationKey: ['createPost'],
    mutationFn: async (formdata) => {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formdata,
      });
      const data = await res.json();
      console.log(data);
      
      if (res.ok) {
        return data;
      }
      if (data?.error) {
        throw new Error(data.error);
      }
    },
    onSuccess: () => {
      toast.success('Post created successfully');
      client.invalidateQueries({queryKey : ['myPosts']})
      client.invalidateQueries({queryKey : ['posts']})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text && !image) {
      toast.error('Please enter text or select an image');
      return;
    }

    const formdata = new FormData();
    formdata.append('text', text);
    formdata.append('image', image);
    formdata.append('userId', user._id);

    createPost(formdata);
    setBlobImage(null)
    setImage(null)
    setText('')
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 transition-all duration-300">
      <div className="flex items-start gap-4">
        <img src={data.img} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
        <div className="w-full">
          <textarea
            value={text}
            ref={textAreaRef}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            className="w-full h-24 p-2 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
          ></textarea>
          {blobImage && (
            <div className="relative mt-4">
              <img src={blobImage} alt="Selected" className="w-full h-48 object-cover rounded-lg" />
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
              {isPending ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;