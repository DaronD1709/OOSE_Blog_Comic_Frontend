import { useState } from 'react'
import { Button, Input, message } from 'antd'

function CommentBox ({
  closeBox, comments, setComments, onSubmit, userId, parentId = null, blogId, placeholder = 'Nhập bình luận của bạn...',
  currentUserRole = 'user'
}) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  function insertReply (comments, parentId, newComment) {
    return comments.map(comment => {
      if (comment.id === parentId) {
        const updatedChildren = [...(comment.children || []), newComment]
        return { ...comment, children: updatedChildren, hasChildComment: true }
      } else if (comment.children && comment.children.length > 0) {
        return {
          ...comment,
          children: insertReply(comment.children, parentId, newComment)
        }
      } else {
        return comment
      }
    })
  }

  const handleSend = async () => {
    if (!content.trim()) return
    if (userId === null) {
      message.error('Bạn chưa đăng nhập')
      return

    }
    setLoading(true)
    const res = await onSubmit({
      blogId,
      content,
      parentId,
      userId,
      userRole: currentUserRole
    })
    if (parentId) {
      const updated = insertReply(comments, parentId, res)
      setComments(updated)
      closeBox()
    } else {
      // Comment gốc
      setComments([...comments, res])
    }

    setContent('')
    setLoading(false)
  }

  return (
    <div className="space-y-2 ">
      <Input.TextArea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
      />
      <div className="flex justify-end mt-2 relative">
        <Button
          type="primary"
          onClick={handleSend}
          disabled={!content.trim()}
          loading={loading}
        >
          Gửi bình luận
        </Button>
        {currentUserRole !== 'user' && currentUserRole !== 'anonymous' && (
          <span className="absolute left-0 bottom-0 text-xs text-gray-400 ml-1 mb-1">
            Bạn đang bình luận với tư cách {
            currentUserRole === 'admin' ? 'Quản trị viên' :
              currentUserRole === 'blogger' ? 'Tác giả' : currentUserRole
          }
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentBox