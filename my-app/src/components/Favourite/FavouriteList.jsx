import React from "react";
import FavouriteListItem from "./FavouriteListItem";

function FavouriteList({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return <div>Bạn chưa có bài viết yêu thích nào.</div>;
  }
  return (
    <div className="grid gap-4">
      {blogs.map((blog) => (
        <FavouriteListItem key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default FavouriteList;