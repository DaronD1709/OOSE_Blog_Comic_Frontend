import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import {
  saveRateAPI,
  getUserRateAPI,
  updateRateAPI,
  getBlogRatingAPI,
  getBlogCountRatingAPI
} from '../services/rateService'
import RatingStars from 'react-rating'
import { StarFilled, StarOutlined } from '@ant-design/icons'

const Rating = ({
  initialRating = 0,
  ratingCount = 0,
  onRate,
  user,
  blogId,
  size = 'default',
  showCount = true,
  interactive = true,
}) => {
  const [rating, setRating] = useState(null)
  const [isRated, setIsRated] = useState(null)
  const [rateCount, setRateCount] = useState(ratingCount)
  const [isLoading, setIsLoading] = useState(false)
  const [totalRating, setTotalRating] = useState(initialRating)

  useEffect(() => {
    if (user && blogId) {
      checkUserRate()
    }
  }, [initialRating, user, blogId])

  const checkUserRate = async () => {
    try {
      const res = await getUserRateAPI(user.id, blogId)
      if (res) {
        setIsRated(res.id)
        setRating(res.rateStar)
      }
    } catch (err) {
      console.error('Error checking user rate:', err)
    }
  }

  const handleRate = async (value) => {
    if (!interactive) return

    if (!user) {
      message.error('Bạn chưa đăng nhập')
      return
    }

    setIsLoading(true)
    try {
      let response
      if (isRated) {
        response = await updateRateAPI({
          id: isRated,
          rateStar: value
        })
      } else {
        response = await saveRateAPI({
          userId: user.id,
          blogId: blogId,
          rate: value,
        })
      }
      if (response) {
        setIsRated(response.id)
        setRating(value)
        onRate?.(value)

        const res = await getBlogRatingAPI({ blogId: blogId })
        setTotalRating(res)
        const newCount = await getBlogCountRatingAPI({ blogId: blogId })
        setRateCount(newCount)

        message.success('Đánh giá thành công!')
      } else {
        message.error('Không thể đánh giá. Vui lòng thử lại sau.')
      }
    } catch (err) {
      console.error('Error rating:', err)
      if (err.response?.status === 400) {
        message.error('Bạn đã đánh giá bài viết này rồi')
      } else if (err.response?.status === 401) {
        message.error('Bạn cần đăng nhập để đánh giá')
      } else {
        message.error('Không thể đánh giá. Vui lòng thử lại sau.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getStarSize = () => {
    switch (size) {
      case 'small':
        return '24px'
      case 'large':
        return '40px'
      default:
        return '32px'
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <RatingStars
          initialRating={rating }
          readonly={!interactive || isLoading}
          fractions={2}
          onClick={handleRate}
          emptySymbol={
            <StarOutlined
              style={{
                fontSize: getStarSize(),
                color: '#d1d5db' // gray-300
              }}
            />
          }
          fullSymbol={
            <StarFilled
              style={{
                fontSize: getStarSize(),
                color: '#fbbf24', // yellow-400
                filter: 'drop-shadow(0 0 3px rgba(234, 179, 8, 0.6))'
              }}
            />
          }
        />
      </div>
      {showCount && (
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-800">
            {totalRating}
          </span>
          <span className="text-sm text-gray-500">
            ({rateCount} đánh giá)
          </span>
        </div>
      )}
    </div>
  )
}

export default Rating
