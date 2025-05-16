// ✅ Đã style lại theo chuẩn Tailwind, responsive, dễ đọc
// 📁 File: components/character-related-blogs/RelatedBlog.jsx

import { Avatar, Image, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getBlogCharacterAPI,
  getBlogComicAPI,
  getInsightsCharacterAPI,
  getInsightsComicAPI,
  getRelatedCharactersAPI,
} from '../../services/blogService'
import { URL_BACKEND_IMAGES } from '../../constants/images'
import { ROUTES } from '../../constants/api'
import { validate } from '../../utils/validate.js'
import { getThumbnail } from '../../constants/utility.js'

const SectionTitle = ({ children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-bold text-gray-800">{children}</h3>
  </div>
)

const BlogItem = ({ blog, type }) => (
  <div
    className="group flex items-center gap-4 p-4 mb-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-purple-200">
    <div className="relative overflow-hidden rounded-lg w-20 h-20">
      <Image
        src={`${getThumbnail(blog.thumbnail)}`}
        preview={false}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div className="flex-1">
      <Link
        to={
          type === 'CHARACTER'
            ? ROUTES.getViewCharacter(blog.id)
            : ROUTES.getViewComic(blog.id)
        }
        className="text-gray-800 font-medium hover:text-purple-600 transition-colors duration-200 line-clamp-2"
      >
        {blog.title}
      </Link>
      <div className="mt-1 text-sm text-gray-500">
        {type === 'CHARACTER' ? 'Nhân vật' : 'Truyện'}
      </div>
    </div>
  </div>
)

const BlogIcon = ({ blog, type }) => {
  if (validate(blog) === false) {
    return null
  }
  const navigate = useNavigate()
  return (
    <div className="group relative my-4 hover:cursor-pointer" onClick={() => {
      if (type === 'CHARACTER') {
        navigate(ROUTES.getViewCharacter(blog.id))
      } else {
        navigate(ROUTES.getViewComic(blog.id))
      }
    }}>
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <Avatar
        src={`${URL_BACKEND_IMAGES}/${blog.thumbnail}`}
        className="!w-20 !h-20 border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
      />
    </div>
  )
}

export const RelatedBlog = ({
  hasBlog,
  blogComic,
  blogCharacterId,
  blogType,
  blogInsight,
  loadType,
}) => {
  const [relatedCharacters, setRelatedCharacters] = useState([])
  const [relatedInsightBlogs, setRelatedInsightBlogs] = useState([])
  const [relatedBlogComic, setRelatedBlogComic] = useState([])

  useEffect(() => {
    if (blogType === 'CHARACTER') {
      if (blogComic) getCharacters(blogComic.id)
      if (blogCharacterId) getInsightCharacter(blogCharacterId)
    } else if (blogType === 'COMIC') {
      if (blogComic) {
        getCharacters(blogComic.id)
        getInsightComic(blogComic.id)
      }
    } else if (blogType === 'INSIGHT') {
      if (blogInsight?.comicId) getComic(blogInsight.comicId)
      if (blogInsight?.blogCharacterId)
        getCharacter(blogInsight.blogCharacterId)
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

  const getInsightComic = async (id) => {
    try {
      const res = await getInsightsComicAPI(id)
      setRelatedInsightBlogs(res)
    } catch {
      message.error('Không thể lấy danh sách bài viết cảm hứng')
    }
  }

  const getInsightCharacter = async (id) => {
    try {
      const res = await getInsightsCharacterAPI(id)
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
      <div
        className="h-[700px] mt-20 grid grid-cols-1 place-items-center gap-3 bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6">
        {hasBlog && blogComic && <BlogIcon blog={blogComic} type={'COMIC'}/>}
        {Array.isArray(relatedCharacters)
          ? relatedCharacters?.map((char) => (
            <BlogIcon key={char.id} blog={char} type={'CHARACTER'}/>
          ))
          : relatedCharacters && <BlogIcon blog={relatedCharacters} type={'CHARACTER'}/>}
        {validate(relatedInsightBlogs) &&
          relatedInsightBlogs.map((blog) => (
            <BlogIcon key={blog.id} blog={blog} type={'COMIC'}/>
          ))}
        {relatedBlogComic && <BlogIcon blog={relatedBlogComic} type={'COMIC'}/>}
      </div>
    )
  }

  return (
    <div className="h-[700px] overflow-y-auto px-4 py-6 space-y-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl">
      {blogType === 'CHARACTER' && (
        <>
          {hasBlog && blogComic && <BlogItem blog={blogComic} type="COMIC"/>}

          {relatedCharacters?.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <SectionTitle>Nhân vật khác</SectionTitle>
              {relatedCharacters.map((char) => (
                <BlogItem key={char.id} blog={char} type="CHARACTER"/>
              ))}
            </div>
          )}

          {validate(relatedInsightBlogs) > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <SectionTitle>Bài viết bình luận về nhân vật</SectionTitle>
              {relatedInsightBlogs.map((blog) => (
                <BlogItem key={blog.id} blog={blog} type="COMIC"/>
              ))}
            </div>
          )}
        </>
      )}

      {blogType === 'COMIC' && (
        <>
          {relatedCharacters?.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <SectionTitle>Bài viết về nhân vật thuộc truyện</SectionTitle>
              {relatedCharacters.map((char) => (
                <BlogItem key={char.id} blog={char} type="COMIC"/>
              ))}
            </div>
          )}

          {relatedInsightBlogs?.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <SectionTitle>Bài viết bình luận về truyện</SectionTitle>
              {relatedInsightBlogs.map((blog) => (
                <BlogItem key={blog.id} blog={blog} type="COMIC"/>
              ))}
            </div>
          )}
        </>
      )}

      {blogType === 'INSIGHT' && (
        <>
          {validate(relatedBlogComic) && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <SectionTitle>Truyện/Tiểu thuyết liên quan</SectionTitle>
              <BlogItem blog={relatedBlogComic} type="COMIC"/>
            </div>
          )}

          {validate(relatedCharacters) && (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <SectionTitle>Bài viết về nhân vật liên quan</SectionTitle>
              <BlogItem blog={relatedCharacters} type="CHARACTER"/>
            </div>
          )}
        </>
      )}
    </div>
  )
}
