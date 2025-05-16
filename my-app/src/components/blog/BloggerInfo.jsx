import { Avatar, Button, Image } from 'antd'

import { PlusOutlined, UserDeleteOutlined } from '@ant-design/icons'

export const BloggerInfo = ({ name, avatarUrl, date, onFollow, hasFollow, setHasFollow }) => {
  return (
    <div className="flex items-center my-5 justify-between border border-gray-200 shadow-md rounded-2xl p-4 w-[600px]">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4">
        <Avatar
          src={avatarUrl}
          alt={name}
          style={{
            width: '80px',
            height: '80px',
          }}
        />
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-[#333] font-[Quicksand] flex items-center gap-1">
            <span className="font-bold">{name}</span>
          </div>

          {/* Nút Theo dõi / Hủy theo dõi */}
          <Button
            onClick={onFollow}
            icon={hasFollow ? <UserDeleteOutlined/> : <PlusOutlined/>}
            type={hasFollow ? 'default' : 'primary'}
            danger={hasFollow}
            className="!mt-2 !rounded-full px-4 !font-bold font-[Quicksand]"
          >
            {hasFollow ? 'Hủy theo dõi' : 'Theo dõi'}
          </Button>
        </div>

        <div className="italic mt-11 font-medium h-full">{date}</div>
      </div>
    </div>
  )
}

