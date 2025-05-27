import React, { useState, useEffect } from 'react';
import { Typography, Card, Table, Button, Input, Select, Modal, Tag, Space, message } from 'antd';
import { DeleteOutlined, SearchOutlined, FilterOutlined, EyeOutlined, ExclamationCircleOutlined, StopOutlined } from '@ant-design/icons';
import { CommentProvider } from '../context/CommentContext';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { confirm } = Modal;

// Mock dữ liệu bình luận
const mockComments = [
  {
    id: '101',
    blogId: '1',
    blogTitle: 'One Piece - Hành trình đến Laugh Tale',
    user: 'Nguyễn Văn X',
    userId: 'user-101',
    role: 'user',
    content: 'Đây là một bộ manga rất hay, tôi đã theo dõi từ những chương đầu tiên!',
    createdAt: '2023-06-16T08:30:00Z',
    status: 'approved'
  },
  {
    id: '102',
    blogId: '1',
    blogTitle: 'One Piece - Hành trình đến Laugh Tale',
    user: 'Lê Văn Z',
    userId: 'user-102',
    role: 'user',
    content: 'Oda sensei thật sự là một thiên tài! Mỗi chi tiết trong truyện đều có ý nghĩa.',
    createdAt: '2023-06-17T10:20:00Z',
    status: 'approved'
  },
  {
    id: '103',
    blogId: '2',
    blogTitle: 'Doraemon - Những bảo bối thay đổi cuộc sống',
    user: 'Phạm Thị K',
    userId: 'user-103',
    role: 'user',
    content: 'Doraemon là một phần tuổi thơ của tôi, những bảo bối thú vị và ý nghĩa.',
    createdAt: '2023-07-21T14:05:00Z',
    status: 'reported',
    reportReason: 'Nội dung phản cảm'
  },
  {
    id: '104',
    blogId: '3', 
    blogTitle: 'Dragon Ball - Hành trình của Son Goku',
    user: 'Trần Văn M',
    userId: 'user-104',
    role: 'user',
    content: 'Dragon Ball là một serie hay nhất mọi thời đại! Super Saiyan quá tuyệt vời!',
    createdAt: '2023-08-11T09:15:00Z',
    status: 'approved'
  },
  {
    id: '105',
    blogId: '4',
    blogTitle: 'Naruto - Con đường trở thành Hokage',
    user: 'Hoàng Thị N',
    userId: 'user-105',
    role: 'user',
    content: 'Naruto đã dạy tôi rất nhiều bài học về tình bạn và sự kiên trì.',
    createdAt: '2023-09-06T11:45:00Z',
    status: 'blocked',
    blockReason: 'Spam'
  }
];

