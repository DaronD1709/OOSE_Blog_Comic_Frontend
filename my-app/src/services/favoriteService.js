import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const getFavouriteCountBlogAPI = async (blogId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/favorites/blog-count/${blogId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

// Lưu bài viết vào danh sách yêu thích
export const saveFavouriteBlogAPI = async (userId, blogId) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/favorites', {
      userId,
      blogId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Bỏ lưu bài viết yêu thích (xoá khỏi favourite)
export const removeFavouriteBlogAPI = async (favoriteId) => {
  try {
    const response = await axios.delete(URL_BACKEND + `/api/v1/favorites/${favoriteId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Lấy favourite theo userId và blogId (để kiểm tra đã favourite chưa)
export const getFavouriteByUserAndBlogAPI = async (userId, blogId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/favorites/user/${userId}/blog/${blogId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Lấy tất cả bài viết yêu thích của user
export const getFavouritesByUserAPI = async (userId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/favorites/user/${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
}