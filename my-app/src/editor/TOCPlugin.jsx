import { ButtonView } from 'ckeditor5'
import { Plugin } from 'ckeditor5'

export default class TOCPlugin extends Plugin {
  static get pluginName () {
    return 'TOCPlugin'
  }

  init () {
    const editor = this.editor

    editor.ui.componentFactory.add('insertTOC', (locale) => {
      const view = new ButtonView(locale)

      view.set({
        label: 'Chèn Mục Lục',
        tooltip: true,
        withText: true
      })

      view.on('execute', () => {
        const html = editor.getData()
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')

        const tocList = document.createElement('ul')
        tocList.style.listStyleType = 'none'
        tocList.style.padding = '10px 0'
        tocList.style.margin = '0'

        const oldTOC = doc.querySelector('.auto-toc')
        if (oldTOC) oldTOC.remove()

        let counters = [0, 0, 0, 0, 0, 0]

        headings.forEach((heading, index) => {
          const level = parseInt(heading.tagName[1])
          counters[level - 1]++

          for (let i = level; i < counters.length; i++) {
            counters[i] = 0
          }

          const numbering = counters.slice(0, level).filter(n => n > 0).join('.')

          // Lấy text trong strong nếu có, nếu không thì dùng heading text
          const text = heading.querySelector('strong')?.textContent || heading.textContent || `heading-${index}`

          // Tạo id: giữ nguyên dấu tiếng Việt, thay space bằng _
          const toSlug = (str) => {
            return str
              .toLowerCase()
              .normalize('NFD') // loại dấu tiếng Việt
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^a-z0-9 ]/g, '') // bỏ ký tự đặc biệt
              .replace(/\s+/g, '-') // space -> dash
              .replace(/^-+|-+$/g, '')
          }

// Gán id duy nhất
          let id = toSlug(text)
          let baseId = id
          let suffix = 1
          while (doc.getElementById(id)) {
            id = `${baseId}-${suffix++}`
          }
          heading.setAttribute('id', id)

          // Tạo item cho TOC
          const listItem = document.createElement('li')
          listItem.className = 'toc-list-item'
          listItem.style.marginLeft = `${(level - 1) * 20}px`
          const link = document.createElement('a')
          link.style.display = 'block'
          link.href = `#${id}`
          link.textContent = `${numbering} ${text.trim()}`

          listItem.appendChild(link)
          tocList.appendChild(listItem)
        })

        // Tạo wrapper chứa TOC và icon
        const tocWrapper = document.createElement('div')
        tocWrapper.className = 'auto-toc'
        tocWrapper.setAttribute('style', `
          background: #f9f9f9;
          padding: 10px;
          border: 1px solid #ddd;
          margin-bottom: 20px;
          border-radius: 6px;
          max-width: 400px; /* Set max width here */
        `)
        // Tạo icon
        const icon = document.createElement('span')
        icon.style.marginRight = '8px'
        icon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 384 512">
            <path fill="#333" d="M336 0H48C21.5 0 0 21.5 0 48v464l192-112 192 112V48c0-26.5-21.5-48-48-48z"/>
          </svg>
        `

        const titleWrapper = document.createElement('div')
        titleWrapper.style.display = 'flex'
        titleWrapper.style.alignItems = 'center'
        titleWrapper.style.marginBottom = '10px'

        const title = document.createElement('strong')
        title.textContent = 'Mục lục'
        titleWrapper.appendChild(icon)
        titleWrapper.appendChild(title)
        tocWrapper.appendChild(titleWrapper)

        tocWrapper.appendChild(tocList)

        // CSS hover cho item
        const styleTag = document.createElement('style')
        styleTag.textContent = `
          
          .toc-list-item a {
             padding: 6px 8px;
            border-radius: 4px;
            transition: background 0.2s ease;
            cursor:pointer;
             color:#FF6600;
            text-decoration:underline;
          }
         .toc-list-item a:hover{
          background: #e6f0ff;
           text-decoration:underline;
          }
        `
        tocWrapper.prepend(styleTag)

        // Gộp mục lục vào nội dung
        const newContent = tocWrapper.outerHTML + doc.body.innerHTML
        editor.setData(newContent)
        console.log('Next')
      })

      return view
    })
  }
}
