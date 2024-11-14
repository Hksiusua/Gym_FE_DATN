import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, Select } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select; 
const ModalPayMoney = ({ onhandleCreateCourses }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onhandleCreateCourses({
        ...values,
        ngayThanhToan: dayjs(values.ngayThanhToan).toISOString(), 
      });
      form.resetFields();
      setVisible(false); 
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm Thanh Toán
      </Button>
      <Modal
        title="Tạo Thanh Toán Mới"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Mã Hóa Đơn"
            name="maHoaDon"
            rules={[{ required: true, message: 'Vui lòng nhập mã hóa đơn!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày Thanh Toán"
            name="ngayThanhToan"
            rules={[{ required: true, message: 'Vui lòng chọn ngày thanh toán!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Số Tiền Thanh Toán"
            name="soTienThanhToan"
            rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Phương Thức Thanh Toán"
            name="phuongThucThanhToan"
            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
          >
            <Select placeholder="Chọn phương thức thanh toán">
              <Option value="thanhToanTienMat">Thanh toán bằng tiền mặt</Option>
              <Option value="thanhToanNgânHang">Thanh toán bằng ngân hàng</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Mô Tả Thanh Toán"
            name="moTaThanhToan"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalPayMoney;
