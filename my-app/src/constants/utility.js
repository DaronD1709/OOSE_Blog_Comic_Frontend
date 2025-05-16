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