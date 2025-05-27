import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const reviewService = {
  // Lấy danh sách reviews với phân trang
  getReviews: async (page = 1, pageSize = 5) => {
    try {
      const response = await axios.get(`${API_URL}/reviews`, {
        params: {
          page,
          pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  },

  // Lấy danh sách reviews trending
  getTrendingReviews: async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews/trending`);
      return response.data;
    } catch (error) {
      console.error("Error fetching trending reviews:", error);
      throw error;
    }
  },

  // Xử lý like/unlike
  toggleLike: async (reviewId) => {
    try {
      const response = await axios.post(`${API_URL}/reviews/${reviewId}/like`);
      return response.data;
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  },

  // Xử lý save/unsave
  toggleSave: async (reviewId) => {
    try {
      const response = await axios.post(`${API_URL}/reviews/${reviewId}/save`);
      return response.data;
    } catch (error) {
      console.error("Error toggling save:", error);
      throw error;
    }
  },

  // Xử lý comment
  addComment: async (reviewId, comment) => {
    try {
      const response = await axios.post(
        `${API_URL}/reviews/${reviewId}/comments`,
        { comment }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },
};
