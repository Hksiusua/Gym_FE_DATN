import React, { useState } from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';

// Bảng TableMembers để hiển thị danh sách thành viên
const TableMembers = ({ onMembers }) => {
  // Cấu hình các cột hiển thị
  const columns = [
    {
      title: 'Mã Thành Viên',
      dataIndex: 'maThanhVien',
      key: 'maThanhVien',
    },
    {
      title: 'Tên Thành Viên',
      dataIndex: 'tenThanhVien',
      key: 'tenThanhVien',
    },
    {
      title: 'Email',
      dataIndex: 'emailThanhVien',
      key: 'emailThanhVien',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'soDienThoaiThanhVien',
      key: 'soDienThoaiThanhVien',
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'ngaySinhThanhVien',
      key: 'ngaySinhThanhVien',
      render: (text) => dayjs(text).format('DD-MM-YYYY'),
    },
    {
      title: 'QR Định Danh',
      dataIndex: 'duLieuQrDinhDanh',
      key: 'duLieuQrDinhDanh',
      render: (data) => data || 'N/A',
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhauNguoiDung',
      key: 'matKhauNguoiDung',
      render: (password) => password ? "********" : "N/A", 
    },
  ];

  return (
    <Table 
      dataSource={onMembers} 
      columns={columns} 
      rowKey="maThanhVien"
      pagination={{ pageSize: 5 }} 
    />
  );
};

export default TableMembers;
