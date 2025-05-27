import CommentItem from './CommentItem'
import { ReportProvider } from '../../context/ReportContext.jsx'
import ReportModal from '../Report/ReportModal.jsx'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context.jsx'

function CommentList ({ setComments, comments, blogId, currentUserRole = 'user' }) {
  const { user } = useContext(AuthContext)
  if (!comments || comments.length === 0) {
    return <div className="text-gray-500 italic">Chưa có bình luận nào.</div>
  }
  return (
    <div className="space-y-4 mx-4">
      {comments.map(comment => (
        <ReportProvider>
          <CommentItem
            setComments={setComments}
            key={comment.id}
            comment={comment}
            blogId={blogId}
            currentUserRole={currentUserRole}
            userId={user !== null ? user.id : null}
            comments={comments}
          />
          <ReportModal/>
        </ReportProvider>
      ))}
    </div>
  )
}

export default CommentList