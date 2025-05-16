import { message } from 'antd'

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'|| file.type === 'image/webp'
  if (!isJpgOrPng) {
    message.error('Bạn chỉ có thể tải lên file JPG/PNG/WEBP/JPEG!')
    return false
  }
  const isLt2M = file.size / 1024 / 1024 <= 5
  if (!isLt2M) {
    message.error('Ảnh phải nhỏ hơn 5MB!')
    return false
  }
  return true
}

export const getBase64 = (img) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.addEventListener('error', (error) => reject(error))
    reader.readAsDataURL(img)
  })
}