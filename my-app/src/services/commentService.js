import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const getHighestCommentApi = async (blogId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/comments/comment-in-blog/${blogId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const addCommentToBlogAPI = async ({
  blogId,
  content,
  parentId,
  userId,
}) => {
  try {
    let data
    if (parentId !== null) {
      data = {
        content: content,
        blogId: blogId,
        userId: userId,
        parentId: parentId,
      }
    } else {
      data = {
        content: content,
        blogId: blogId,
        userId: userId,
      }
    }
    const response = await axios.post(URL_BACKEND + `/api/v1/comments`, data)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getCommentCountOfBlogAPI = async (blogId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/comments/count/${blogId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getAllCommentCountAPI = async () => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/comments/count-all`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}
