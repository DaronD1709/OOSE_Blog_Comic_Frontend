// components/RequireRole.jsx
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { message } from 'antd' // tùy đường dẫn bạn

const RequireRole = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext)
  if (loading) return <div className="text-center mt-20">Đang xác thực...</div>
  if (!user) {
    message.info('Không có quyền truy cập đường dẫn này ')
    return <Navigate to="/login" replace/>
  }

  if (!allowedRoles.includes(user.role)) {
    message.info('Không có quyền truy cập đường dẫn này ')
    return <Navigate to="/" replace/>
  }

  return <Outlet/>
}

export default RequireRole
