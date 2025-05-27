import React from "react";
import PropTypes from "prop-types";

const DisplayAuthorInfo = ({ author }) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-2 max-w-[250px] mx-auto">
      <div className="flex items-center space-x-2 gap-2">
        <div className="flex-shrink-0">
          <img
            src={author.avatar || "/default-avatar.png"}
            alt={`${author.displayName}'s avatar`}
            className="h-8 w-8 rounded-full object-cover border border-blue-300 ml-3"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-5">
            <h2 className="text-sm font-medium text-gray-900 pt-1.5 truncate">
              {author.displayName}
            </h2>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 whitespace-nowrap">
              Lv.{author.level}
            </span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {author.email}
          </p>
        </div>
      </div>
    </div>
  );
};

DisplayAuthorInfo.propTypes = {
  author: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default DisplayAuthorInfo;
