import { Box, SpeedDialIcon } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import AdminHeader from '../../components/AdminHeader'
import { useTheme } from '@mui/material'
import { mockBlogs } from '../../data_testing/testData'
import { useNavigate } from 'react-router-dom'
import { deleteBlogByIdAPI, getAllBlogAPI, getBlogByIdAPI, updateBlogStatusAPI } from '../../services/blogService.js'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { ROUTES } from '../../constants/api.js'
import { deleteUserById } from '../../services/userService.js'

const AdminManageBlogs = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()

  const [selectedRows, setSelectedRows] = useState([]) // Track selected rows
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    getAllBlog()
  }, [])

  const getAllBlog = async () => {
    try {
      const res = await getAllBlogAPI()
      setBlogs(res)
    } catch (err) {
      message.error('Lỗi khi lấy dữ liệu bài viết ', err.data)
    }
  }
  const handleAccept = async () => {

    try {
      // Send accept API request for selected blogs
      await Promise.all(selectedRows.map((id) => updateBlogStatusAPI({ blogId: id, status: 'PUBLISHED' })))
      message.success('Bài viết đã được chấp nhận.')
      getAllBlog()
    } catch (err) {
      message.error('Lỗi khi chấp nhận bài viết.')
    }
  }
  const handleDeleteBlog = async () => {
    try {
      // Send delete API request for selected blogs
      await Promise.all(selectedRows.map((id) => deleteBlogByIdAPI(id)))
      message.success('Bài viết đã được xóa.')
      getAllBlog() // Reload blogs after action
    } catch (err) {
      message.error('Lỗi khi xóa bài viết.')
    }
  }
  const navigateToBlog = async (blogId) => {
    try {
      const blog = await getBlogByIdAPI(blogId)
      if (blog.type === 'COMIC') {

        navigate(`${ROUTES.getViewComic(blogId)}`)
      } else {
        navigate(`${ROUTES.getViewCharacter(blogId)}`)
      }
    } catch (err) {
      message.error('Không thể lấy được dữ liêu bài viết')
    }

  }

  const handleReject = async () => {
    try {
      // Send reject API request for selected blogs
      await Promise.all(selectedRows.map((id) => updateBlogStatusAPI({ blogId: id, status: 'DENIED' })))
      message.success('Bài viết đã bị ẩn.')
      getAllBlog() // Reload blogs after action
    } catch (err) {
      message.error('Lỗi khi ẩn bài viết.')
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: (params) => (
        <span
          style={{
            color: colors.greenAccent[400],
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          onClick={(id) => navigateToBlog(`${params.row.id}`)} // BLANK URL
        >
          {params.value}
        </span>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Blog Type',
      flex: 1,
    },
  ]

  return (
    <Box m="20px">
      <div className="flex items-center justify-between mb-6">
        <div>
          <AdminHeader title="MANAGE BLOGS" subtitle="Daily blogs"/>
        </div>
        <div className="flex space-x-20 gap-5">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200"
            onClick={handleAccept} // Call accept function
          >
            Accept
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200"
            onClick={handleReject} // Call reject function
          >
            Reject
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200"
            onClick={handleDeleteBlog} // Call delete function
          >
            Delete
          </button>
        </div>
      </div>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {
          blogs.length > 0 &&
          <DataGrid
            checkboxSelection
            rows={blogs}
            columns={columns}
            showToolbar
            onRowSelectionModelChange={(newSelection) => {
              const selectedIds = Array.from(newSelection.ids)
              setSelectedRows(selectedIds)
            }}
          />
        }

      </Box>
    </Box>
  )
}

export default AdminManageBlogs
