import React, { useState, useEffect } from 'react';
import { Input, Button, DatePicker,message } from 'antd';
import "./index.scss";
import { getAllPayMoney,createPayMoney } from '../../../service/apiService';
import TablePayMoney from './component/table';
import ModalPayMoney from './component/modalPayMoney';


const { RangePicker } = DatePicker;
const PayMoney = () => {
  const [pay,setPay]=useState([]);

  const fetchDataPayMoney=async()=>{
    const response=await getAllPayMoney();
    setPay(response.data);
  }
  useEffect(()=>{
    fetchDataPayMoney();
  },[])

  const handleCreateCourses=async(data)=>{
    const response=await createPayMoney(data);
    if(response.status===200){
      fetchDataPayMoney();
      message.success("Tạo thành công !");
    }else{
      message.error("Tạo thất bại !");
    }
  }
  return (
    <div className="courses-page">
      <div className="list-discount">
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        </span>
        <ModalPayMoney onhandleCreateCourses={handleCreateCourses}/>
      </div>
      <div className="input-page">
        <Input
          placeholder="Tên khóa học"
        //   value={inputValue}
        //   onChange={handleInputChange}
          style={{ width: "100%" }}
        />
        <RangePicker
        //   onChange={handleDateChange}
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
    </div>
  );
};

export default PayMoney;
