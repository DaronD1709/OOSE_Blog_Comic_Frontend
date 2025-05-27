import React, { useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useReport } from '../../context/ReportContext';
import { Tooltip } from 'antd';

function ReportButton({ targetType, targetId }) {
  const { openReport } = useReport();
  const [isHovered, setIsHovered] = useState(false);

  // Map loại đối tượng sang phần tử hiển thị
  const targetTypeLabels = {
    'blog': 'bài viết',
    'comment': 'bình luận',
    'user': 'người dùng'
  };

  return (
    <Tooltip title={`Báo cáo ${targetTypeLabels[targetType] || 'nội dung'} này`}>
      <button
        type="button"
        className={`
          flex items-center text-sm font-medium gap-1 px-2 py-1 rounded-md
          ${isHovered 
            ? 'bg-yellow-100 text-yellow-600 shadow-sm' 
            : 'bg-transparent text-yellow-400 hover:bg-yellow-50'
          }
          transition-all duration-200 border border-transparent hover:border-yellow-200
        `}
        onClick={() => openReport(targetType, targetId)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ExclamationCircleOutlined className={`text-base ${isHovered ? 'animate-pulse' : ''}`} />
        <span>Báo cáo</span>
      </button>
    </Tooltip>
  );
}

export default ReportButton;