import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const FollowListItem = ({ user }) => {
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg shadow border">
      <Avatar src={user.avatar} size={48} />
      <div className="flex flex-col">
        <Link to={`/users/${user.id}/public`} className="font-semibold text-blue-600 hover:underline">
          {user.fullName || user.displayName || user.username}
        </Link>
        <span className="text-gray-500 text-sm">@{user.username}</span>
      </div>
    </div>
  );
};

export default FollowListItem;
