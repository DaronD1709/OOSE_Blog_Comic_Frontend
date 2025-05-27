import React, { useState, useEffect, useContext } from 'react'
import { Tabs, message } from 'antd'
import { useParams, useLocation } from 'react-router-dom'
import UserDisplay from '../components/User/UserDisplay'
import UserForm from '../components/User/UserForm'
import AvatarUpload from '../components/User/AvatarUpload'
import { AvatarDisplay } from '../components/User/AvatarUpload'
import FavouriteList from '../components/Favourite/FavouriteList'
import { getFavouritesByUserAPI } from '../services/favoriteService.js'
import FollowingList from '../components/Follow/FollowingList.jsx'
import {
  fetchUserById,
  updateUser,
  updateUserAvatarService,
} from '../services/userService'
import { getFollowingByUserAPI } from '../services/followService.js'
import { AuthContext } from '../context/auth.context.jsx'
import { getUserAvatar } from '../constants/utility.js'

const { TabPane } = Tabs

const UserPage = () => {
  const [userData, setUserData] = useState({
    id: null,
    fullName: '',
    email: '',
    phoneNumber: '',
    username: '',
    role: '',
    avatar: null
  })
  const [loading, setLoading] = useState(true)
  const [favouriteBlogs, setFavouriteBlogs] = useState([])
  const [followingList, setFollowingList] = useState([])

  // Get URL parameters
  const { id: paramId } = useParams()
  const location = useLocation()
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {

  }, [user])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        let response
        if (paramId) {
          response = await fetchUserById(paramId)
        } else {
          message.error('Không tìm thấy thông tin người dùng, vui lòng đăng nhập')
          setLoading(false)
          return
        }
        setUserData({
          id: response.id,
          fullName: response.fullName || response.displayName || '',
          email: response.email || '',
          phoneNumber: response.phoneNumber || '',
          username: response.username || '',
          role: response.role || 'user',
          avatar: response.avatar || null
        })
        // Lấy danh sách bài viết yêu thích
        if (response.id) {
          try {
            const favRes = await getFavouritesByUserAPI(response.id)
            setFavouriteBlogs(favRes.map(fav => fav.blog || fav))
          } catch (e) {
            setFavouriteBlogs([])
          }
          try {
            const following = await getFollowingByUserAPI(response.id)
            if (following && following.length > 0) {
              setFollowingList(following)
            } else {
              setFollowingList([])
            }
          } catch (e) {
            console.error('Error fetching following list:', e)
            setFollowingList([])
          }
        }
      } catch (error) {
        message.error('Không thể tải thông tin người dùng')
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [paramId, location.pathname])

  const handleAvatarUpload = async (file) => {
    try {
      const response = await updateUserAvatarService(user.id, file)
      setUser(prev => ({ ...prev, ...response }))
      message.success('Cập nhật ảnh đại diện thành công')
      return Promise.resolve()
    } catch (error) {
      message.error('Cập nhật ảnh đại diện thất bại')
      return Promise.reject(error)
    }
  }

  if (loading) {
    return <div className="text-center py-10">Đang tải thông tin...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thông tin người dùng</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin tài khoản" key="1">
          <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-2/5 flex justify-center">
              <AvatarDisplay
                avatar={user?.avatar}
                size={200}
                className="rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="md:w-3/5">
              <UserDisplay userData={user}/>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Chỉnh sửa tài khoản" key="2">
          <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-2/5 flex justify-center">
              {/* Chỉ cho phép upload ở tab này */}
              <AvatarUpload initialAvatar={getUserAvatar(user?.avatar)} onUpload={handleAvatarUpload}/>
            </div>
            <div className="md:w-3/5">
              <UserForm initialData={user} setUser={setUser}/>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Bài viết yêu thích" key="3">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Bài viết yêu thích</h2>
            <FavouriteList blogs={favouriteBlogs}/>
          </div>
        </TabPane>
        <TabPane tab="Đang theo dõi" key="4">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Blogger đang theo dõi</h2>
            <FollowingList following={followingList.map(f =>f.blogger.id )}/>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default UserPage