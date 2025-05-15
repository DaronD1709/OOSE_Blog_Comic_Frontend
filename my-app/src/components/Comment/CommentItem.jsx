import React from 'react'
import { Button, Tooltip, Tag, Avatar } from 'antd'
import {
  MoreOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined
} from '@ant-design/icons'
import { CommentContext } from '../../context/CommentContext'
import CommentBox from './CommentBox'
import ReportButton from '../Report/ReportButton'
import { URL_BACKEND_IMAGES } from '../../constants/images.js'
import { addCommentToBlogAPI } from '../../services/commentService.js'
import { getUserAvatar } from '../../constants/utility.js'

class CommentItem extends React.Component {
  static contextType = CommentContext
  static defaultProps = {
    currentUserRole: 'anonymous',
    level: 0,
  }

  constructor (props) {
    super(props)
    this.state = {
      replying: false,
      menuOpen: false,
      showChildren: false, // Thêm state để điều khiển việc hiển thị children
      reaction: null, // 'like' | 'dislike' | null
    }
    this.menuRef = React.createRef()
    this.buttonRef = React.createRef()
  }

  handleAction = async (action) => {
    const { comment } = this.props
    const { handleDeleteComment } = this.context
    switch (action) {
      case 'reply':
        this.setState({ replying: true })
        break
      case 'cancel-reply':
        this.setState({ replying: false })
        break
      case 'delete':
        await handleDeleteComment(comment.id)
        break
      default:
        break
    }
  }

  getRoleTagColor = (role) => {
    switch (role) {
      case 'admin':
        return 'red'
      case 'blogger':
        return 'blue'
      case 'moderator':
        return 'purple'
      default:
        return 'default'
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.menuOpen && !prevState.menuOpen) {
      document.addEventListener('mousedown', this.handleClickOutside)
    } else if (!this.state.menuOpen && prevState.menuOpen) {
      document.removeEventListener('mousedown', this.handleClickOutside)
    }
  }

  handleClickOutside = (event) => {
    if (
      this.menuRef.current &&
      !this.menuRef.current.contains(event.target) &&
      this.buttonRef.current &&
      !this.buttonRef.current.contains(event.target)
    ) {
      this.setState({ menuOpen: false })
    }
  }

