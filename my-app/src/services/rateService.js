import axios from "../api/axios.customize.js";
import { URL_BACKEND } from "../constants/api.js";

export const getAllRateCountAPI = async () => {
  try {
    // Sử dụng endpoint chuẩn để cập nhật thông tin người dùng
    const response = await axios.get(URL_BACKEND + `/api/v1/rates/count-all`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const saveRateAPI = async ({ userId, blogId, rate }) => {
  try {
    const response = await axios.post(URL_BACKEND + "/api/v1/rates/save", {
      userId,
      blogId,
      rate,
    });
    return response;
  } catch (error) {
    console.error("Error saving rate:", error.response?.data || error.message);
    throw error;
  }
};

export const getBlogRateAPI = async (blogId) => {
  try {
    const response = await axios.get(
      URL_BACKEND + `/api/v1/rates/blog/${blogId}`
    );
    return response;
  } catch (error) {
    console.error(
      "Error getting blog rate:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserRateAPI = async (userId, blogId) => {
  try {
    const response = await axios.get(
      URL_BACKEND + `/api/v1/rates/user/${userId}/blog/${blogId}`
    );
    return response;
  } catch (error) {
    console.error(
      "Error getting user rate:",
      error.response?.data || error.message
    );
    throw error;
  }
};
