import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const getNotificationByUserIdAPI = async ({ userId }) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/notifications/user/${userId}`)
    return response
  } catch (error) {
    throw error
  }
}

export const markAsReadNotificationAPI = async ({ notificationId }) => {
  try {
    const response = await axios.put(URL_BACKEND + `/api/v1/notifications/${notificationId}/read`)
    return response
  } catch (error) {
    throw error
  }
}

export const deleteAllNotificationsByUserIdAPI = async ({ userId }) => {
  try {
    const response = await axios.delete(URL_BACKEND + `/api/v1/notifications?userId=${userId}`)
    return response
  } catch (error) {
    throw error
  }
}