import React, { useEffect, useRef } from 'react'
import { Image } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const EditImageUpload = ({ imgSrc, setImgSrc, setBlogCharacterThumbnail }) => {
  const inputRef = useRef(null)
  const handleImageClick = () => {
    inputRef.current?.click()
  }
  console.log('Check')

  useEffect(() => {
    if (
      imgSrc !== null
    ) {
      setImgSrc(imgSrc)
    }
  }, [imgSrc])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setBlogCharacterThumbnail(file)

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

export default EditImageUpload
