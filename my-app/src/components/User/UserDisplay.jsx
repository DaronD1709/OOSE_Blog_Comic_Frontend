import { Card, Descriptions, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

function UserDisplay({ userData }) {
  const { displayName, email, username, role } = userData;

  return (
    <div className="w-full">
      <Card 
        title="Thông tin cá nhân" 
        className="shadow-sm rounded-lg"
        bodyStyle={{ padding: '24px' }}
      >
        <Descriptions column={1} className="bg-white p-4 rounded-md">
          <Descriptions.Item label="Tên hiển thị" labelStyle={{ fontWeight: 'bold' }}>
            <div className="flex items-center">
              <UserOutlined className="mr-3 text-blue-500" />
              <span className="text-gray-800">{displayName}</span>
            </div>
          </Descriptions.Item>
          
          <Descriptions.Item label="Email" labelStyle={{ fontWeight: 'bold' }}>
            <div className="flex items-center">
              <MailOutlined className="mr-3 text-blue-500" />
              <span className="text-gray-800">{email}</span>
            </div>
          </Descriptions.Item>
          
          <Descriptions.Item label="Tên người dùng" labelStyle={{ fontWeight: 'bold' }}>
            <span className="text-gray-800">{username}</span>
          </Descriptions.Item>
          
          <Descriptions.Item label="Vai trò" labelStyle={{ fontWeight: 'bold' }}>
            <Tag color={role === 'admin' ? 'red' : role === 'blogger' ? 'blue' : 'green'} className="px-3 py-1">
              {role === 'admin' ? 'Quản trị viên' : role === 'blogger' ? 'Blogger' : 'Người dùng'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default UserDisplay;