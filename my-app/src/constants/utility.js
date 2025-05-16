import { URL_BACKEND_IMAGES } from './images.js'
import { avatarClasses } from '@mui/material'

export const getBloggerAvatar = (blog) => {
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
  if (avatar.startsWith('https://')) {
    return avatar
  } else {
    return getLocalAvatar(avatar)
  }
}

export const getThumbnail = (thumbnail) => {
  if (thumbnail.startsWith('https://')) {
    return thumbnail
  } else {
    return getLocalAvatar(thumbnail)
  }
}