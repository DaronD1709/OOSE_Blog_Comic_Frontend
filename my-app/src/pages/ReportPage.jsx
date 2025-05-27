import React from 'react';
import { Card, Divider, Typography, Avatar, Space } from 'antd';
import { UserOutlined, CommentOutlined, BookOutlined } from '@ant-design/icons';
import ReportButton from '../components/Report/ReportButton';
import ReportModal from '../components/Report/ReportModal';
import { ReportProvider } from '../context/ReportContext';

const { Title, Paragraph, Text } = Typography;

// Mock dữ liệu cho các bài viết và bình luận
const mockBlog = {
  id: 123,
  title: 'One Piece - Hành trình đến Laugh Tale',
  author: 'Nguyễn Văn A',
  content: 'One Piece là một series manga và anime nổi tiếng kể về cuộc phiêu lưu của Monkey D. Luffy và băng hải tặc Mũ Rơm trong hành trình tìm kiếm kho báu vĩ đại One Piece và trở thành Vua Hải Tặc.',
  date: '15/06/2023'
};

const mockComments = [
  {
    id: 456,
    author: 'Trần Thị B',
    content: 'Đây là một bộ manga rất hay, tôi đã theo dõi từ những chương đầu tiên!',
    date: '16/06/2023'
  },
  {
    id: 789,
    author: 'Lê Văn C',
    content: 'Oda sensei thật sự là một thiên tài! Mỗi chi tiết trong truyện đều có ý nghĩa.',
    date: '17/06/2023'
  }
];

function ReportPage() {
  return (
    <ReportProvider>
      <div className="p-4 min-h-screen bg-gray-100">
        <Title level={2} className="text-center mb-6">Trang Demo Báo Cáo Nội Dung</Title>
        
        <Card className="mb-6 shadow-md" bordered={false}>
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar icon={<UserOutlined />} />
              <Text strong>{mockBlog.author}</Text>
              <Text type="secondary" className="text-sm">{mockBlog.date}</Text>
            </div>
            <ReportButton targetType="blog" targetId={mockBlog.id} />
          </div>
          
          <Title level={4}>{mockBlog.title}</Title>
          <Paragraph>{mockBlog.content}</Paragraph>
          
          <Space>
            <BookOutlined />
            <Text>Thể loại: Phiêu lưu, Hành động</Text>
          </Space>
        </Card>

        <Divider>Bình luận</Divider>
        
        <div className="space-y-4">
          {mockComments.map(comment => (
            <Card key={comment.id} className="bg-white shadow" size="small">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar size="small" icon={<UserOutlined />} />
                  <Text strong>{comment.author}</Text>
                  <Text type="secondary" className="text-xs">{comment.date}</Text>
                </div>
                <ReportButton targetType="comment" targetId={comment.id} />
              </div>
              
              <Paragraph className="ml-8">{comment.content}</Paragraph>
            </Card>
          ))}
        </div>

        <Divider orientation="center">
          <Text type="secondary">Bạn có thể báo cáo bài viết hoặc bình luận vi phạm bằng cách nhấp vào nút báo cáo</Text>
        </Divider>

        <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <Title level={5} className="flex items-center gap-2">
            <CommentOutlined className="text-blue-500" />
            Hướng dẫn sử dụng chức năng báo cáo
          </Title>
          <ul className="list-disc ml-5 space-y-2">
            <li>Nhấp vào nút <span className="text-yellow-400 font-medium">"Báo cáo"</span> ở bài viết hoặc bình luận</li>
            <li>Chọn lý do báo cáo từ danh sách</li>
            <li>Nếu chọn "Khác", hãy mô tả chi tiết lý do</li>
            <li>Nhấp vào nút "Xác nhận" để gửi báo cáo</li>
          </ul>
        </div>
        
        <ReportModal />
      </div>
    </ReportProvider>
  );
}

export default ReportPage;
