import { useState, useEffect } from 'react'
import { Upload, message, Avatar } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { beforeUpload } from '../../utils/imageUtils'
import { URL_BACKEND } from '../../constants/api'

// Component chỉ hiển thị avatar
export function AvatarDisplay ({ avatar }) {
  const getAvatarUrl = (avatar) => {
    if (!avatar) return null
    if (avatar.startsWith('https')) return avatar
    return `${URL_BACKEND}/uploads/${avatar}`
  }
  return (
    <div className="flex flex-col items-center w-full">
      <Avatar
        src={getAvatarUrl(avatar)}
        size={200}
        className="rounded-full border-2 border-gray-200"
      />
    </div>
  )
}

// Component upload avatar
function AvatarUpload ({ initialAvatar, onUpload }) {
  const [loading, setLoading] = useState(false)
  const getAvatarUrl = (avatar) => {
    if (!avatar) return null
    if (avatar.startsWith('http')) return avatar
    return `${URL_BACKEND}/uploads/${avatar}`
  }
  const [imageUrl, setImageUrl] = useState(getAvatarUrl(initialAvatar))

  // Thêm useEffect để cập nhật lại imageUrl khi initialAvatar thay đổi
  useEffect(() => {
    setImageUrl(getAvatarUrl(initialAvatar))
  }, [initialAvatar])

  const handleChange = async (info) => {
    if (!onUpload) return
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      try {
        const avatarFileName = await onUpload(info.file.originFileObj)
        setImageUrl(getAvatarUrl(avatarFileName))
      } catch (error) {
        console.error('Error uploading avatar:', error)
        message.error('Tải ảnh lên thất bại.')
      } finally {
        setLoading(false)
      }
    }
  }

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const uploadButton = (
    <div className="flex flex-col items-center">
      {loading ? <LoadingOutlined style={{ fontSize: 64 }}/> : <PlusOutlined style={{ fontSize: 64 }}/>}
      <div className="mt-4">
        <button
          type="button"
          className="text-xl py-6 px-12 font-semibold bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition-all duration-200"
          style={{ minWidth: 240 }}
        >
          Tải lên
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center w-full">
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader flex justify-center"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customRequest}
      >
        {imageUrl ? (
          <Avatar
            src={getAvatarUrl(imageUrl)}
            size={100}
            className="rounded-full border-2 border-gray-200"
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <p className="mt-3 text-sm text-gray-500 text-center">
        Nhấn để thay đổi ảnh đại diện
      </p>
    </div>
  )
}

export default AvatarUpload