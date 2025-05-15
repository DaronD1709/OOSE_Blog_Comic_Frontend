// ✅ Đã style lại theo chuẩn Tailwind, responsive, dễ đọc
// 📁 File: components/character-related-blogs/RelatedBlogCharacter.jsx

import { Avatar, Image, message } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getBlogCharacterAPI,
  getBlogComicAPI,
  getInsightsComicAPI,
  getRelatedCharactersAPI,
} from '../../services/blogService'
import { URL_BACKEND_IMAGES } from '../../constants/images'
import { ROUTES } from '../../constants/api'

const SectionTitle = ({ children }) => (
  <div className="text-[#520044] text-xl font-bold underline underline-offset-4 mb-3">
    {children}
  </div>
)

const BlogItem = ({ blog, type }) => (
  <div className="flex items-center gap-4 p-3 mb-3 rounded-lg bg-white shadow hover:bg-gray-100 transition-all">
    <Image
      src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
      preview={false}
      className="w-20 h-20 rounded object-cover"
    />
    <Link
      to={type === 'CHARACTER' ? ROUTES.getViewCharacter(blog.id) : ROUTES.getViewComic(blog.id)}
      className="text-[#520044] font-semibold underline hover:text-[#73005f]"
    >
      {blog.title}
    </Link>
  </div>
)

const BlogIcon = ({ blog }) => (
  <div className="my-3">
    <Avatar
      src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
      className="!w-20 !h-20 border rounded-full object-cover"
    />
  </div>
)

export const RelatedBlogCharacter = ({
  hasBlog,
  blogComic,
  blogCharacterId,
  blogType,
  blogInsight,
  loadType,
}) => {
  const [relatedCharacters, setRelatedCharacters] = useState(null)
  const [relatedInsightBlogs, setRelatedInsightBlogs] = useState(null)
  const [relatedBlogComic, setRelatedBlogComic] = useState(null)

  useEffect(() => {
    if (blogType === 'CHARACTER') {
      if (blogComic) getCharacters(blogComic.id)
      if (blogCharacterId) getInsight(blogCharacterId)
    } else if (blogType === 'COMIC') {
      if (blogComic) {
        getCharacters(blogComic.id)
        getInsight(blogComic.id)
      }
    } else if (blogType === 'INSIGHT') {
      if (blogInsight?.comicId) getComic(blogInsight.comicId)
      if (blogInsight?.blogCharacterId) getCharacter(blogInsight.blogCharacterId)
    }
  }, [blogComic, blogCharacterId, blogInsight, blogType])

  const getCharacters = async (id) => {
    try {
      const res = await getRelatedCharactersAPI(id)
      setRelatedCharacters(res)
    } catch {
      message.error('Không thể lấy danh sách nhân vật')
    }
  }

  const getInsight = async (id) => {
    try {
      const res = await getInsightsComicAPI(id)
      setRelatedInsightBlogs(res)
    } catch {
      message.error('Không thể lấy danh sách bài viết cảm hứng')
    }
  }

  const getComic = async (id) => {
    try {
      const res = await getBlogComicAPI(id)
      setRelatedBlogComic(res)
    } catch {
      message.error('Không thể lấy bài viết truyện')
    }
  }

  const getCharacter = async (id) => {
    try {
      const res = await getBlogCharacterAPI(id)
      setRelatedCharacters(res)
    } catch {
      message.error('Không thể lấy bài viết nhân vật')
    }
  }

  if (loadType === 'Icon') {
    return (
      <div className="h-[700px] mt-20 grid grid-cols-1 place-items-center gap-3">
        {hasBlog && blogComic && <BlogIcon blog={blogComic} />}
        {relatedCharacters?.map((char) => <BlogIcon key={char.id} blog={char} />)}
        {relatedInsightBlogs?.map((blog) => <BlogIcon key={blog.id} blog={blog} />)}
        {relatedBlogComic && <BlogIcon blog={relatedBlogComic} />}
      </div>
    )
  }

  return (
    <div className="h-[700px] overflow-y-auto px-2 space-y-6">
      {blogType === 'CHARACTER' && (
        <>
          {hasBlog && blogComic && <BlogItem blog={blogComic} type="COMIC" />}

          {relatedCharacters?.length > 0 && (
            <>
              <SectionTitle>Nhân vật khác</SectionTitle>
              {relatedCharacters.map((char) => (
                <BlogItem key={char.id} blog={char} type="CHARACTER" />
              ))}
            </>
          )}

          {relatedInsightBlogs?.length > 0 && (
            <>
              <SectionTitle>Bài viết bình luận về nhân vật</SectionTitle>
              {relatedInsightBlogs.map((blog) => (
                <BlogItem key={blog.id} blog={blog} type="COMIC" />
              ))}
            </>
          )}
        </>
      )}

      {blogType === 'COMIC' && (
        <>
          {relatedCharacters?.length > 0 && (
            <>
              <SectionTitle>Bài viết về nhân vật thuộc truyện</SectionTitle>
              {relatedCharacters.map((char) => (
                <BlogItem key={char.id} blog={char} type="COMIC" />
              ))}
            </>
          )}

          {relatedInsightBlogs?.length > 0 && (
            <>
              <SectionTitle>Bài viết bình luận về truyện</SectionTitle>
              {relatedInsightBlogs.map((blog) => (
                <BlogItem key={blog.id} blog={blog} type="COMIC" />
              ))}
            </>
          )}
        </>
      )}

      {blogType === 'INSIGHT' && (
        <>
          {relatedBlogComic && (
            <>
              <SectionTitle>Truyện/Tiểu thuyết liên quan</SectionTitle>
              <BlogItem blog={relatedBlogComic} type="COMIC" />
            </>
          )}

          {relatedCharacters && (
            <>
              <SectionTitle>Bài viết về nhân vật liên quan</SectionTitle>
              <BlogItem blog={relatedCharacters} type="CHARACTER" />
            </>
          )}
        </>
      )}
    </div>
  )
}
