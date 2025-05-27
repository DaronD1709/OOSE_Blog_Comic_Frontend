import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { FavouriteContext } from '../../context/FavouriteContext';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

function FavouriteButton({ blogId, size = 'middle' }) {
  const { isFavourite, addFavourite, removeFavourite } = useContext(FavouriteContext);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(isFavourite(blogId));
  }, [blogId, isFavourite]);

  const handleToggleFavourite = () => {
    if (isFavorited) {
      removeFavourite(blogId);
    } else {
      addFavourite(blogId);
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <Tooltip title={isFavorited ? "Xóa khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích"}>
      <Button
        type="primary"
        icon={isFavorited ? <HeartFilled /> : <HeartOutlined />}
        onClick={handleToggleFavourite}
        size={size}
        className={isFavorited ? "bg-green-600 hover:bg-green-700" : "bg-green-200 hover:bg-green-300"}
      />
    </Tooltip>
  );
}

export default FavouriteButton; 