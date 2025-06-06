import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const getAllCategoryAPI = async () => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/categories`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}