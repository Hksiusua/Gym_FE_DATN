import React from 'react';
import { Table } from 'antd';

const TableInvoice = ({ data }) => {
  const columns = [
    {
      title: 'Mã Hóa Đơn',
      dataIndex: 'maHoaDon',
      key: 'maHoaDon',
    },
    {
      title: 'Ngày Tạo Hóa Đơn',
      dataIndex: 'ngayTaoHoaDon',
      key: 'ngayTaoHoaDon',
      render: (text) => new Date(text).toLocaleDateString(), // Chuyển đổi ngày về định dạng đọc dễ hơn
    },
    {
      title: 'Số Tiền Thanh Toán',
      dataIndex: 'soTienThanhToan',
      key: 'soTienThanhToan',
      render: (text) => `${text.toLocaleString()} VND`,
    },
    // {
    //   title: 'Tổng Số Hóa Đơn',
    //   dataIndex: 'tongHoaDon',
    //   key: 'tongHoaDon',
    // },
    {
      title: 'Đăng Ký',
      dataIndex: 'dangkys',
      key: 'dangkys',
      render: (dangkys) => (
        <ul>
          {dangkys.map((dangky) => (
            <li key={dangky.maDangKy}>
              Mã Đăng Ký: {dangky.maDangKy}, Ngày Kích Hoạt: {new Date(dangky.ngayKichHoat).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Doanh Thu',
      dataIndex: 'doanhThus',
      key: 'doanhThus',
      render: (doanhThus) => (
        <ul>
          {doanhThus.map((doanhThu) => (
            <li key={doanhThu.maDoanhThu}>
              Loại: {doanhThu.loaiThoiGianDoanhThu}, Số Tiền: {doanhThu.soTienDoanhThu.toLocaleString()} VND
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="maHoaDon" />;
};

export default TableInvoice;
