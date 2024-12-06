import React, { useState } from "react";
import {
  FaTrashAlt,
  FaComment,
  FaUserPlus,
  FaHeart,
  FaUserMinus,
  FaBell,
} from "react-icons/fa";
import NotificationSkeleton from "../../components/skeletons/NotificationSkeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const NotificationsPage = () => {
  const fetchMyNotifications = async () => {
    const response = await fetch("/api/notifications");
    const data = await response.json();
    return data.data;
  };
  const client = useQueryClient();

  const { data: myNotifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchMyNotifications,
  });
  

  const { mutate: deleteNotifications } = useMutation({
    mutationKey: ["deleteNotifications"],
    mutationFn: async () => {
      const response = await fetch(`/api/notifications/`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data?.error) {
        throw new Error(data.error);
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      client.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const clearNotifications = () => {
    deleteNotifications();
  };

  const getNotificationIcon = (notification) => {
    switch (notification.type) {
      case "like":
        return (
          <>
            <FaHeart className="text-red-500" />
            <p className="text-gray-800 dark:text-white">
              <Link to={`/profiles/${notification.from.username}`}>
                @{notification.from.username}
              </Link>{" "}
              {notification.type}ed your post
            </p>
          </>
        );
      case "comment":
        return  (
          <>
          <FaComment className="text-blue-500" />
           <p className="text-gray-800 dark:text-white">
              <Link to={`/profiles/${notification.from.username}`}>
                @{notification.from.username}
              </Link>{" "}
              {notification.type}ed on your post
            </p>
          </>
        ) ;
      case "follow":
        return (
          <>
            <FaUserPlus className="text-green-500" />
            <p className="text-gray-800 dark:text-white">
              <Link to={`/profiles/${notification.from.username}`}>
                @{notification.from.username}
              </Link>{" "}
              {notification.type}ed you
            </p>
          </>
        );
      case "followed":
        return (
          <>
            <FaUserPlus className="text-green-500" />
            <p className="text-gray-800 dark:text-white">
              you followed{" "}
              <Link to={`/profiles/${notification.from.username}`}>
                @{notification.from.username}
              </Link>
            </p>
          </>
        );
      case "unfollow":
        return (
          <>
            <FaUserMinus className="text-yellow-500" />
            <p className="text-gray-800 dark:text-white">
              you unfollowed{" "}
              <Link to={`/profiles/${notification.from.username}`}>
                @{notification.from.username}
              </Link>
            </p>
          </>
        );
      case "unfollowed":
        return (
          <>
            <FaUserMinus className="text-yellow-500" />
            <p className="text-gray-800 dark:text-white">
              you unfollowed{" "}
              <Link to={`/profiles/${notification.from.username}`}>
                @{notification.from.username}
              </Link>
            </p>
          </>
        );
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Notifications
        </h2>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-transparent border-none text-red-500"
          >
            <FaTrashAlt />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content text-white menu bg-slate-700 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a onClick={clearNotifications}>Delete All Notifications</a>
            </li>
          </ul>
        </div>
      </div>
      {isLoading && (
        <>
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
        </>
      )}
      {!isLoading && myNotifications.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">
          No notifications to show.
        </p>
      )}
      <div className="overflow-auto max-h-[570px]">
        {!isLoading &&
          myNotifications.map((notification) => (
            <div
              key={notification._id}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 flex items-center gap-4 transition-all duration-300"
            >
              {getNotificationIcon(notification)}
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
