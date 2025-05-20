import axios from '../api/axios.customize.js'
import { URL_BACKEND } from '../constants/api.js'

export const saveCharacterThumbnailAPI = async (formData) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const savePreviewThumbnailCharacterAPI = async (formData) => {
  try {
    const response = await axios.post(URL_BACKEND + '/api/v1/upload/preview', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const saveBlogCharacterAPI = async (blogCharacterRequest, thumbnail) => {
  try {
    const formData = new FormData()
    const jsonBlob = new Blob(
      [JSON.stringify(blogCharacterRequest)],
      { type: 'application/json' }
    )
    formData.append('blogCharacterRequest', jsonBlob)
    formData.append('thumbnail', thumbnail)
    const response = await axios.post(URL_BACKEND + '/api/v1/blog-character', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogCharacterAPI = async (id) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-character/${id}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogComicAPI = async (id) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-comic/${id}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getRelatedCharactersAPI = async (comicId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-character/related-characters/${comicId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getInsightsCharacterAPI = async (blogCharacterId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-insight/character/${blogCharacterId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getInsightsComicAPI = async (blogComicId) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-insight/comic/${blogComicId}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getAllBlogComicsAPI = async () => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-comic/all`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const updateBlogCharacterAPI = async (blogCharacterRequest, thumbnail, id) => {
  try {
    const formData = new FormData()
    const jsonBlob = new Blob(
      [JSON.stringify(blogCharacterRequest)],
      { type: 'application/json' }
    )
    formData.append('blogCharacterRequest', jsonBlob)
    if (thumbnail !== null) {
      formData.append('thumbnail', thumbnail)
    }
    const response = await axios.put(URL_BACKEND + `/api/v1/blog-character/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}
export const searchBlogByKeywordAPI = async (keyword, page, size) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blogs/search?keyword=${keyword}&page=${page}&size=${size}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const searchBlogWithFilter = async (categories, tags, page, size) => {

  const categoryIds = categories.join(',')
  const tagIds = tags.join(',')
  try {
    const response = await axios.get(
      URL_BACKEND + `/api/v1/blogs/filter?categoryIds=${categoryIds}&tagIds=${tagIds}&page=${page}&size=${size}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getAllBlogCharactersAPI = async () => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-character/all`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const saveBlogComicAPI = async (blogComicReq, thumbnail) => {
  try {
    const formData = new FormData()
    const jsonBlob = new Blob(
      [JSON.stringify(blogComicReq)],
      { type: 'application/json' }
    )
    formData.append('blogComicRequest', jsonBlob)
    formData.append('thumbnail', thumbnail)
    const response = await axios.post(URL_BACKEND + '/api/v1/blog-comic', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const saveBlogInsightAPI = async (blogInsightReq, thumbnail) => {
  try {
    const formData = new FormData()
    const jsonBlob = new Blob(
      [JSON.stringify(blogInsightReq)],
      { type: 'application/json' }
    )
    formData.append('blogInsightReq', jsonBlob)
    formData.append('thumbnail', thumbnail)
    const response = await axios.post(URL_BACKEND + '/api/v1/blog-insight', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogByIdAPI = async (id) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blogs/${id}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogInsightByIdAPI = async (id) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-insight/${id}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const updateBlogComicAPI = async (blogComicRequest, thumbnail, id) => {
  try {
    const formData = new FormData()
    const jsonBlob = new Blob(
      [JSON.stringify(blogComicRequest)],
      { type: 'application/json' }
    )
    formData.append('blogComicReq', jsonBlob)
    if (thumbnail !== null) {
      formData.append('thumbnail', thumbnail)
    }
    const response = await axios.put(URL_BACKEND + `/api/v1/blog-comic/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const updateBlogInsightAPI = async (blogInsightRequest, thumbnail, id) => {
  try {
    const formData = new FormData()
    const jsonBlob = new Blob(
      [JSON.stringify(blogInsightRequest)],
      { type: 'application/json' }
    )
    formData.append('blogInsightReq', jsonBlob)
    if (thumbnail !== null) {
      formData.append('thumbnail', thumbnail)
    }
    const response = await axios.put(URL_BACKEND + `/api/v1/blog-insight/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogComicPaginationAPI = async (page, size) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-comic?page=${page}&size=${size}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogCharacterPaginationAPI = async (page, size) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-character?page=${page}&size=${size}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogPaginationAPI = async (page, size) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blogs?page=${page}&size=${size}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getBlogInsightPaginationAPI = async (page, size) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blog-insight?page=${page}&size=${size}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getStatisticAPI = async () => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blogs/statistic`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const getAllBlogAPI = async (page, size) => {
  try {
    const response = await axios.get(URL_BACKEND + `/api/v1/blogs/all`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const updateBlogStatusAPI = async ({ blogId, status }) => {

  try {
    const response = await axios.patch(URL_BACKEND + `/api/v1/blogs/review/${blogId}`, JSON.stringify(status),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}

export const deleteBlogByIdAPI = async (id) => {
  try {
    const response = await axios.delete(URL_BACKEND + `/api/v1/blogs/${id}`)
    // Xử lý hoặc kiểm tra dữ liệu nếu cần
    return response
  } catch (error) {
    throw error
  }
}




