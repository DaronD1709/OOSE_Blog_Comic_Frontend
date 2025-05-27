import React from "react";
import { Link } from "react-router-dom";

function FavouriteListItem({ blog }) {
  // Xác định url đúng cho từng loại blog
  let url = `/view-blog/${blog.id}`;
  if (blog.type === 'COMIC') {
    url = `/comic/${blog.id}`;
  } else if (blog.type === 'CHARACTER') {
    url = `/character/${blog.id}`;
  } else if (blog.type === 'INSIGHT') {
    url = `/insight/${blog.id}`;
  }
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded shadow">
      <div className="flex-1">
        <Link to={url}>
          <h3 className="font-semibold text-lg">{blog.title}</h3>
        </Link>
        <p className="text-gray-500 text-sm">{blog.introduction || blog.description}</p>
      </div>
    </div>
  );
}

export default FavouriteListItem;