import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUserById } from '../services/userService'
// import FollowButton from '../components/Follow/FollowButton'; // Uncomment when you have this component
import { AvatarDisplay } from '../components/User/AvatarUpload'
import { BloggerInfo } from '../components/blog/BloggerInfo'
import { getUserAvatar } from '../constants/utility.js'
import { validate } from '../utils/validate.js'
import mythAvatar from '/src/assets/images/anonymous.png'

const UserPublicPage = () => {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetchUserById(id)
        const user = response.data || response
        setUserData(user)
      } catch (error) {
        setUserData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <div className="text-center py-10">Đang tải thông tin...</div>
  if (!userData) return <div className="text-center py-10 text-red-500">Không tìm thấy người dùng</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thông tin người dùng</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-2/5 flex justify-center">
          <AvatarDisplay avatar={getUserAvatar(userData.avatar)} size={200}
                         className="rounded-full border-2 border-gray-300"/>
        </div>
        <div className="md:w-3/5">
          <BloggerInfo
            name={userData.fullName || userData.displayName}
            avatarUrl={getUserAvatar(userData.avatar)}
            date={userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : ''}
            authorId={userData.id}
            onFollow={() => {
              // TODO: Gọi API follow ở đây
              alert('Theo dõi thành công!')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default UserPublicPage
