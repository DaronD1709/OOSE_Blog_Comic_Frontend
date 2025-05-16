import { Box, Typography, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { tokens } from '../../theme'
import AdminHeader from '../../components/AdminHeader'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import { testData } from '../../data_testing/testData'
import { deleteUserById, fetchAllUsers, updateUserStatusAPI } from '../../services/userService.js'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { updateBlogStatusAPI } from '../../services/blogService.js'

const AdminManageUsers = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [users, setUsers] = useState([])
  const [selectedRows, setSelectedRows] = useState([]) //
  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = async () => {
    try {
      const res = await fetchAllUsers()
      setUsers(res)
    } catch (err) {
      message.error('Lỗi khi lấy dữ liệu người dùng')
    }

  }

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'username',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    { field: 'level', headerName: 'Level', flex: 1 },
    { field: 'accountStatus', headerName: 'status', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      headerAlign: 'left',
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === 'Admin'
                ? colors.greenAccent[600]
                : role === 'Blogger'
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === 'ADMIN' && <AdminPanelSettingsOutlinedIcon/>}
            {role === 'BLOGGER' && <SecurityOutlinedIcon/>}
            {role === 'USER' && <LockOpenOutlinedIcon/>}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {role}
            </Typography>
          </Box>
        )
      },
    },
  ]
  const handleDeleteUser = async () => {
    try {
      // Send delete API request for selected blogs
      await Promise.all(selectedRows.map((id) => deleteUserById(id)))
      message.success('Tài khoản người dùng đã được xóa.')
      getAllUser() // Reload blogs after action
    } catch (err) {
      message.error('Lỗi khi xóa người dùng .')
    }
  }

  const handleLockUser = async () => {
    try {
      // Send delete API request for selected blogs
      await Promise.all(selectedRows.map((id) => updateUserStatusAPI({ userId: id, status: 'BANNED' })))
      message.success('Tài khoản người dùng đã được khóa lại.')
      getAllUser() // Reload blogs after action
    } catch (err) {
      message.error('Lỗi khi khóa tài khoản người dùng.')
    }
  }
  return (
    <Box m="20px">
      <div className="flex items-center justify-between mb-6">
        <div>
          <AdminHeader
            title="MANAGE USERS"
            subtitle="Managing users profiles"
          />
        </div>
        <div className="flex space-x-20 gap-5">
          <button
            onClick={handleDeleteUser}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200">
            Delete
          </button>
          <button
            onClick={handleLockUser}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200">
            Lock
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-xl shadow transition duration-200">
            Unlock
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
          users !== null &&
          <DataGrid
            checkboxSelection
            rows={users}
            columns={columns}
            onRowSelectionModelChange={(newSelection) => {
              const selectedIds = Array.from(newSelection.ids)
              setSelectedRows(selectedIds)
              console.log('SelectedIDS ', selectedIds)
            }}
          />
        }

      </Box>
    </Box>
  )
}

export default AdminManageUsers
