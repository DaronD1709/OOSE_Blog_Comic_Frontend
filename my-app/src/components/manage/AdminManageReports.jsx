import { Box, useTheme } from '@mui/material'
import AdminHeader from '../AdminHeader'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { tokens } from '../../theme'
import { useState, useEffect } from 'react'
import apiClient from '../../api/config'
import {
  deleteReport,
  getAllCommentReportAPI,
  getResultReport,
  markReportAsResultAPI
} from '../../services/reportService.js'
import { Dropdown, message } from 'antd' // Adjust the import path as necessary
import { Link } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'

const items = [
  {
    key: '1',
    label: 'Báo cáo chưa đọc',
  },
  {
    key: '2',
    label: 'Báo cáo đã đọc & chưa xử lý',
  }

]

const statusLabelMap = {
  '1': 'Báo cáo chưa đọc',
  '2': 'Báo cáo đã đọc & chưa xử lý',
}

const AdminManageReports = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [reports, setReports] = useState([])
  const [selectType, setSelectType] = useState('1')
  const type = statusLabelMap[selectType] || 'Báo cáo chưa đọc'
  const fetchReports = async () => {

    try {
      let response
      if (selectType === '1') {
        response = await getResultReport({ result: 'unread', type: 'Comment' })
      } else {
        response = await getResultReport({ result: 'unhandled', type: 'Comment' })
      }
      setReports(response)
    } catch (error) {
      message.error('Lỗi khi lấy danh sách báo cáo')
    }
  }
  useEffect(() => {
    fetchReports()
  }, [selectType])

  const handleMenuClick = (e) => {
    setSelectType(e.key)
  }

  const dismissSelected = async ({ reportId, type }) => {
    try {
      await deleteReport({ reportId: reportId, type: type })
      fetchReports()
      message.success('Xóa báo cáo thành công')
    } catch (error) {
      message.error('Gặp lỗi khi xóa báo cáo')
    }
  }

  const markAsHandled = async ({ reportId, type }) => {
    try {
      await markReportAsResultAPI({ reportId: reportId, type: type, result: 'handle' })
      fetchReports()
      message.success('Báo cáo đã được xử lý và thông báo hoàn tất xử lý được gửi tới người dùng')

    } catch (error) {
      console.error('Lỗi khi đánh dấu xử lý báo cáo ')
    }
  }

  const markAsRead = async ({ reportId, type }) => {
    try {
      await markReportAsResultAPI({ reportId: reportId, type: type, result: 'read' })
      fetchReports()
      message.success('Báo cáo đã được đánh dấu đọc và thông báo tiếp nhận được gửi tới người dùng')
    } catch (error) {
      console.error('Lỗi khi đánh dấu đọc báo cáo ')
    }
  }
  return (
    <Box m="20px">
      <div className="flex items-center justify-between mb-8">
        <AdminHeader
          title="MANAGE REPORTS"
          subtitle="Frequent Users' Reports"
        />
      </div>

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
          {type}
          <DownOutlined className="text-sm"/>
        </button>
      </Dropdown>
      {/* Report Items */}
      {reports.map((report) => (
        <Accordion key={report.id} defaultExpanded className="mb-4 border rounded-lg shadow-md">


          <AccordionDetails>
            {/* Reporter Info */}
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={report.reporterRes.avatar}
                alt="Reporter Avatar"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <p className="font-semibold text-lg">{report.reporterRes.displayName}</p>
                <p className="text-sm text-gray-500">Level: {report.reporterRes.level}</p>
              </div>
            </div>

            {/* Report Info */}
            <div className="mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-800">Violation Type:</span>{' '}
                <span className="text-red-500 font-semibold">{report.violationType}</span>
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-800">Reason:</span>{' '}
                <span className={'italic underline'}> {report.reason}</span>

              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-800">URL:</span>{' '}
                <Link
                  to={report.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {report.url}
                </Link>
              </p>
            </div>

            {/* Comment Being Reported */}
            <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg shadow-inner">
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src={report.commentRes.avatar}
                  alt="Commenter Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-800">{report.commentRes.userDisplayName}</span>
              </div>
              <p className="text-gray-700">{report.commentRes.content}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 gap-4 mt-6">
              {
                report.read === false && report.handled === false &&
                <button
                  className="bg-blue-400 hover:bg-blue-500 cursor-pointer text-white font-semibold py-2 px-4 rounded-xl shadow transition duration-200"
                  onClick={() => markAsRead({ reportId: report.id, type: report.reportType })}
                >
                  Tiếp nhận
                </button>
              }

              <button
                className="bg-purple-400 hover:bg-purple-500 cursor-pointer text-white font-semibold py-2 px-4 rounded-xl shadow transition duration-200"
                onClick={() => markAsHandled({ type: report.reportType, reportId: report.id })}
              >
                Đã xử lý
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold py-2 px-4 rounded-xl shadow transition duration-200"
                onClick={dismissSelected}
              >
                Bỏ qua
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default AdminManageReports
