import React, { useState, useEffect } from 'react';
import { Input, Button, DatePicker, message } from 'antd';
import ModalInvoice from '../discount/component/modalInvoice';
import TableDiscount from './component/table'; 
import { createDiscount, getDiscounts } from '../../../service/apiService';
import { useLoading } from '../../../../loadingContext';
import "./index.scss";

const { RangePicker } = DatePicker;

const Discounts = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [tongUuDai, setTongUuDai] = useState(0);
  const { setLoading } = useLoading(); 

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const response = await getDiscounts();
      setDiscounts(response.data);
      setTongUuDai(response.data[0].tongUuDai);
    } catch (error) {
      message.error("Lấy dữ liệu thất bại!");
    } finally {
      setLoading(false); 
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
  };

  const handleCreateDiscount = async (discountData) => {
    setLoading(true); 
    try {
      const response = await createDiscount(discountData);
      message.success("Tạo dữ liệu thành công");
      fetchDiscounts();
    } catch (error) {
      message.error("Tạo dữ liệu thất bại");
    } finally {
      setLoading(false); 
    }
  }

  console.log("discounts", discounts);
  return (
    <div className="courses-page">
      <div className="list-discount">
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Danh sách ưu đãi ({tongUuDai})
        </span> 
        <ModalInvoice onCreateDiscount={handleCreateDiscount} />
      </div>
      <div className="input-page">
        <Input
          placeholder="Tên khóa học"
          value={inputValue}
          onChange={handleInputChange}
          style={{ width: "100%" }}
        />
        <RangePicker
          onChange={handleDateChange}
          style={{ width: "100%" }}
          placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
        />
        <Button type="primary" style={{ width: '100%' }}>
          Tìm kiếm
        </Button>
      </div>
      <div className="table-container">
        <TableDiscount discounts={discounts} onFetchDiscounts={fetchDiscounts} />
      </div>
    </div>
  );
};

export default Discounts;
