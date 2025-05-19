import { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { fetchAccountAPI } from '../services/userService.js'
import { AuthContext } from '../context/auth.context.jsx'

const Callback = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)
  useEffect(() => {
    // Lấy query parameters từ URL
    const query = new URLSearchParams(location.search)
    const token = query.get('token') // JWT từ BackEnd
    const error = query.get('error') // Thông tin lỗi (nếu có)
    if (token) {
      // Lưu JWT vào localStorage (hoặc sessionStorage)
      localStorage.setItem('access_token', token)
      fetchAccount()
      // Chuyển hướng tới trang dashboard
      navigate('/')
    } else if (error) {
      // Xử lý lỗi (ví dụ: redirect về trang login với thông báo lỗi)
      message.error('Đăng nhập thất bại')
      navigate('/login', { state: { error: 'Google login failed' } })
    } else {
      // Trường hợp không có token hoặc lỗi
      navigate('/login', { state: { error: 'Invalid callback' } })
    }
  }, [location, navigate])

  const fetchAccount = async () => {
    try {
      const res = await fetchAccountAPI()
      setUser(res)
    } catch (err) {
      message.error('Lỗi khi cố gắng truy vấn dữ liệu người dùng')
    }

  }
  return <div>Loading...</div>
}

export default Callback