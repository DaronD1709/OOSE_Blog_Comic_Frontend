import { useContext, useState } from 'react'
import RichTextEditor from '../editor/RichTextEditor.jsx'
import { customImageAlignStyles } from '../editor/editorCustomStyleConstant.jsx'
import { Divider, Input, message } from 'antd'
import { AuthContext } from '../context/auth.context.jsx'
import { saveBlogCharacterAPI } from '../services/blogService.js'
import { SearchBlogComic } from '../components/blog/SearchBlogComic.jsx'
import { NewCharacterInfo } from '../components/blog/NewCharacterInfo.jsx'
import TextArea from 'antd/es/input/TextArea.js'
import { validate } from '../utils/validate.js'

const characterData = {
  vietName: ' ',
  chineseName: ' ',
  pseudonym: ' ',
  otherName: ' ',
  age: 10000,
  gender: ' ',
  faction: ' ',
  race: ' ',
  realm: ' ',
  cultivationRealm: ' ',
  bodyRealm: ' ',
  combatPower: ' ',
  alias: ' ',
  status: ' ',
  betrothed: ' ',
  sect: ' ',
  clan: ' ',
  bloodLine: ' ',
}

export const NewBlogCharacterPage = () => {
  const { user } = useContext(AuthContext)
  const { uploadCharacterAvatar, setUploadCharacterAvatar } =
    useContext(AuthContext)
  // HTML content của bài viết
  const [result, setResult] = useState('')
  const [preview, setPreview] = useState('')
  const [isImageSaved, setIsImageSaved] = useState(false)
  // Thông tin nhân vật, tương ứng với CharacterReq trong BE
  const [character, setCharacter] = useState(characterData)
  // Tiêu đề
  const [blogTitle, setBlogTitle] = useState('')
  const [blogComic, setBlogComic] = useState(null)
  const [introduction, setIntroduction] = useState('')
  const saveBlog = async () => {
    const blogCharacterReq = {
      title: blogTitle,
      authorId: user.id,
      content: result,
      character: character,
      comicId: validate(blogComic) ? null : blogComic?.id,
      introduction: introduction,
    }
    try {
      const response = await saveBlogCharacterAPI(
        blogCharacterReq,
        uploadCharacterAvatar
      )
      message.success('Tạo bài viết thành công')

      // Reset các input và state
      setBlogTitle('') // Reset tiêu đề
      setBlogComic(null) // Reset truyện
      setCharacter(characterData) // Reset thông tin nhân vật về mặc định
      setResult('') // Reset nội dung bài viết
      setPreview('') // Reset bản xem trước
      setIsImageSaved(false) // Reset trạng thái lưu ảnh
      setUploadCharacterAvatar(null)
      setIntroduction('')
    } catch (error) {
      message.error(error.data)
    }
  }

  return (
    <>
      <style>{customImageAlignStyles}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main content section */}
          <div className="col-span-9">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              {/* SearchBlogComic Component */}
              <div className="mb-6 mt-3 flex justify-center ">
                <SearchBlogComic setBlogComic={setBlogComic}/>
              </div>

              {/* Input section */}
              <div className="flex items-center mb-6">
                <Input
                  style={{ width: '12rem' }}
                  value={blogTitle}
                  placeholder="Nhập tiêu đề bài viết"
                  className="!flex-shrink-0 rounded-lg shadow-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-base"
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
                <div className="ml-6 font-medium text-gray-700">
                  Thuộc truyện:{' '}
                  <span className="font-semibold text-blue-600">
                    {blogComic === null ? 'Chưa chọn truyện' : blogComic.title}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  Giới thiệu truyện
                </div>
                <TextArea
                  showCount
                  maxLength={300}
                  onChange={(e) => setIntroduction(e.target.value)}
                  placeholder="Viết lời giới thiệu về bài viết"
                  style={{
                    height: 100,
                    resize: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                  }}
                  value={introduction}
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* RichTextEditor */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <RichTextEditor
                result={result}
                setResult={setResult}
                setPreview={setPreview}
                isImageSaved={isImageSaved}
                setIsImageSaved={setIsImageSaved}
                saveBlog={saveBlog}
              />
            </div>

            {/* Preview section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-xl font-semibold text-gray-800 mb-4">
                Bản xem trước
              </div>
              <Divider className="!mt-0 !mb-4"/>

              <div className="border rounded-lg p-6 bg-gray-50">
                <div
                  className="prose prose-lg max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: preview }}
                ></div>
              </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="col-span-3">
            <NewCharacterInfo
              character={character}
              setCharacter={setCharacter}
            />
          </div>
        </div>
      </div>
    </>
  )
}
