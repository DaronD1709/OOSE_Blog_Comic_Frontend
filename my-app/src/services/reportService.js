import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const createReportAPI = async ({ reportReq }) => {
  try {
    const response = await axios.post(
      URL_BACKEND + `/api/v1/reports`, {
        userId: reportReq.userId,
        reason: reportReq.reason,
        eReportType: reportReq.eReportType,
        blogId: reportReq.blogId,
        commentId: reportReq.commentId,
        type: reportReq.type,
        url: reportReq.url,
      }
    )
    return response
  } catch (error) {
    console.error(
      'Error getting user rate:',
      error.response?.data || error.message
    )
    throw error
  }
}

export const getAllCommentReportAPI = async () => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/reports?type=Comment`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getResultReport = async ({ result, type }) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/reports/${result}?type=${type}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const markReportAsResultAPI = async ({ reportId, result, type }) => {
  try {
    const response = await axios.patch(URL_BACKEND + `/api/v1/reports/${result}/${reportId}?type=${type}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const deleteReport = async ({ reportId, type }) => {
  try {
    const response = await axios.delete(URL_BACKEND + `/api/v1/reports?type=${type}&id=${reportId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}