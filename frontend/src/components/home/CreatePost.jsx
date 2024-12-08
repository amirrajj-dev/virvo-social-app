import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useGetMe } from '../../hooks/useGetMe';

const CreatePost = ({ textAreaRef }) => {
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
  const client = useQueryClient();
  const { mutate: createPost, isPending } = useMutation({
    mutationKey: ['createPost'],
    mutationFn: async (formdata) => {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formdata,
      });
      const data = await res.json();
      
      if (res.ok) {
        return data;
      }
      if (data?.error) {
        throw new Error(data.error);
      }
    },
    onSuccess: () => {
      toast.success('Post created successfully');
      client.invalidateQueries({ queryKey: ['myPosts'] });
      client.invalidateQueries({ queryKey: ['posts'] });
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
    setBlobImage(null);
    setImage(null);
    setText('');
  };

  return (
    <div className="bg-base-100 dark:bg-base-300 rounded-lg shadow-md p-4 mb-4 transition-all duration-300">
      <div className="flex items-start gap-4">
        <img src={user && user.profile ? `http://localhost:5000/profiles/${user?.profile}` : '/avatar-placeholder.png'} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
        <div className="w-full">
          <textarea
            value={text}
            ref={textAreaRef}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            className="textarea textarea-bordered w-full h-24 bg-base-200 dark:bg-base-300 resize-none focus:outline-none text-base-content dark:text-base-content"
          ></textarea>
          {blobImage && (
            <div className="relative mt-4">
              <img src={blobImage} alt="Selected" className="w-full h-48 object-cover rounded-lg" />
              <button
                onClick={removeImage}
                className="absolute top-2 right-2 btn btn-circle btn-error btn-sm shadow-md"
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
              className="btn btn-primary"
            >
              Select Image
            </label>
            <button
              onClick={handleSubmit}
              className="btn btn-accent"
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