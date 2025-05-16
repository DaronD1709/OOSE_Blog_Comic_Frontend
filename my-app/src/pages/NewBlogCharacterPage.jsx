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
      comicId: validate(blogComic) ? null : blogComic.id,
      introduction: introduction
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
      <div className="grid grid-cols-12 gap-6">
        {/* Main content section */}
        <div className="col-span-9 mr-6 p-4 bg-white rounded-lg shadow-sm">
          {/* SearchBlogComic Component */}
          <SearchBlogComic setBlogComic={setBlogComic}/>

          {/* Input section */}
          <div className="flex items-center mb-4 h-12">
            <Input
              style={{ width: '10rem' }}
              value={blogTitle}
              placeholder="Nhập tiêu đề bài viết"
              className="!flex-shrink-0 rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setBlogTitle(e.target.value)}
            />
            <div className="ml-6 font-bold text-gray-800">
              Thuộc truyện:{' '}
              {blogComic === null ? 'Chưa chọn truyện' : blogComic.title}
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

        {/* Sidebar Section */}
        <div className="col-span-3 p-4 bg-white rounded-lg shadow-sm">
          <NewCharacterInfo character={character} setCharacter={setCharacter}/>
        </div>
      </div>
    </>
  )
}
