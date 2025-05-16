import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/api.js'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'
import { formatDatetimeWithTimeFirst } from '../../services/helperService.js'
import { Image, message } from 'antd'
import { getCommentCountOfBlogAPI } from '../../services/commentService.js'
import { getFavouriteCountBlogAPI } from '../../services/favoriteService.js'
import { getThumbnail, getUserAvatar } from '../../constants/utility.js'
import mythAvatar from '/src/assets/images/anonymous.png'
import { validate } from '../../utils/validate.js'

/**
 * props:
 * {
 *   image: string,
 *   title: string,
 *   description: string,
 *   authorName: string,
 *   authorAvatar: string,
 *   date: string,
 *   rate: number,
 *   rateCount: number,
 *   commentCount: number,
 *   saveCount: number,
 *   viewCount: number
 * }
 */
const HorizontalCard = ({
  id,
  thumbnail,
  title,
  introduction,
  author,
  createdAt,
  rating,
  rateCount,
  view,
  type
}) => {
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
      <div
        className="flex w-[800px] border-b my-3 bg-white rounded-3xl shadow-sm border-gray-100  hover:shadow-xl transition-all duration-300 p-5 gap-6 group">
        {/* thumbnail */}
        <div className="relative w-65 h-48 flex-shrink-0">
          <Image
            src={`${getThumbnail(thumbnail)}`}
            alt={title}
            className="!object-cover !w-65 !h-48 !rounded-lg !flex-shrink-0"
          />
        </div>

        {/* right column */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          {/* title and description */}
          <div className="space-y-3">
            <h2
              className="text-xl font-bold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{introduction}</p>
          </div>

          {/* bottom row with stats and author info */}
          <div className="flex items-center gap-5 text-sm mt-4">
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-full">
              <span className="text-yellow-500">★</span>
              <span className="font-medium text-gray-700">{rating}</span>
              <span className="text-gray-400">({rateCount})</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-full">
              <span className="text-blue-500">💬</span>
              <span className="font-medium text-gray-700">{commentCount}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full">
              <span className="text-green-500">🔖</span>
              <span className="font-medium text-gray-700">{saveCount}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 px-2.5 py-1 rounded-full">
              <span className="text-purple-500">👁️</span>
              <span className="font-medium text-gray-700">{view}</span>
            </div>
          </div>

          {/* author & date */}
          <div className="flex items-center gap-3 text-sm mt-4">
            <div className="flex items-center gap-2">
              <img
                src={getUserAvatar(author.avatar)}
                alt={validate(author) ? author.avatar : 'Anonymous img'}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium text-gray-600 truncate max-w-[120px]">
                {validate(author) ? author.displayName : 'Đã xóa'}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{formatDatetimeWithTimeFirst(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HorizontalCard
