import React, { useEffect, useState } from 'react'
import { Card, message } from 'antd'
import { Link } from 'react-router-dom'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'
import { formatDatetimeWithTimeFirst } from '../../services/helperService.js'
import { ROUTES } from '../../constants/api.js'
import {
  ShareAltOutlined,
  EllipsisOutlined,
  StarOutlined,
  EyeOutlined,
  MessageOutlined,
  BookOutlined,
} from '@ant-design/icons'
import { getCommentCountOfBlogAPI } from '../../services/commentService.js'
import { getFavouriteCountBlogAPI } from '../../services/favoriteService.js'
import { getThumbnail } from '../../constants/utility.js'

const VerticalCard = (props) => {
  const {
    id,
    type,
    thumbnail,
    createdAt,
    title,
    introduction,
    rating,
    rateCount,
    view,
    tags = [],
    categories = [],
  } = props

  const [commentCount, setCommentCount] = useState(null)
  const [saveCount, setSaveCount] = useState(null)

  useEffect(() => {
    getCommentCount()
    getFavoriteCount()
  }, [id])

  const getCommentCount = async () => {
    try {
      const res = await getCommentCountOfBlogAPI(id)
      setCommentCount(res)
    } catch (err) {
      message.error(err.data)

    }
  }

  const getFavoriteCount = async () => {
    try {
      const res = await getFavouriteCountBlogAPI(id)
      setSaveCount(res)
    } catch (err) {
      message.error(err.data)

    }
  }

  return (

    <Link to={type !== null && type.toLowerCase() === 'character' ? `${ROUTES.getViewCharacter(
      id)}` : `${ROUTES.getViewComic(id)}`}>
      <Card
        className="hover:shadow-lg transition-shadow duration-300"
        hoverable
        style={{
          width: 300,
          borderRadius: 12,
          overflow: 'hidden',
        }}
        cover={
          <div style={{ position: 'relative' }}>
            <img
              alt={title}
              src={`${getThumbnail(thumbnail)}`}
              className="group-hover:scale-105 transition-transform duration-300"
              style={{ width: '100%', height: 200, objectFit: 'cover' }}
            />

            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px',
              }}
            >
              {categories.map((tag, index) => (
                <span
                  key={tag.id}
                  style={{
                    background: 'linear-gradient(to right, #fb7185, #f43f5e)',
                    padding: '4px 10px',
                    color: 'white',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div
              style={{
                marginTop: '5px',
                position: 'absolute',
                top: 40,
                left: 10,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px',
              }}
            >
              {tags.map((category, index) => (
                <span
                  key={category.id}
                  style={{
                    background: '#6366f1',
                    padding: '3px 8px',
                    color: 'white',
                    borderRadius: 16,
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        }
      >
        <div className="px-1">
          <p className="text-xs text-gray-500 mb-2">{formatDatetimeWithTimeFirst(createdAt)}</p>
          <h3
            className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2 line-clamp-2"
            style={{
              lineHeight: '1.4em',
              height: '2.8em',
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm text-gray-600 mb-4 line-clamp-3"
            style={{
              lineHeight: '1.5em',
              height: '4.5em',
            }}
          >
            {introduction}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-xs font-medium text-gray-700">{rating.toFixed(1)}</span>
              <span className="text-gray-400">({rateCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <EyeOutlined className="text-xl text-blue-500"/>
                <span className="text-xl text-gray-600">{view}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageOutlined className="text-xl text-green-500"/>
                <span className="text-xl text-gray-600">{commentCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOutlined className="text-xl text-purple-500"/>
                <span className="text-xl text-gray-600">{saveCount}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default VerticalCard
