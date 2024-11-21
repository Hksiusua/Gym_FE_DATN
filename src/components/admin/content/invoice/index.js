import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, DatePicker, message } from 'antd';
import { getAllInVoice, createRegisterWithDiscount, createRegistrationBill } from '../../../service/apiService';
import TableInvoice from './component/table';

const Invoice = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const [activationDate, setActivationDate] = useState('');
  const [memberId, setMemberId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [classId, setClassId] = useState('');
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceDetails, setInvoiceDetails] = useState({
    maDangKy: '',
    ngayDangKy: '',
  });

  useEffect(() => {
    fetchDataInvoice();
  }, []);

  const fetchDataInvoice = async () => {
    try {
      const response = await getAllInVoice();
      if (response.data.data) {
        setInvoiceData(response.data.data);
        message.success('Lấy dữ liệu thành công');
      }
    } catch (error) {
      message.error('Không thể lấy dữ liệu hóa đơn');
    }
  };

  const handleCreateInvoice = async () => {
    if (!memberId || !packageId || !classId || !activationDate) {
      message.warning('Vui lòng nhập đầy đủ thông tin trước khi đăng ký!');
      return;
    }

    const params = {
      maThanhVien: memberId,
      maGoiUuDai: packageId,
      maLopHoc: classId,
      ngayKichHoat: activationDate,
      trangThaiDangKy: true,
    };

    try {
      const response = await createRegisterWithDiscount(params);
      if (response.data) {
        message.success('Đăng ký thành công');
        fetchDataInvoice();
        setModalVisible(false); 
      }
    } catch (error) {
      message.error('Đăng ký thất bại');
    }
  };

  const handleCreateRegistrationBill = async () => {
    if (!invoiceDetails.maDangKy || !invoiceDetails.ngayDangKy) {
      message.warning('Vui lòng nhập đầy đủ thông tin hóa đơn!');
      return;
    }

    const params = {
      ...invoiceDetails,
    };

    try {
      const response = await createRegistrationBill(params);
      if (response.data) {
        message.success('Hóa đơn được tạo thành công');
        fetchDataInvoice(); // Cập nhật danh sách hóa đơn
        setInvoiceModalVisible(false); // Đóng modal
      }
    } catch (error) {
      message.error('Tạo hóa đơn thất bại');
    }
  };

  return (
    <div className="courses-page">
      <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: '20px' }}>
        Đăng ký gói ưu đãi
      </Button>
      <Button type="primary" onClick={() => setInvoiceModalVisible(true)} style={{ marginBottom: '20px', marginLeft: '10px' }}>
        Tạo hóa đơn
      </Button>

      {/* Modal đăng ký gói ưu đãi */}
      <Modal
        title="Đăng ký gói ưu đãi"
        visible={modalVisible}
        onOk={handleCreateInvoice}
        onCancel={() => setModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Input
          placeholder="Nhập mã thành viên"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <Input
          placeholder="Nhập mã gói ưu đãi"
          value={packageId}
          onChange={(e) => setPackageId(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <Input
          placeholder="Nhập mã lớp học"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <DatePicker
          onChange={(date, dateString) => setActivationDate(dateString)}
          style={{ width: '100%' }}
          placeholder="Ngày kích hoạt"
        />
      </Modal>

      <Modal
        title="Tạo hóa đơn"
        visible={invoiceModalVisible}
        onOk={handleCreateRegistrationBill}
        onCancel={() => setInvoiceModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Input
          placeholder="Nhập mã đăng ký"
          value={invoiceDetails.maDangKy}
          onChange={(e) => setInvoiceDetails({ ...invoiceDetails, maDangKy: e.target.value })}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <DatePicker
          onChange={(date, dateString) => setInvoiceDetails({ ...invoiceDetails, ngayDangKy: dateString })}
          style={{ width: '100%' }}
          placeholder="Ngày đăng ký"
        />
      </Modal>

      <div className="table-container">
        <TableInvoice data={invoiceData} />
      </div>
    </div>
  );
};

export default Invoice;
