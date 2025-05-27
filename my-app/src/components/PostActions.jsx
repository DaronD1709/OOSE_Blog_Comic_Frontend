import React, { useState } from 'react'
import { message } from 'antd'

// Dùng ở component cha như sau :
{
  /* <PostActions
likes={pagedReviews[0]?.rateCount || 0}
comments={pagedReviews[0]?.commentCount || 0}
saves={pagedReviews[0]?.saveCount || 0}
isSaved={false}
onLike={(newLikes) => console.log("Likes updated:", newLikes)}
onComment={() => console.log("Comment clicked")}
onSave={(isSaved) => console.log("Save status:", isSaved)}
onShare={() => console.log("Share clicked")}
/> */
}

const PostActions = ({
  likes: initialLikes,
  comments: initialComments,
  saves: initialSaves,
  isSaved: initialSaved,
  onLike,
  onComment,
  onSave,
  onShare,
  user
}) => {
  const [likes, setLikes] = useState(initialLikes)
  const [comments, setComments] = useState(initialComments)
  const [saves, setSaves] = useState(initialSaves)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(initialSaved)

  const handleLike = () => {
    if (user === null) {
      message.error("Bạn chưa đăng nhập")
      return
    }
    setIsLiked(!isLiked)
    const newLikes = isLiked ? likes - 1 : likes + 1
    setLikes(newLikes)
    onLike?.(newLikes)
  }

  const handleComment = () => {
    onComment?.()
  }

  const handleSave = () => {
    if (user === null) {
      message.error("Bạn chưa đăng nhập")
      return
    }
    setIsSaved(!isSaved)
    const newSaves = isSaved ? saves - 1 : saves + 1
    setSaves(newSaves)
    onSave?.(!isSaved)
  }

  const handleShare = () => {
    onShare?.()
  }

  return (
    <div className="w-[60px] sticky top-[64px] h-fit">
      <div className="flex flex-col items-center space-y-6 py-4 px-2 gap-4">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center space-y-1 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 ${
              isLiked ? 'text-red-500 fill-current' : 'text-gray-600'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="text-sm font-medium">{likes}</span>
        </button>

        {/* Comment Button */}
        <button
          onClick={handleComment}
          className="flex flex-col items-center space-y-1 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="text-sm font-medium">{comments}</span>
        </button>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="flex flex-col items-center space-y-1 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 ${
              isSaved ? 'text-yellow-500 fill-current' : 'text-gray-600'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <span className="text-sm font-medium">{saves}</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center space-y-1 p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PostActions
