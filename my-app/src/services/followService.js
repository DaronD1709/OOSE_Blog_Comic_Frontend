import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const followBloggerAPI = async ({ userId, bloggerId }) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/follows', {
      userId: userId,
      bloggerId: bloggerId,

    })
    return response
  } catch (error) {
    throw error
  }
}

export const findFollowAPI = async ({ userId, bloggerId }) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/follows/find?userId=${userId}&bloggerId=${bloggerId}`)
    return response
  } catch (error) {
    throw error
  }
}

export const unfollowBloggerAPI = async ({ userId, bloggerId }) => {
  try {
    const response = await axios.delete(URL_BACKEND + `/api/v1/follows?userId=${userId}&bloggerId=${bloggerId}`)
    return response
  } catch (error) {
    throw error
  }
}

export const fetchAllFollowsAPI = async () => {
  try {
    const response = await axios.get(URL_BACKEND + '/api/v1/follows');
    return response.data || response;
  } catch (error) {
    throw error;
  }
};


// Lấy danh sách người dùng đang theo dõi một blogger
export const getFollowersByBloggerAPI = async (bloggerId) => {
  try {
    // Đúng endpoint: /api/v1/follows/blogger/{bloggerId}
    const response = await axios.get(URL_BACKEND + `/api/v1/follows/blogger/${bloggerId}`);
    return response.data?.data || response.data || response;
  } catch (error) {
    throw error;
  }
};
// Lấy danh sách blogger mà một người dùng đang theo dõi
export const getFollowingByUserAPI = async (userId) => {
  try {
    // Đúng endpoint: /api/v1/follows/user/{userId}
    const response = await axios.get(URL_BACKEND + `/api/v1/follows/user/${userId}`);
    return response.data?.data || response.data || response;
  } catch (error) {
    throw error;
  }
};
