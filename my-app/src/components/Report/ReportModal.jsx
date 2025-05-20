import React, { useState, useEffect, useContext } from 'react'
import { ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons'
import { useReport } from '../../context/ReportContext'
import { message } from 'antd'
import { AuthContext } from '../../context/auth.context.jsx'
import { useParams } from 'react-router-dom'
import { createReportAPI } from '../../services/reportService.js'
import { mapReasonToEnum } from '../../constants/utility.js'

const REASONS = [
  'Nội dung phản cảm',
  'Spam',
  'Ngôn từ thù ghét',
  'Quấy Rối',
  'Thông Tin Sai Lệch',
  'Khác'
]

function ReportModal () {
  const { modalOpen, target, closeReport } = useReport()
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  useEffect(() => {
    if (modalOpen) {
      setReason('')
      setDetails('')
      setError('')
      setIsVisible(true)
      // Ngăn cuộn trang khi modal hiển thị
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [modalOpen])

  if (!modalOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!reason) {
      setError('Vui lòng chọn lý do báo cáo.')
      return
    }
    if (reason === 'Khác' && !details.trim()) {
      setError('Vui lòng nhập chi tiết lý do.')
      return
    }
    const reportData = {
      ...target,
      reason,
      details: reason === 'Khác' ? details : ''
    }
    const reportReq = {
      userId: user.id,
      reason: details,
      url: window.location.href + `#comment-${reportData.targetId}`,
      eReportType: mapReasonToEnum(reportData.reason),
      blogId: id,
      type: 'Comment',
      commentId: reportData.targetId,
    }
    try {
      const res = await createReportAPI({ reportReq })
      message.success('Gửi báo cáo thành công')
    } catch (err) {
      message.error('Lỗi khi gửi báo cáo')
    }
    closeReport()
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(closeReport, 200) // Đợi hiệu ứng mờ dần trước khi đóng hoàn toàn
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(255, 255, 255, 0.75)' }}
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-md relative transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}
        style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ExclamationCircleOutlined className="text-yellow-500"/>
              Báo cáo vi phạm
            </h3>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={handleClose}
            >
              <CloseOutlined/>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Chọn lý do báo cáo:
              </label>
              <div className="space-y-2">
                {REASONS.map((r) => (
                  <label key={r}
                         className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                    <input
                      type="radio"
                      name="reason"
                      value={r}
                      checked={reason === r}
                      onChange={() => {
                        setReason(r)
                        setError('')
                      }}
                      className="accent-yellow-600"
                    />
                    <span className="text-gray-800">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Nhập chi tiết:
              </label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={3}
                value={details}
                onChange={e => {
                  setDetails(e.target.value)
                  setError('')
                }}
                placeholder="Vui lòng mô tả chi tiết lý do báo cáo..."
              />
            </div>
            {error && (
              <div className="mb-3 text-red-600 text-sm flex items-center gap-1">
                <ExclamationCircleOutlined/>
                {error}
              </div>
            )}
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-semibold"
                onClick={handleClose}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 font-semibold"
              >
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReportModal