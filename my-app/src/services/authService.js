
import axios from '/src/api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const loginAPI = async (username, password) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/auth/login', {
      identifier: username,
      password: password
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const registerAPI = async (username, password, email, displayName) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/auth/register', {
      username: username,
      password: password,
      email: email,
      displayName: displayName,
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}
