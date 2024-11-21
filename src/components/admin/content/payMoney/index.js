import React, { useState, useEffect } from 'react';
import { Input, Button, DatePicker, message } from 'antd';
import "./index.scss";
import { getAllPayMoney, createPayMoney } from '../../../service/apiService';
import TablePayMoney from './component/table';
import ModalPayMoney from './component/modalPayMoney';
import dayjs from 'dayjs';
import axios from 'axios';

const { RangePicker } = DatePicker;

const PayMoney = () => {
  const [pay, setPay] = useState([]);
  const [recentPayment, setRecentPayment] = useState(null); // Lưu thông tin thanh toán gần đây nhất
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút (600 giây)
  const [isPaymentVerified, setIsPaymentVerified] = useState(false); // Trạng thái xác nhận thanh toán

  const fetchDataPayMoney = async () => {
    try {
      const response = await getAllPayMoney();
      setPay(response.data);
    } catch (error) {
      message.error("Không thể tải dữ liệu thanh toán!");
    }
  };

  useEffect(() => {
    fetchDataPayMoney();
  }, []);

  const handleCreateCourses = async (data) => {
    try {
      const response = await createPayMoney(data);
      if (response.status === 200) {
        setRecentPayment(response.data); 
        setTimeLeft(600); 
        setIsPaymentVerified(false); 
        fetchDataPayMoney();
        message.success("Tạo thành công!");
      }
    } catch (error) {
      message.error("Tạo thất bại!");
    }
  };

  // Logic đếm ngược thời gian 10 phút
  useEffect(() => {
    if (recentPayment && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [recentPayment, timeLeft]);

  const verifyPayment = async () => {
    try {
      const response = await axios.get(
        'https://script.googleusercontent.com/macros/echo?user_content_key=J77nSF67wgM9mstzB24t34fEIMfLsmP-UATYurG-xGn8R6h7NuyvbJkx9_LpE7w2Gk0ooDLUsLSc19ldPC97V5bt2zP9TcKZm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCjpwihNlyuC_-cQhNZGk94Tm74-8VZg4l65wcPwQeaJaTysQgZkaACxdY9KX4yggRS-LDWoVjXrPdRmjdPwa11V3lZrMFFvig&lib=MlmhXnCQl8Ca63X7oKqUPJTOZrByLPA1_'
      );
      const paymentData = response.data.data;
  
      const matchPayment = paymentData.some(
        (item) => item["Giá trị"] === recentPayment.soTienThanhToan
      );
  
      if (matchPayment) {
        setIsPaymentVerified(true);
        message.success("Thanh toán thành công!");
        setRecentPayment(null); 
      } else {
        message.error("Thông tin thanh toán không khớp!");
      }
    } catch (error) {
      message.error("Lỗi khi xác minh thanh toán!");
    }
  };
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="courses-page">
      <div className="list-discount">
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        </span>
        <ModalPayMoney onhandleCreateCourses={handleCreateCourses} />
      </div>
      <div className="input-page">
        <Input
          placeholder="Tên khóa học"
          style={{ width: "100%" }}
        />
        <RangePicker
          style={{ width: "100%" }}
          placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
        />
        <Button type="primary" style={{ width: '100%' }}>
          Tìm kiếm
        </Button>
      </div>
      <div className="table-container">
        <TablePayMoney onPay={pay} />
      </div>
      {recentPayment && timeLeft > 0 && !isPaymentVerified && (
        <div className="qr-code-container" style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Mã QR cho thanh toán (hết hạn sau {formatTime(timeLeft)})</h3>
          <img
            src={`https://img.vietqr.io/image/MB-0522488774-compact.png?amount=${recentPayment.soTienThanhToan}&addInfo=${encodeURIComponent(recentPayment.moTaThanhToan)}&accountName=Nguyen%20Van%20A`}
            alt="QR Code"
            style={{ width: 200, height: 200 }}
          />
          <Button type="primary" onClick={verifyPayment} style={{ marginTop: '10px' }}>
            Xác nhận thanh toán
          </Button>
        </div>
      )}
    </div>
  );
};

export default PayMoney;

