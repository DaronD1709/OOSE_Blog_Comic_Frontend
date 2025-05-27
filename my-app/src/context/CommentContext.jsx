import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  getCommentsByBlogId,
  getChildComments,
  createComment,
  deleteComment
} from '../api/commentApi';

const CommentContext = createContext();

export function useComment() {
  return useContext(CommentContext);
}

export function CommentProvider({ blogId, currentUserRole = 'user', blogOwnerId, children }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load parent comments
  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCommentsByBlogId(blogId);
      setComments(data);
    } catch (e) {
      setComments([]);
    }
    setLoading(false);
  }, [blogId]);

  // Thêm comment mới (parent hoặc reply)
  const handleAddComment = async (comment) => {
    // comment: { blogId, content, parentId }
    await createComment(comment);
    await fetchComments(); // reload lại danh sách
  };

  // Xóa comment
  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    await fetchComments();
  };

  // Lấy children của 1 comment (nếu cần lazy load)
  const handleGetChildComments = async (commentId) => {
    return await getChildComments(commentId);
  };

  // Kiểm tra xem người dùng hiện tại có quyền quản lý comment hay không
  const canManageComments = useCallback(() => {
    return currentUserRole === 'admin' || 
           (currentUserRole === 'blogger' && blogOwnerId === 'current-user-id');
  }, [currentUserRole, blogOwnerId]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        fetchComments,
        handleAddComment,
        handleDeleteComment,
        handleGetChildComments,
        currentUserRole,
        canManageComments
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

// Thêm export cho CommentContext để dùng trong class component
export { CommentContext };