import React from "react";
import FollowListItem from "./FollowListItem";

const FollowList = ({ users }) => {
  if (!users || users.length === 0) {
    return <div>Bạn chưa theo dõi ai.</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      {users.map((user) => (
        <FollowListItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default FollowList;
