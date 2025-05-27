// Mock API cho comment (dùng cho phát triển frontend)
// Dữ liệu mẫu dạng cây, mỗi comment có thể có children

let mockComments = [
  {
    id: 1,
    blogId: 100,
    user: 'Nguyễn Văn A',
    content: 'Bài viết rất hay!',
    createdAt: '2024-06-01T10:00:00Z',
    parentId: null,
    children: [
      {
        id: 2,
        blogId: 100,
        user: 'Trần Thị B',
        content: 'Đồng ý với bạn!',
        createdAt: '2024-06-01T10:05:00Z',
        parentId: 1,
        children: []
      }
    ]
  },
  {
    id: 3,
    blogId: 100,
    user: 'Lê Văn C',
    content: 'Có ai biết tác giả là ai không?',
    createdAt: '2024-06-01T11:00:00Z',
    parentId: null,
    children: []
  }
];

let nextId = 4;

export function getCommentsByBlogId(blogId) {
  // Lấy comment cha (parentId=null) của blog
  return Promise.resolve(
    mockComments.filter(c => c.blogId === blogId && c.parentId === null)
  );
}

export function getChildComments(commentId) {
  // Lấy children của comment
  function findCommentById(list, id) {
    for (const c of list) {
      if (c.id === id) return c;
      if (c.children && c.children.length) {
        const found = findCommentById(c.children, id);
        if (found) return found;
      }
    }
    return null;
  }
  const comment = findCommentById(mockComments, commentId);
  return Promise.resolve(comment ? comment.children : []);
}

export function createComment({ blogId, content, parentId, user }) {
  const newComment = {
    id: nextId++,
    blogId,
    user: user || 'Ẩn danh',
    content,
    createdAt: new Date().toISOString(),
    parentId: parentId || null,
    children: []
  };
  if (parentId) {
    // Thêm vào children của parent
    function addToParent(list) {
      for (const c of list) {
        if (c.id === parentId) {
          c.children.push(newComment);
          return true;
        }
        if (c.children && c.children.length) {
          if (addToParent(c.children)) return true;
        }
      }
      return false;
    }
    addToParent(mockComments);
  } else {
    mockComments.push(newComment);
  }
  return Promise.resolve(newComment);
}

export function updateComment(commentId, content) {
  function update(list) {
    for (const c of list) {
      if (c.id === commentId) {
        c.content = content;
        return c;
      }
      if (c.children && c.children.length) {
        const found = update(c.children);
        if (found) return found;
      }
    }
    return null;
  }
  const updated = update(mockComments);
  return Promise.resolve(updated);
}

export function deleteComment(commentId) {
  function remove(list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === commentId) {
        list.splice(i, 1);
        return true;
      }
      if (list[i].children && list[i].children.length) {
        if (remove(list[i].children)) return true;
      }
    }
    return false;
  }
  remove(mockComments);
  return Promise.resolve(true);
} 