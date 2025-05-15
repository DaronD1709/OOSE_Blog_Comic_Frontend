// ✅ File đã được style lại cho đẹp mắt, gọn gàng, dễ bảo trì
// 📁 File: ViewBlogComicPage.jsx

import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  getBlogByIdAPI,
  getBlogCharacterAPI,
  getBlogComicAPI,
  getBlogInsightByIdAPI,
} from '../services/blogService'
import {
  saveFavouriteBlogAPI,
  removeFavouriteBlogAPI,
  getFavouriteByUserAndBlogAPI,
  getFavouriteCountBlogAPI,
} from '../services/favoriteService'
import { getCommentCountOfBlogAPI } from '../services/commentService'
import { saveReactionToABlogAPI } from '../services/reactionService'
import { findFollowAPI, followBloggerAPI, unfollowBloggerAPI } from '../services/followService'

import { Button, Image, Layout, message } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'

import { AuthContext } from '../context/auth.context'
import { Comment } from '../components/Comment/Comment'
import { BloggerInfo } from '../components/blog/BloggerInfo'
import { SelectedElement } from '../components/blog/SelectedElement'
import { RelatedBlogCharacter } from '../components/character-related-blogs/RelatedBlogCharacter'
import PostActions from '../components/PostActions'

import { formatDatetimeWithTimeFirst } from '../services/helperService'
import { ROUTES } from '../constants/api'
import { URL_BACKEND_IMAGES } from '../constants/images'
import { customImageAlignStyles } from '../editor/editorCustomStyleConstant'
import { getUserAvatar } from '../constants/utility.js'

