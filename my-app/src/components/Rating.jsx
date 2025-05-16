import React, { useState, useEffect } from "react";
import { message, Tooltip } from "antd";
import { StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";
import { saveRateAPI, getUserRateAPI } from "../services/rateService";

const Rating = ({
  initialRating = 0,
  ratingCount = 0,
  onRate,
  user,
  blogId,
  size = "default",
  showCount = true,
  interactive = true,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRating(initialRating);
    if (user && blogId) {
      checkUserRate();
    }
  }, [initialRating, user, blogId]);

  const checkUserRate = async () => {
    try {
      const res = await getUserRateAPI(user.id, blogId);
      if (res) {
        setIsRated(true);
        setRating(res.rate);
      }
    } catch (err) {
      console.error("Error checking user rate:", err);
    }
  };

  const handleRate = async (value) => {
    if (!interactive) return;

    if (user === null) {
      message.error("Bạn chưa đăng nhập");
      return;
    }

    if (isRated) {
      message.info("Bạn đã đánh giá rồi");
      return;
    }

    setIsLoading(true);
    try {
      const response = await saveRateAPI({
        userId: user.id,
        blogId: blogId,
        rate: value,
      });

      if (response) {
        setRating(value);
        setIsRated(true);
        onRate?.(value);
        message.success("Đánh giá thành công!");
      } else {
        message.error("Không thể đánh giá. Vui lòng thử lại sau.");
      }
    } catch (err) {
      console.error("Error rating:", err);
      if (err.response?.status === 400) {
        message.error("Bạn đã đánh giá bài viết này rồi");
      } else if (err.response?.status === 401) {
        message.error("Bạn cần đăng nhập để đánh giá");
      } else {
        message.error("Không thể đánh giá. Vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseEnter = (value) => {
    if (!interactive || isLoading) return;
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (!interactive || isLoading) return;
    setHoverRating(0);
  };

  const getStarSize = () => {
    switch (size) {
      case "small":
        return "text-5xl";
      case "large":
        return "text-7xl";
      default:
        return "text-6xl";
    }
  };

  const getRatingText = (value) => {
    switch (value) {
      case 1:
        return "Rất tệ";
      case 2:
        return "Không hay";
      case 3:
        return "Bình thường";
      case 4:
        return "Hay";
      case 5:
        return "Rất hay";
      default:
        return "Chưa đánh giá";
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Tooltip key={star} title={getRatingText(star)} placement="top">
            <button
              className={`${getStarSize()} transition-all duration-300 transform hover:scale-110 ${
                interactive && !isLoading ? "cursor-pointer" : "cursor-default"
              } ${isLoading ? "opacity-50" : ""}`}
              onClick={() => handleRate(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              disabled={!interactive || isLoading}
            >
              {star <= (hoverRating || rating) ? (
                <StarTwoTone
                  twoToneColor="#fbbf24"
                  className="drop-shadow-lg"
                  style={{
                    filter: "drop-shadow(0 0 3px rgba(234, 179, 8, 0.6))",
                    fontSize: "inherit",
                  }}
                />
              ) : (
                <StarOutlined
                  className="text-gray-300"
                  style={{ fontSize: "inherit" }}
                />
              )}
            </button>
          </Tooltip>
        ))}
      </div>
      {showCount && (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-800">
            {rating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500">
            ({ratingCount} đánh giá)
          </span>
        </div>
      )}
    </div>
  );
};

export default Rating;
