import React, { useState } from 'react';
import useUpdateUser from '../../hooks/useUpdateUser';

const EditProfileModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    bio: user.bio,
    link: user.link,
    currentPassword: '',
    newPassword: ''
  });

  const { updateUser, isPending } = useUpdateUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formInfo = new FormData();
    formInfo.append('fullName', formData.fullName);
    formInfo.append('username', formData.username);
    formInfo.append('email', formData.email);
    formInfo.append('bio', formData.bio);
    formInfo.append('link', formData.link);
    formInfo.append('currentPassword', formData.currentPassword);
    formInfo.append('newPassword', formData.newPassword);
    updateUser(formInfo);

    // Add logic to handle profile update
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-base-100 dark:bg-base-300 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-base-content mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-base-content">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input input-bordered w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base-content">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input input-bordered w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base-content">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base-content">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-transparent focus:outline-none"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-base-content">Link</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="input input-bordered w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base-content">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="input input-bordered w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base-content">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="input input-bordered w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;