import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { Card, message } from 'antd';

const Discounts = () => {
  const [data, setData] = useState('No result');
  const [employeeData, setEmployeeData] = useState(null);

  const handleScan = (result) => {
    if (result) {
      setData(result);
      fetchEmployeeInfo(result);  
    }
  };

  const handleError = (err) => {
    message.error("Lỗi khi quét mã QR: " + err);
  };
  const fetchEmployeeInfo = (qrCode) => {
    const dummyEmployee = {
      id: qrCode,
      name: 'Nguyễn Văn A',
      position: 'Developer',
    };
    setEmployeeData(dummyEmployee);
    message.success("Quét thành công! Nhân viên: " + dummyEmployee.name);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <Card title="Quét Mã QR Nhân Viên" style={{ maxWidth: 400, margin: "auto" }}>
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>Kết quả: {data}</p>
      {employeeData && (
        <div>
          <h3>Thông tin nhân viên:</h3>
          <p>Mã nhân viên: {employeeData.id}</p>
          <p>Họ tên: {employeeData.name}</p>
          <p>Chức vụ: {employeeData.position}</p>
        </div>
      )}
    </Card>
  );
};

export default Discounts;