  render () {
    const { comment, blogId, currentUserRole, level, userId, comments, setComments } = this.props
    const { replying, menuOpen, showChildren } = this.state

    // Menu actions for three-dot icon
    const menuActions = []
    if (currentUserRole === 'admin' || currentUserRole === 'blogger') {
      menuActions.push({
        key: 'delete',
        icon: <DeleteOutlined className="text-red-500"/>, label: 'Xoá',
        onClick: () => this.handleAction('delete')
      })
      menuActions.push({
        key: 'hide',
        icon: <EyeInvisibleOutlined className="text-gray-500"/>, label: 'Ẩn',
        onClick: () => this.handleAction('hide')
      })
    } else {
      menuActions.push({
        key: 'report',
        icon:
          <ReportButton targetType={'comment'} targetId={comment.id}/>
      })
    }
    return (
      <div className="mb-4 flex gap-3 mx-2">
        {/* Avatar */}
        <div className="flex flex-col items-center pt-2">
          <Avatar className={'!w-[70px] !h-[70px]'}
                  src={`${getUserAvatar(comment.userCommentResponse.avatar)}`}/>
        </div>
        <div className="flex-1">
          {/* Box riêng cho mỗi comment */}
          <div className="rounded-xl bg-white px-4 pt-2 pb-3 shadow border border-gray-200 relative">
            <div className="flex items-center gap-2 min-h-[36px]">
              <span className="font-semibold leading-9">{comment.userCommentResponse.displayName}</span>
              {comment.role && comment.role !== 'user' && (
                <Tag color={this.getRoleTagColor(comment.role)}>
                  {comment.role === 'admin' ? 'Quản trị viên' :
                    comment.role === 'blogger' ? 'Tác giả' :
                      comment.role === 'moderator' ? 'Người kiểm duyệt' : comment.role}
                </Tag>
              )}
              <Tooltip title={comment.createdAt}>
                <span className="text-xs text-gray-400 leading-9">{new Date(comment.createdAt).toLocaleString(
                  'vi-VN')}</span>
              </Tooltip>
              {/* Three dot icon menu */}
              {
                currentUserRole !== 'anonymous' &&
                <div className="ml-auto relative">
                  <Button
                    size="small"
                    type="text"
                    icon={<MoreOutlined/>}
                    ref={this.buttonRef}
                    onClick={() => this.setState({ menuOpen: !menuOpen })}
                  />
                  {menuOpen && (
                    <div ref={this.menuRef}
                         className="absolute right-0 z-10 bg-white border rounded shadow-md mt-2 min-w-[120px]">
                      {menuActions.map(action => (
                        <div
                          key={action.key}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => {
                            this.setState({ menuOpen: false })
                          }}
                        >
                          {action.icon}
                          <span>{action.label}</span>
                        </div>
                      ))}

                    </div>
                  )}
                </div>

              }
            </div>
            <div className="my-1 text-base text-gray-800">
              <span>{comment.content}</span>
            </div>
            <div className="flex gap-2 mt-2 items-center">
              {/* Nút trả lời dạng image button */}
              <Button
                size="small"
                type="text"
                icon={<MessageOutlined style={{ fontSize: 18 }}/>}
                onClick={() => {
                  this.handleAction('reply')
                }}
                title="Trả lời"
                className="hover:text-blue-500"
              />
              {/* Nút Like */}
              <Button
                size="small"
                type="text"
                icon={<LikeOutlined
                  style={{ fontSize: 18, color: this.state.reaction === 'like' ? '#1677ff' : undefined }}/>}
                onClick={() => this.setState({ reaction: this.state.reaction === 'like' ? null : 'like' })}
                title="Thích"
                className={this.state.reaction === 'like' ? 'text-blue-500' : ''}
              />
              {/* Nút Dislike */}
              <Button
                size="small"
                type="text"
                icon={<DislikeOutlined
                  style={{ fontSize: 18, color: this.state.reaction === 'dislike' ? '#f5222d' : undefined }}/>}
                onClick={() => this.setState({ reaction: this.state.reaction === 'dislike' ? null : 'dislike' })}
                title="Không thích"
                className={this.state.reaction === 'dislike' ? 'text-red-500' : ''}
              />
            </div>
          </div>
          {/* Nếu có children, hiển thị preview ra ngoài box */}
          {comment.hasChildComment && !showChildren && (
            <div className="mt-2 pl-2">
              <span
                className="font-bold text-black cursor-pointer hover:underline flex items-center gap-1"
                onClick={() => this.setState({ showChildren: true })}
              >
                <ArrowDownOutlined className="mr-1"/>
                Hiển thị các câu trả lời
              </span>
            </div>
          )}
          {/* Nếu đang mở children, hiển thị nút thu gọn */}
          {comment.hasChildComment && showChildren && (
            <div className="mt-2 pl-2">
              <span
                className="font-bold text-black cursor-pointer hover:underline flex items-center gap-1"
                onClick={() => this.setState({ showChildren: false })}
              >
                <ArrowUpOutlined className="mr-1"/>
                Thu gọn các câu trả lời
              </span>
            </div>
          )}
          {/* Children - mỗi comment con là 1 box riêng, không nằm trong box cha */}
          {replying && (
            <div className="mt-2">
              <CommentBox
                closeBox={() => {this.setState({ replying: false })}}
                blogId={blogId}
                parentId={comment.id}
                currentUserRole={currentUserRole}
                userId={userId !== null ? userId : null}
                onSubmit={addCommentToBlogAPI}
                comments={comments}
                setComments={setComments}

                placeholder="Nhập phản hồi..."
              />
              <Button size="small" onClick={() => this.handleAction('cancel-reply')} className="mt-1">Huỷ</Button>
            </div>
          )}
          {comment.children && comment.children.length > 0 && showChildren && (
            <div className="mt-2 space-y-3">
              {comment.children.map(child => (
                <div key={child.id} className="pl-8">
                  <CommentItem
                    setComments={setComments}
                    comment={child}
                    blogId={blogId}
                    currentUserRole={currentUserRole}
                    level={level + 1}
                    userId={userId}
                    comments={comments}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CommentItem