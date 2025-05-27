// src/components/ScrollToHash.js
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToHash = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      // Delay để đảm bảo phần tử đã render
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100) // Có thể điều chỉnh thời gian nếu cần
    }
  }, [location])

  return null
}

export default ScrollToHash