function CommentAdminPage() {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState('admin'); // Mặc định là admin, có thể lấy từ context/API

  // Load dữ liệu
  useEffect(() => {
    setLoading(true);
    // Mô phỏng API call
    setTimeout(() => {
      setComments(mockComments);
      setFilteredComments(mockComments);
      setLoading(false);
    }, 500);
  }, []);

  // Áp dụng bộ lọc
  useEffect(() => {
    let result = [...comments];
    
    // Lọc theo text tìm kiếm
    if (searchText) {
      result = result.filter(comment => 
        comment.content.toLowerCase().includes(searchText.toLowerCase()) || 
        comment.user.toLowerCase().includes(searchText.toLowerCase()) ||
        comment.blogTitle.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Lọc theo trạng thái
    if (statusFilter !== 'all') {
      result = result.filter(comment => comment.status === statusFilter);
    }
    
    // Nếu là blogger, chỉ hiển thị comment trên blog của họ
    if (currentUserRole === 'blogger') {
      result = result.filter(comment => comment.blogOwnerId === 'current-user-id');
    }
    
    setFilteredComments(result);
  }, [searchText, statusFilter, comments, currentUserRole]);

  // Xem chi tiết comment
  const handleViewComment = (comment) => {
    setSelectedComment(comment);
    setViewModalVisible(true);
  };

  // Xóa comment
  const handleDeleteComment = (commentId) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa bình luận này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        // Mô phỏng API call
        setLoading(true);
        setTimeout(() => {
          setComments(comments.filter(comment => comment.id !== commentId));
          message.success('Đã xóa bình luận thành công');
          setLoading(false);
        }, 500);
      }
    });
  };

  // Ẩn bình luận
  const handleBlockComment = (commentId) => {
    confirm({
      title: 'Bạn có muốn ẩn bình luận này?',
      icon: <StopOutlined />,
      content: 'Bình luận sẽ bị ẩn khỏi hiển thị công khai.',
      okText: 'Ẩn',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setLoading(true);
        // Mô phỏng API call
        setTimeout(() => {
          setComments(comments.map(comment => 
            comment.id === commentId ? { ...comment, status: 'blocked', blockReason: 'Vi phạm nội quy' } : comment
          ));
          message.success('Đã ẩn bình luận');
          setLoading(false);
        }, 500);
      }
    });
  };

  // Khôi phục bình luận bị ẩn
  const handleRestoreComment = (commentId) => {
    setLoading(true);
    // Mô phỏng API call
    setTimeout(() => {
      setComments(comments.map(comment => 
        comment.id === commentId ? { ...comment, status: 'approved' } : comment
      ));
      message.success('Đã khôi phục bình luận');
      setLoading(false);
    }, 500);
  };

  // Định nghĩa cột cho bảng
  const columns = [
    {
      title: 'Người bình luận',
      dataIndex: 'user',
      key: 'user',
      render: (text, record) => (
        <div>
          <span className="font-semibold">{text}</span>
          <br />
          <Text type="secondary" className="text-xs">{new Date(record.createdAt).toLocaleString('vi-VN')}</Text>
        </div>
      ),
    },
    {
      title: 'Bài viết',
      dataIndex: 'blogTitle',
      key: 'blogTitle',
      ellipsis: true,
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      render: text => <Paragraph ellipsis={{ rows: 2 }}>{text}</Paragraph>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color;
        let text;
        switch (status) {
          case 'approved':
            color = 'green';
            text = 'Đã duyệt';
            break;
          case 'blocked':
            color = 'red';
            text = 'Đã ẩn';
            break;
          case 'reported':
            color = 'volcano';
            text = 'Bị báo cáo';
            break;
          default:
            color = 'default';
            text = status;
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => handleViewComment(record)} 
            size="small"
          />
          {record.status === 'reported' || record.status === 'approved' ? (
            <Button 
              icon={<StopOutlined />} 
              danger 
              size="small" 
              onClick={() => handleBlockComment(record.id)}
            >
              Ẩn
            </Button>
          ) : record.status === 'blocked' ? (
            <Button 
              type="primary" 
              size="small" 
              onClick={() => handleRestoreComment(record.id)}
            >
              Khôi phục
            </Button>
          ) : null}
          <Button 
            icon={<DeleteOutlined />} 
            danger 
            onClick={() => handleDeleteComment(record.id)} 
            size="small"
          />
        </Space>
      ),
    },
  ];

  return (
    <CommentProvider blogId="" currentUserRole={currentUserRole}>
      <div className="p-4">
        <Title level={2}>Quản lý bình luận</Title>
        <Paragraph>
          Trang này cho phép {currentUserRole === 'admin' ? 'quản trị viên' : 'tác giả'} quản lý các bình luận trên hệ thống.
          Bình luận mới sẽ tự động được hiển thị và quản trị viên có thể ẩn hoặc xóa bình luận vi phạm.
        </Paragraph>

        <Card className="mb-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Tìm kiếm bình luận..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                allowClear
              />
            </div>
            <div>
              <Select
                placeholder="Lọc theo trạng thái"
                style={{ width: 150 }}
                value={statusFilter}
                onChange={value => setStatusFilter(value)}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">Tất cả</Option>
                <Option value="approved">Đang hiển thị</Option>
                <Option value="blocked">Đã ẩn</Option>
                <Option value="reported">Bị báo cáo</Option>
              </Select>
            </div>
            {/* Simulating switching roles for demo */}
            <div>
              <Select
                placeholder="Vai trò"
                style={{ width: 150 }}
                value={currentUserRole}
                onChange={value => setCurrentUserRole(value)}
              >
                <Option value="admin">Quản trị viên</Option>
                <Option value="blogger">Tác giả</Option>
              </Select>
            </div>
          </div>
        </Card>

        <Table
          dataSource={filteredComments}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />

        {/* Modal xem chi tiết bình luận */}
        <Modal
          title="Chi tiết bình luận"
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={[
            <Button key="back" onClick={() => setViewModalVisible(false)}>
              Đóng
            </Button>
          ]}
        >
          {selectedComment && (
            <div>
              <div className="mb-3">
                <Text strong>Người bình luận:</Text> {selectedComment.user}
                <Tag color="blue" className="ml-2">{selectedComment.role}</Tag>
              </div>
              <div className="mb-3">
                <Text strong>Bài viết:</Text> {selectedComment.blogTitle}
              </div>
              <div className="mb-3">
                <Text strong>Thời gian:</Text> {new Date(selectedComment.createdAt).toLocaleString('vi-VN')}
              </div>
              <div className="mb-3">
                <Text strong>Trạng thái:</Text> 
                <Tag 
                  color={
                    selectedComment.status === 'approved' ? 'green' : 
                    selectedComment.status === 'blocked' ? 'red' : 
                    selectedComment.status === 'reported' ? 'volcano' : 'default'
                  }
                  className="ml-2"
                >
                  {selectedComment.status === 'approved' ? 'Đang hiển thị' : 
                   selectedComment.status === 'blocked' ? 'Đã ẩn' : 
                   selectedComment.status === 'reported' ? 'Bị báo cáo' : selectedComment.status}
                </Tag>
              </div>
              {selectedComment.status === 'reported' && (
                <div className="mb-3">
                  <Text strong>Lý do báo cáo:</Text> {selectedComment.reportReason}
                </div>
              )}
              {selectedComment.status === 'blocked' && (
                <div className="mb-3">
                  <Text strong>Lý do ẩn:</Text> {selectedComment.blockReason}
                </div>
              )}
              <div className="mb-3">
                <Text strong>Nội dung:</Text>
                <div className="mt-2 p-3 bg-gray-50 rounded border">
                  {selectedComment.content}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </CommentProvider>
  );
}

export default CommentAdminPage; 