export const ViewBlogComicPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [blog, setBlog] = useState(null)
  const [blogComic, setBlogComic] = useState(null)
  const [blogCharacter, setBlogCharacter] = useState(null)

  const [commentCount, setCommentCount] = useState(0)
  const [saveCount, setSaveCount] = useState(0)
  const [favouriteId, setFavouriteId] = useState(null)
  const [hasFollow, setHasFollow] = useState(false)

  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (id) {
      fetchBlog(id)
      fetchCommentCount(id)
      fetchSaveCount(id)
    }
  }, [id])

  useEffect(() => {
    if (user && id) {
      getFavouriteByUserAndBlogAPI(user.id, id)
        .then((res) => res?.id && setFavouriteId(res.id))
        .catch(() => setFavouriteId(null))
    }
  }, [user, id])

  useEffect(() => {
    if (user && blog?.author?.userId) {
      checkFollow()
    }
  }, [user, blog])

  const checkFollow = async () => {
    try {
      await findFollowAPI({ userId: user.id, bloggerId: blog.author.userId })
      setHasFollow(true)
    } catch {
      setHasFollow(false)
    }
  }

  const fetchCommentCount = async (id) => {
    try {
      const res = await getCommentCountOfBlogAPI(id)
      setCommentCount(res)
    } catch {
      message.error('Không thể lấy số lượng bình luận')
    }
  }

  const fetchSaveCount = async (id) => {
    try {
      const res = await getFavouriteCountBlogAPI(id)
      setSaveCount(res)
    } catch {
      message.error('Không thể lấy số lượt lưu bài')
    }
  }

  const fetchBlog = async (id) => {
    try {
      const res = await getBlogByIdAPI(id)
      if (res.type === 'CHARACTER') return navigate(ROUTES.getViewCharacter(id))

      let fullBlog = res
      if (res.type === 'COMIC') fullBlog = await getBlogComicAPI(id)
      if (res.type === 'INSIGHT') {
        fullBlog = await getBlogInsightByIdAPI(id)
        if (fullBlog.comicId) setBlogComic(await getBlogComicAPI(fullBlog.comicId))
        if (fullBlog.blogCharacterId) setBlogCharacter(await getBlogCharacterAPI(fullBlog.blogCharacterId))
      }

      setBlog(fullBlog)
    } catch {
      message.error('Không thể tải blog')
    }
  }

  const handleReaction = async () => {
    if (!user) return message.error('Bạn chưa đăng nhập')
    try {
      await saveReactionToABlogAPI({ userId: user.id, blogId: blog.id, type: 'Blog', reaction: 'LOVE' })
    } catch {
      message.error('Không thể thích bài viết')
    }
  }

  const handleSave = async (willBeSaved) => {
    if (!user) return message.error('Bạn cần đăng nhập để lưu bài viết')
    try {
      if (willBeSaved) {
        const res = await saveFavouriteBlogAPI(user.id, blog.id)
        setFavouriteId(res.id)
        message.success('Đã lưu bài viết')
      } else {
        await removeFavouriteBlogAPI(favouriteId)
        setFavouriteId(null)
        message.success('Đã bỏ lưu bài viết')
      }
    } catch {
      message.error('Lỗi khi lưu/bỏ lưu bài viết')
    }
  }

  const handleFollow = async () => {
    if (!user) return message.error('Bạn chưa đăng nhập')
    try {
      if (hasFollow) {
        await unfollowBloggerAPI({ userId: user.id, bloggerId: blog.author.userId })
        message.success('Đã hủy theo dõi')
        setHasFollow(false)
      } else {
        await followBloggerAPI({ userId: user.id, bloggerId: blog.author.userId })
        message.success('Đã theo dõi')
        setHasFollow(true)
      }
    } catch {
      message.error('Lỗi khi theo dõi blogger')
    }
  }

  const scrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!blog) {
    return <div className="text-center p-10 text-gray-500">Đang tải blog...</div>
  }

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <Layout className="border min-h-screen">
        {/* Sidebar trái */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={340}
          collapsedWidth={80}
          trigger={null}
          className="!bg-[#F5F3F5] border-r shadow-inner"
        >
          {!collapsed && (
            <div className="flex justify-end p-2">
              <Button icon={<LeftOutlined />} className="!bg-amber-400" onClick={() => setCollapsed(true)} />
            </div>
          )}

          <div className="text-center px-3 py-4 font-bold">
            {collapsed ? (
              <RelatedBlogCharacter blogComic={blog} blogInsight={blog} blogType={blog.type} loadType="Icon" />
            ) : (
              <>
                <div className="text-left text-2xl font-bold underline mb-6 text-[#520044]">
                  Những bài viết liên quan:
                </div>
                <RelatedBlogCharacter blogType={blog.type} blogComic={blog} blogInsight={blog} loadType="Full" />
              </>
            )}
          </div>
        </Sider>

        {/* Nút mở sidebar khi thu gọn */}
        {collapsed && (
          <div className="flex justify-end">
            <Button
              icon={<RightOutlined />}
              className="!bg-amber-400 !rounded-l-none"
              onClick={() => setCollapsed(false)}
            />
          </div>
        )}

        {/* Nội dung chính */}
        <Layout>
          <Content className="flex gap-6 px-6 sm:px-10 py-6 justify-center">
            <PostActions
              user={user}
              likes={blog.reaction || 0}
              comments={commentCount}
              saves={saveCount}
              isSaved={!!favouriteId}
              onLike={handleReaction}
              onComment={scrollToComment}
              onSave={handleSave}
              onShare={() => {}}
            />

            <div className="max-w-[700px] grow">
              <h1 className="font-bold text-4xl text-[#333] py-2 leading-tight">
                {blog.title}
              </h1>

              <BloggerInfo
                hasFollow={hasFollow}
                name={blog.author.displayName}
                avatarUrl={getUserAvatar(blog.author.avatar)}
                date={formatDatetimeWithTimeFirst(blog.createdAt)}
                onFollow={handleFollow}
                setHasFollow={setHasFollow}
              />

              <div className="my-4">
                <SelectedElement selected={blog.categories} type="Thể loại" color="blue" />
                <SelectedElement selected={blog.tags} type="Tag" color="amber" />
              </div>

              {blog.type === 'INSIGHT' && (
                <div className="my-5 text-base text-gray-700 space-y-1">
                  <div>
                    Viết về nhân vật:{' '}
                    <span className={blogCharacter ? 'text-blue-600' : 'text-gray-500 italic'}>
                      {blogCharacter ? (
                        <Link to="#" target="_blank">
                          {blogCharacter.title}
                        </Link>
                      ) : 'Không rõ'}
                    </span>
                  </div>
                  <div>
                    Trong truyện:{' '}
                    <span className={blogComic ? 'text-blue-600' : 'text-gray-500 italic'}>
                      {blogComic ? (
                        <Link to="#" target="_blank">
                          {blogComic.title}
                        </Link>
                      ) : 'Không rõ'}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-center my-6">
                <Image
                  style={{ maxHeight: 650, maxWidth: 930 }}
                  src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
                  className="rounded shadow"
                />
              </div>

              <div
                className="my-8 prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </Content>

          <Comment blogId={blog.id} />
        </Layout>
      </Layout>
    </>
  )
}
