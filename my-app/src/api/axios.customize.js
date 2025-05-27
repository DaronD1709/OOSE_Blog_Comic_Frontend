import axios from 'axios'
import { message } from 'antd'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context.jsx'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  if (typeof window !== 'undefined' && window && window.localStorage && window.localStorage.getItem('access_token')) {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token')
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)

})

// --- Auto refresh token ---
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

instance.interceptors.response.use(
  (response) => {
    // Nếu dùng format ApiResponse<T>
    if (response?.data?.data !== undefined) {
      return response.data.data // <-- chỉ trả về phần "data thực"
    }

    return response.data // fallback nếu format không đúng
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // Token hết hạn
      if (isRefreshing) {
        // Nếu đang đợi refresh, xếp hàng
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token
              resolve(instance(originalRequest))
            },
            reject: (err) => reject(err),
          })
        })
      }
      originalRequest._retry = true
      isRefreshing = true

      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + '/api/v1/auth/refresh',
          { withCredentials: true }
        )

        const newToken = res.data?.data?.accessToken
        localStorage.setItem('access_token', newToken)
        processQueue(null, newToken)

        // Gửi lại request gốc
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken
        return instance(originalRequest)
      } catch (err) {
        processQueue(err, null)
        window.dispatchEvent(new Event('auth-expired'))
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default instance
