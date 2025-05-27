import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";

const FollowButton = ({ isFollowing: initialIsFollowing = false, onFollow, onUnfollow, loading = false }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const handleClick = async () => {
    setBtnLoading(true);
    try {
      if (isFollowing) {
        if (onUnfollow) await onUnfollow();
        setIsFollowing(false);
      } else {
        if (onFollow) await onFollow();
        setIsFollowing(true);
      }
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      icon={isFollowing ? <CheckOutlined /> : <PlusOutlined />}
      type={isFollowing ? "default" : "primary"}
      className="!mt-2 !rounded-full px-4 !font-bold font-[Quicksand]"
      loading={btnLoading || loading}
    >
      {isFollowing ? "Đã theo dõi" : "Theo dõi"}
    </Button>
  );
};

export default FollowButton;
