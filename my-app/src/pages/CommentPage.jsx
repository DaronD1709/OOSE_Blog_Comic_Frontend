import { useState, useEffect } from 'react';
import { Typography, Card, Divider, Tabs, Empty, Spin } from 'antd';
import { CommentProvider } from '../context/CommentContext';
import CommentBox from '../components/Comment/CommentBox';
import CommentList from '../components/Comment/CommentList';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock dữ liệu bài viết
const mockBlogs = [
  {
    id: '1',
    title: 'One Piece - Hành trình đến Laugh Tale',
    content: 'One Piece là một series manga và anime nổi tiếng kể về cuộc phiêu lưu của Monkey D. Luffy và băng hải tặc Mũ Rơm trong hành trình tìm kiếm kho báu vĩ đại One Piece và trở thành Vua Hải Tặc.',
    author: 'Nguyễn Văn A',
    createdAt: '2023-06-15'
  },
  {
    id: '2',
    title: 'Doraemon - Những bảo bối thay đổi cuộc sống',
    content: 'Doraemon là một chú mèo máy đến từ tương lai với nhiều bảo bối thần kỳ, giúp đỡ cậu bé Nobita vượt qua những khó khăn trong cuộc sống hàng ngày.',
    author: 'Trần Thị B',
    createdAt: '2023-07-20'
  }
];

// Mock dữ liệu bình luận

function CommentPage() {
  const [selectedBlog, setSelectedBlog] = useState(mockBlogs[0]);
  const [userRole, setUserRole] = useState('user'); // Thêm state chọn vai trò

  // Hàm xử lý khi thêm bình luận mới
  const handleAddComment = async (commentData) => {
    setLoading(true);
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Đã thêm bình luận mới:', commentData);
    setLoading(false);
    // Trong ứng dụng thực tế, bạn sẽ gọi API ở đây
  };

  return (
    <div className="p-4">
      <Title level={2}>Hệ thống Bình luận</Title>
      <Paragraph>
        Trang này hiển thị hệ thống bình luận cho các bài viết trên blog. Người dùng có thể bình luận, trả lời, chỉnh sửa và xóa bình luận của họ.
      </Paragraph>

      {/* Chọn vai trò người dùng để test */}
      <div className="mb-4">
        <span className="mr-2 font-medium">Chọn vai trò:</span>
        <select
          value={userRole}
          onChange={e => setUserRole(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="user">Người dùng</option>
          <option value="blogger">Blogger</option>
          <option value="admin">Admin</option>
        </select>
        <span className="ml-4 text-gray-500">(Bình luận sẽ hiển thị đúng vai trò bạn chọn)</span>
      </div>

      <Tabs defaultActiveKey="1" onChange={key => setSelectedBlog(mockBlogs.find(blog => blog.id === key))}>
        {mockBlogs.map(blog => (
          <TabPane tab={blog.title} key={blog.id}>
            <Card className="mb-4 ">
              <Title level={4}>{blog.title}</Title>
              <p className="text-gray-500">Tác giả: {blog.author} • {new Date(blog.createdAt).toLocaleDateString('vi-VN')}</p>
              <Paragraph>{blog.content}</Paragraph>
            </Card>


          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default CommentPage;