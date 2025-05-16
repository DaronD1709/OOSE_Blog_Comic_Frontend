import { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../editor/RichTextEditor.jsx'
import { customImageAlignStyles } from '../editor/editorCustomStyleConstant.jsx'
import { Divider, Dropdown, Input, message } from 'antd'
import { AuthContext } from '../context/auth.context.jsx'
import {
  getBlogByIdAPI,
  getBlogCharacterAPI,
  getBlogComicAPI, getBlogInsightByIdAPI,
  saveBlogComicAPI,
  saveBlogInsightAPI, updateBlogComicAPI, updateBlogInsightAPI
} from '../services/blogService.js'
import { SearchBlogComic } from '../components/blog/SearchBlogComic.jsx'
import { SearchBlogCharacter } from '../components/blog/SearchBlogCharacter.jsx'
import { CategoryTagSelection } from '../components/blog/CategoryTagSelection.jsx'
import ThumbnailUpload from '../components/blog/ThumbnailUpload.jsx'
import { Link, useParams } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import { URL_BACKEND_IMAGES } from '../constants/images.js'
import TextArea from 'antd/es/input/TextArea.js'
import { validate } from '../utils/validate.js'

const items = [
  {
    key: '1',
    label: 'Bài viết về truyện',
  },
  {
    key: '2',
    label: 'Bài viết bình luận về nhân vật hoặc truyện',
  },
]
export const EditBlogComicPage = () => {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const [result, setResult] = useState('')
  const [preview, setPreview] = useState('')
  const [isImageSaved, setIsImageSaved] = useState(false)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogComic, setBlogComic] = useState(null)
  const [blogType, setBlogType] = useState('Comic')
  const [thumbnail, setThumbnail] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedTag, setSelectedTag] = useState([])
  const [imgSrc, setImgSrc] = useState('')
  const [blogCharacter, setBlogCharacter] = useState(null)
  const [introduction, setIntroduction] = useState('')
  useEffect(() => {
    if (!id) return

    const getBlog = async () => {
      try {
        const res = await getBlogByIdAPI(id)
        var finalRes
        if (res.type === 'COMIC') {
          setBlogType('Comic')
          finalRes = await getBlogComicAPI(id)
        } else if (res.type === 'INSIGHT') {
          setBlogType('Insight')
          finalRes = await getBlogInsightByIdAPI(id)
          const blogComicRes = await getBlogComicAPI(finalRes.comicId)
          const blogCharacterRes = await getBlogCharacterAPI(finalRes.blogCharacterId)
          setBlogComic(blogComicRes)
          setBlogCharacter(blogCharacterRes)
        }
        setImgSrc(`${URL_BACKEND_IMAGES}/${finalRes.thumbnail}`)
        setSelectedCategory(finalRes.categories)
        setSelectedTag(finalRes.tags)
        setBlogTitle(finalRes.title)
        setResult(finalRes.content)
        setIntroduction(finalRes.introduction)
        setThumbnail(await urlToFile(finalRes.thumbnail))
      } catch (error) {
        message.error('Lỗi khi lấy dữ liệu bài viết ')
      }
    }
    getBlog()
  }, [id])

  const handleMenuClick = (e) => {
    if (e.key === '1') {
      setBlogType('Comic')
    } else if (e.key === '2') {
      setBlogType('Insight')
    }
  }

  const saveBlog = async () => {
    try {
      if (blogType === 'Comic') {
        const blogComicReq = {
          title: blogTitle,
          authorId: user.id,
          content: result,
          categories: selectedCategory.map(cat => cat.id),
          tags: selectedTag.map(tag => tag.id),
          introduction: introduction
        }
        const response = await updateBlogComicAPI(
          blogComicReq,
          thumbnail, id
        )
      } else {
        const blogInsightReq = {
          title: blogTitle,
          authorId: user.id,
          content: result,
          categories: selectedCategory.map(cat => cat.id),
          tags: selectedTag.map(tag => tag.id),
          comicId: validate(blogComic)  ? blogComic.id : null,
          blogCharacterId: blogCharacter !== null ? blogCharacter.id : null,
          introduction: introduction
        }
        const response = await updateBlogInsightAPI(
          blogInsightReq,
          thumbnail, id
        )
      }
      message.success('Cập nhật bài viết thành công')
      // Reset các input và state
      // resetForm()
    } catch
      (error) {
      message.error(error.data)
    }
  }
  const resetForm = () => {
    setResult('')
    setPreview('')
    setIsImageSaved(false)
    setBlogTitle('')
    setBlogComic(null)
    setBlogCharacter(null)
    setBlogType('Comic')
    setThumbnail(null)
    setSelectedCategory([])
    setSelectedTag([])
    setImgSrc('')
    setIntroduction('')
  }

  const urlToFile = async (filename) => {
    const url = `${URL_BACKEND_IMAGES}/` + filename
    const response = await fetch(url)
    const blob = await response.blob()
    const mimeType = filename.split('.').pop() // "webp"
    return new File([blob], filename, { type: mimeType })
  }

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <div className="flex justify-center mt-10">
        {/* Main content section */}

        <div className="w-full max-w-5xl  mr-6 p-4 bg-white rounded-lg shadow-sm">
          {/* SearchBlogComic Component */}
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            placement="bottomLeft"
            trigger={['click']}
            className={'!mb-10'}
          >
            <button
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition-all duration-100 text-gray-800"
            >
              {blogType === 'Comic' ? 'Bài viết về truyện' : 'Bài viết bình luận về nhân vật hoặc truyện'} <DownOutlined
              className="text-sm"/>
            </button>
          </Dropdown>

          {blogType === 'Insight' ? (
            <div>
              <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 w-full mx-auto p-2 sm:p-4">
                <div className="w-full sm:w-[360px] lg:w-[400px]">
                  <SearchBlogComic
                    blogComic={blogComic}
                    setBlogComic={setBlogComic}
                  />
                </div>
                <div className="w-full sm:w-[360px] lg:w-[400px]">
                  <SearchBlogCharacter
                    blogCharacter={blogCharacter}
                    setBlogCharacter={setBlogCharacter}
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className={'flex justify-around gap-4'}>
            <div>
              <CategoryTagSelection selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                                    selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
            </div>
            <div>
              <div
                className="text-left text-xl mb-4 font-semibold text-gray-800 underline decoration-blue-500 decoration-2 underline-offset-4">
                Chọn ảnh bìa truyện
              </div>
              <ThumbnailUpload setThumbnail={setThumbnail} imgSrc={imgSrc} setImgSrc={setImgSrc}/>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 max-w-4xl mx-auto mt-5">
            {/* Input tiêu đề */}
            <Input
              value={blogTitle}
              placeholder="Nhập tiêu đề bài viết"
              onChange={(e) => setBlogTitle(e.target.value)}
              className="rounded-lg shadow-md border-gray-300 hover:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
              style={{
                height: 48,
                fontSize: 16,
                padding: '0 16px',
                width: '100%',
                maxWidth: '25rem',
              }}
            />

            {/* Thông tin nhân vật và truyện */}
            <div className="flex-1 text-sm font-medium text-gray-800 bg-gray-50 p-3 rounded-lg shadow-sm">
              {blogType === 'Insight' && (
                <>
                <span>
                  Viết về nhân vật:{' '}
                  <span
                    className={
                      blogCharacter ? 'text-blue-600' : 'text-gray-500 italic'
                    }
                  >
                    {blogCharacter === null ? (
                      'Chưa chọn nhân vật'
                    ) : (
                      <Link to={'/test/#'} target={'_blank'}>
                        {blogCharacter.title}
                      </Link>
                    )}
                  </span>
                </span>
                  <span className="mx-2">|</span>
                  <span>
                Trong truyện:{' '}
                    <span
                      className={
                        blogComic ? 'text-blue-600' : 'text-gray-500 italic'
                      }
                    >
                  {blogComic === null ? (
                    'Chưa chọn truyện'
                  ) : (
                    <Link to={'/test/#'} target={'_blank'}>
                      {blogComic.title}
                    </Link>
                  )}
                </span>
              </span>
                </>

              )}


            </div>
          </div>
          <div className={'py-2 font-bold text-xl'}>
            Giới thiệu truyện
          </div>
          <TextArea
            showCount
            maxLength={300}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="Viết lời giới thiệu về bài viết"
            style={{ height: 100, resize: 'none', marginBottom: '20px' }}
            value={introduction}
          />
          {/* RichTextEditor */}
          <RichTextEditor
            result={result}
            setResult={setResult}
            setPreview={setPreview}
            isImageSaved={isImageSaved}
            setIsImageSaved={setIsImageSaved}
            saveBlog={saveBlog}
          />

          {/* Preview section */}
          <div className="text-left mt-9 text-xl font-semibold text-gray-900">
            Bản xem trước
          </div>
          <Divider className="!mt-0"/>

          <div className="border rounded-md p-4 bg-gray-50 mt-4">
            <div
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: preview }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}
