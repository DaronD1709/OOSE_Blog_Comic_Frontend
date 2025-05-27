import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const sentOTPAPI = async (otp, userId, email) => {
  try {
    const response = await axios.post(URL_BACKEND + `/api/v1/otp`, {
      otp: otp,
      userId: userId,
      email: email
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const resentOTPAPI = async (userId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/otp?userId=${userId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const resentOTPEmailAPI = async (email) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/otp/email/${email}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const resentOTPPasswordAPI = async (email) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/otp/forgot-password?email=${email}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}