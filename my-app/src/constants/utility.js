import { URL_BACKEND_IMAGES } from './images.js'
import { validate } from '../utils/validate.js'
import mythAvatar from '../assets/images/anonymous.png'

export const getBloggerAvatar = (blog) => {
  if (!validate(blog))
    return mythAvatar
  if (blog.author.loginType === 'LOCAL') {
    return getLocalAvatar(blog.author.avatar)
  } else {
    return blog.author.avatar
  }
}
export const getLocalAvatar = (avatar) => {
  return `${URL_BACKEND_IMAGES}/${avatar}`
}

export const getUserAvatar = (avatar) => {
  if (!validate(avatar)) return mythAvatar
  if (avatar.startsWith('https://')) {
    return avatar
  } else {
    return getLocalAvatar(avatar)
  }
}

export const getThumbnail = (thumbnail) => {
  if (!validate(thumbnail)) return null
  if (thumbnail.startsWith('https://')) {
    return thumbnail
  } else {
    return getLocalAvatar(thumbnail)
  }
}