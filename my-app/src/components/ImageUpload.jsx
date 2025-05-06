import React, { useRef, useState } from 'react'
import { Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const ClickableImageUpload = () => {
  const [imgSrc, setImgSrc] = useState('')
  const inputRef = useRef(null)

  const handleImageClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImgSrc(reader.result)
    }
    reader.readAsDataURL(file)

    e.target.value = null // reset input
  }

  return (
    <>
      <input 
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFileChange}
      />

      {imgSrc ? (
        <Image 
          src={imgSrc}
          preview={false}
          onClick={handleImageClick}
          style={{ cursor: 'pointer', width: 'auto', height: 'auto', objectFit: 'cover' }}
        />
      ) : (
        <div
          onClick={handleImageClick}
          style={{
            width: 'auto',
            height: 200,
            border: '1px dashed #d9d9d9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
            color: '#999',
          }}
        >
          <PlusOutlined style={{ fontSize: 24 }}/>
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </>
  )
}

export default ClickableImageUpload
