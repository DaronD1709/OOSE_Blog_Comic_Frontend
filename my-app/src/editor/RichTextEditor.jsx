import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  ClassicEditor,
  Alignment,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  Bookmark,
  Code,
  CodeBlock,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageEditing,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  ImageUtils,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  Paragraph,
  RemoveFormat,
  ShowBlocks,
  SourceEditing,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
} from 'ckeditor5'
import translations from 'ckeditor5/translations/vi.js'
import 'ckeditor5/ckeditor5.css'
import { Button } from 'antd'
import { useEffect, useState } from 'react'

import { saveCharacterThumbnailAPI, savePreviewThumbnailCharacterAPI } from '../services/blogService.js'
import { customHeadingStyles } from './editorCustomStyleConstant.jsx'

// Custom Base64 Upload Adapter
class Base64UploadAdapter {
  constructor (loader) {
    this.loader = loader
  }

  async upload () {
    try {
      const file = await this.loader.file
      const reader = new FileReader()
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve({ default: reader.result })
        }
        reader.onerror = (error) => {
          reject(error)
        }
        reader.readAsDataURL(file)
      })
    } catch (error) {
      console.error('Base64 conversion error:', error)
      throw error
    }
  }

  abort () {}
}

// Hàm gắn UploadAdapter vào CKEditor
function Base64UploadAdapterPlugin (editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new Base64UploadAdapter(loader)
  }
}

const dataURLtoFile = (dataUrl, filename) => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

const processContentAndUploadImages = async (htmlContent, saveDataService) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const images = doc.querySelectorAll('img')
  const formData = new FormData()
  const base64Images = []
  images.forEach((img, index) => {
    const src = img.getAttribute('src')
    if (src?.startsWith('data:image/')) {
      const file = dataURLtoFile(src, `image_${index + 1}.png`)
      console.log('File: ', file)
      base64Images.push({ file, element: img })
      formData.append('images', file)
    }
  })
  if (base64Images.length > 0) {
    const response = await saveDataService(formData)
    const imageUrls = response.urls // giả sử BE trả về { urls: [ ... ] }
    base64Images.forEach((item, i) => {
      item.element.setAttribute('src', imageUrls[i])
    })
  }
  return doc.body.innerHTML
}

const RichTextEditor = ({ result, setResult, setPreview, isImageSaved, setIsImageSaved, saveBlog }) => {
  const [content, setContent] = useState('<i>Nhập nội dung bài viết...</i>')
  const handleSaveButton = async () => {
    const processedContent = await processContentAndUploadImages(content, saveCharacterThumbnailAPI)
    setResult(processedContent)
    if (isImageSaved === false) {
      setIsImageSaved(true)
    } else {
      saveBlog()
      setIsImageSaved(false)
    }
  }
  const handlePreviewButton = async () => {
    const processedContent = await processContentAndUploadImages(content, savePreviewThumbnailCharacterAPI)
    setPreview(processedContent)
  }
  useEffect(() => {
    if (result && result.trim().length > 0) {
      setContent(result)
    }
  }, [result])
  return (
    <>
      <style>{customHeadingStyles}</style>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          plugins: [
            Alignment,
            AutoImage,
            AutoLink,
            Autosave,
            BalloonToolbar,
            Base64UploadAdapter,
            BlockQuote,
            BlockToolbar,
            Bold,
            Bookmark,
            Code,
            CodeBlock,
            Essentials,
            FontBackgroundColor,
            FontColor,
            FontFamily,
            FontSize,
            GeneralHtmlSupport,
            Heading,
            Highlight,
            HorizontalLine,
            ImageBlock,
            ImageCaption,
            ImageEditing,
            ImageInline,
            ImageInsert,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            ImageUtils,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            Paragraph,
            RemoveFormat,
            ShowBlocks,
            SourceEditing,
            Strikethrough,
            Style,
            Subscript,
            Superscript,
            Table,
            TableCellProperties,
            TableProperties,
            TableToolbar,
            TodoList,
            Underline,
          ],
          toolbar: [
            'sourceEditing',
            'showBlocks',
            '|',
            'heading',
            'style',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'subscript',
            'superscript',
            'code',
            'removeFormat',
            '|',
            'horizontalLine',
            'link',
            'bookmark',
            'imageUpload',
            'imageInsertViaUrl',
            'insertTable',
            'highlight',
            'blockQuote',
            'codeBlock',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'outdent',
            'indent',
          ],
          blockToolbar: [
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            'imageUpload',
            'insertTable',
            '|',
            'bulletedList',
            'numberedList',
            'outdent',
            'indent',
          ],
          fontFamily: {
            supportAllValues: true,
          },
          fontSize: {
            options: [10, 12, 14, 'default', 18, 20, 22],
            supportAllValues: true,
          },
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              {
                model: 'heading1', view: {
                  name: 'h1',
                  classes: 'ck-heading_heading1'
                }, title: 'Heading 1', class: 'ck-heading_heading1', converterPriority: 'high'
              },
              {
                model: 'heading2', view: {
                  name: 'h2',
                  classes: 'ck-heading_heading2'
                }, title: 'Heading 2', class: 'ck-heading_heading2', converterPriority: 'high'
              },
              {
                model: 'heading3', view: {
                  name: 'h3',
                  classes: 'ck-heading_heading3'
                }, title: 'Heading 3', class: 'ck-heading_heading3'
              },
              {
                model: 'heading4', view: {
                  name: 'h4',
                  classes: 'ck-heading_heading4'
                }, title: 'Heading 4', class: 'ck-heading_heading4'
              },
              {
                model: 'heading5', view: {
                  name: 'h5',
                  classes: 'ck-heading_heading5'
                }, title: 'Heading 5', class: 'ck-heading_heading5'
              },
              { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
              // {
              //   model: 'headingFancy',
              //   view: {
              //     name: 'h2',
              //     classes: 'fancy'
              //   },
              //   title: 'Heading 2 (fancy)',
              //   class: 'ck-heading_heading2_fancy',
              //
              //   // It needs to be converted before the standard 'heading2'.
              //   converterPriority: 'high'
              // }
            ],
          },
          htmlSupport: {
            allow: [{ name: /^.*$/, styles: true, attributes: true, classes: true }],
          },
          image: {
            toolbar: [
              'toggleImageCaption',
              'imageTextAlternative',
              '|',
              'imageStyle:inline',
              'imageStyle:wrapText',
              'imageStyle:breakText',
              '|',
              'resizeImage',
            ],
          },
          translations: [translations],
          // language: 'vi',
          licenseKey: 'GPL', // Thay bằng license key thực tế
          extraPlugins: [Base64UploadAdapterPlugin], // Gắn Base64 adapter
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          setContent(data)
        }}
      />
      <div class={'flex justify-start gap-4 mt-3'}>
        <Button type={'default'} onClick={handlePreviewButton}>
          Preview
        </Button>
        {
          isImageSaved ? <Button type={'primary'} className={''} onClick={handleSaveButton}>
            Save blog
          </Button> : <Button type={'primary'} className={''} onClick={handleSaveButton}>
            Save Image To Server
          </Button>
        }


      </div>
    </>
  )
}

export default RichTextEditor