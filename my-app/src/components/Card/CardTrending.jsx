import React from "react";
import slugify from "../../utils/format";
import { Link } from "react-router-dom";

const TopReviewCard = ({ index, avatar, title, date }) => {
  return (
    <Link to={`/${slugify(title)}`}>
      <div className="w-full hover:shadow-lg transition-all duration-300 rounded-xl px-4 py-2 group">
        <div className="flex items-center gap-4">
          {/* Index Badge */}
          <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
            {index}
          </span>

          {/* Avatar */}
          <div>
            <img
              src={avatar}
              alt={title}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300"
            />
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-800 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {title}
            </h3>
            <p className="text-xs text-gray-500 mt-1 italic">{date}</p>
          </div>

          {/* Arrow Icon */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopReviewCard;
