export const formatDatetimeWithTimeFirst = (createdAtStr) => {
  // Cắt chuỗi mili giây về 3 chữ số
  const fixedStr = createdAtStr.replace(/(\.\d{3})\d*/, '$1')
  const date = new Date(fixedStr)

  const datePart = date.toLocaleDateString('vi-VN') // 10/05/2025
  const timePart = date.toLocaleTimeString('vi-VN') // 10:48:03

  return `${timePart} ${datePart}` // => 10:48:03 10/05/2025
}
