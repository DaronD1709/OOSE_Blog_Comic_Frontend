import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const saveReactionToABlogAPI = async ({ userId, blogId, reaction, type }) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/reactions', {
      authorId: userId,
      reaction: reaction,
      blogId: blogId,
      type: type
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getAllReactionCountAPI = async () => {
  try {
    // Sử dụng endpoint chuẩn để cập nhật thông tin người dùng
    const response = await axios.get(URL_BACKEND + `/api/v1/reactions/count-all`)
    return response
  } catch (error) {
    throw error
  }
}