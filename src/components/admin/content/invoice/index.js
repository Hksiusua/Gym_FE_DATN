import TableNew from "../TableNew";
import React, { useEffect, useState } from 'react';
import { Input, Button, DatePicker, message } from 'antd';
import ModalCourses from '../modalCousres';
import { getAllInVoice } from '../../../service/apiService';

const { RangePicker } = DatePicker;
const Invoice = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [invoice,setInvoice]=useState([]);
 
  useEffect(()=>{
    fetchDataInvoice();
  },[])

  const fetchDataInvoice=async()=>{
    try {
      const response=await getAllInVoice();
      message.success("Lấy dữ liệu thành công")
      console.log(response);      
    } catch (error) {
    }
    
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dateStrings);
  };

  const handleSubmit = () => {
    if (selectedDates.length === 2) {
      alert(`Bạn đã nhập: ${inputValue}, Ngày bắt đầu: ${selectedDates[0]}, Ngày kết thúc: ${selectedDates[1]}`);
    } else {
      alert("Vui lòng chọn khoảng thời gian");
    }
  };
    return (
      <div className="courses-page">
        <div className="input-page">
        <Input
        placeholder="Tên khóa học"
        value={inputValue}
        onChange={handleInputChange}
        style={{ width: "100%"}}
        />
        <RangePicker
        onChange={handleDateChange}
        style={{ width: "100%"}}
        placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
        />
        <Button type="primary" onClick={handleSubmit} style={{width:'100%'}}>
        Tìm kiếm
        </Button>
        <ModalCourses />
        </div>
        <div className="table-container">
        <TableNew/>       
        </div>
      </div>
      
    );
  };
  export default Invoice;


