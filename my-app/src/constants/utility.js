import { validate } from '../utils/validate.js'
import mythAvatar from '../assets/images/anonymous.png'

export const getUserAvatar = (avatar) => {
  if (!validate(avatar)) return mythAvatar
  return avatar
}

export const getThumbnail = (thumbnail) => {
  if (!validate(thumbnail)) return null
  return thumbnail
}

export const urlToFile = async (filename) => {
  const response = await fetch(filename)
  const blob = await response.blob()
  const mimeType = filename.split('.').pop() // "webp"
  return new File([blob], filename, { type: mimeType })
}

export const mapReasonToEnum = (reason) => {
  switch (reason) {
    case 'Nội dung phản cảm':
      return 'INAPPROPRIATE'
    case 'Spam':
      return 'SPAM'
    case 'Ngôn từ thù ghét':
      return 'HATED_WORDS'
    case 'Thông Tin Sai Lệch':
      return 'MISINFORMATION'
    case 'Quấy Rối':
      return 'HARASSMENT'
    case 'Khác':
      return 'OTHER'
    default:
      return 'OTHER' // fallback nếu BE yêu cầu
  }
}