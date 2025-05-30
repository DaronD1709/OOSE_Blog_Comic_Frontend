import React, { useEffect, useState } from "react";
import { Card, message } from "antd";
import { Link } from "react-router-dom";
import { formatDatetimeWithTimeFirst } from "../../services/helperService.js";
import { ROUTES } from "../../constants/api.js";
import {
  EyeOutlined,
  MessageOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { getCommentCountOfBlogAPI } from "../../services/commentService.js";
import { getFavouriteCountBlogAPI } from "../../services/favoriteService.js";
import { getThumbnail } from "../../constants/utility.js";

const VerticalCard = (props) => {
  const {
    id,
    type,
    thumbnail,
    createdAt,
    title,
    introduction,
    rating,
    rateCount,
    view,
    tags = [],
    categories = [],
  } = props;

  const [commentCount, setCommentCount] = useState(null);
  const [saveCount, setSaveCount] = useState(null);

  useEffect(() => {
    getCommentCount();
    getFavoriteCount();
  }, [id]);

  const getCommentCount = async () => {
    try {
      const res = await getCommentCountOfBlogAPI(id);
      setCommentCount(res);
    } catch (err) {
      message.error(err.data);
    }
  };

  const getFavoriteCount = async () => {
    try {
      const res = await getFavouriteCountBlogAPI(id);
      setSaveCount(res);
    } catch (err) {
      message.error(err.data);
    }
  };

  return (
    <Link
      to={
        type !== null && type.toLowerCase() === "character"
          ? `${ROUTES.getViewCharacter(id)}`
          : `${ROUTES.getViewComic(id)}`
      }
    >
      <Card
        className="hover:shadow-lg transition-shadow duration-300"
        hoverable
        style={{
          width: 300,
          borderRadius: 12,
          overflow: "hidden",
        }}
        cover={
          <div style={{ position: "relative" }}>
            <img
              alt={title}
              src={`${getThumbnail(thumbnail)}`}
              className="group-hover:scale-105 transition-transform duration-300"
              style={{ width: "100%", height: 300, objectFit: "cover" }}
            />

            <div
              style={{
                position: "absolute",
                top: 18,
                left: 10,
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {categories.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2.5 py-0.5 text-xs font-medium text-blue-400 border border-blue-400/30 bg-blue-100 rounded-md"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div
              style={{
                marginTop: "8px",
                position: "absolute",
                top: 40,
                left: 10,
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {tags.map((category) => (
                <span
                  key={category.id}
                  className="px-2.5 py-0.5 text-xs font-medium text-emerald-500 border border-emerald-200 bg-emerald-50 rounded-md"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        }
      >
        <div className="px-1">
          <p className="text-xs text-gray-500 mb-2">
            {formatDatetimeWithTimeFirst(createdAt)}
          </p>
          <h3
            className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2"
            style={{
              lineHeight: "1.4em",
              height: "3rem",
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm text-gray-600 mb-5 line-clamp-3"
            style={{
              lineHeight: "1.5em",
              height: "4.5em",
            }}
          >
            {introduction}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
              <span className="text-yellow-500 text-sm">★</span>
              <span className="text-xs font-medium text-gray-800">
                {rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500">({rateCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                <EyeOutlined className="text-sm text-blue-500" />
                <span className="text-xs font-medium text-gray-700">
                  {view}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                <MessageOutlined className="text-sm text-green-500" />
                <span className="text-xs font-medium text-gray-700">
                  {commentCount}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full">
                <BookOutlined className="text-sm text-purple-500" />
                <span className="text-xs font-medium text-gray-700">
                  {saveCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default VerticalCard;
