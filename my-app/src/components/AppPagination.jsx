import React from "react";
import { Pagination } from "antd";

const AppPagination = ({ current, total, pageSize, onChange }) => (
  <div className="flex justify-center py-6">
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
      showSizeChanger={false}
    />
  </div>
);

export default AppPagination;
