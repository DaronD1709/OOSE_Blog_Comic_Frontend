// Data Access Layer: fetch dữ liệu từ server
import axios from './axios.customize.js'

// Base URL is handled by axios instance

// Get all users
export const getUsers = () => axios.get('/api/v1/users')

// Get user by ID
export const getUserById = (id) => axios.get(`/api/v1/users/${id}`)

// Get user by username
export const getUserByUsername = (username) => axios.get(`/api/v1/users/username/${username}`)

// Get user by email
export const getUserByEmail = (email) => axios.get(`/api/v1/users/email/${email}`)

// Update user by ID
export const updateUserById = (id, userData) => axios.put(`/api/v1/users/${id}`, userData)

// Update user by email
export const updateUserByEmail = (email, userData) => axios.put(`/api/v1/users/email/${email}`, userData)

// Update user avatar
export const updateUserAvatar = (userId, avatarFile) => {
  const formData = new FormData()
  formData.append('userId', userId)
  formData.append('avatar', avatarFile)
  
  return axios.patch('/api/v1/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// Update user status
export const updateUserStatus = (id, status) => axios.put(`/api/v1/users/${id}/status?status=${status}`)

// Delete user
export const deleteUser = (id) => axios.delete(`/api/v1/users/${id}`)
