// import React, { useState } from 'react';
// import QrScanner from 'react-qr-scanner';
// import { Card, message } from 'antd';

// const Discounts = () => {
//   const [data, setData] = useState('No result');
//   const [employeeData, setEmployeeData] = useState(null);

//   const handleScan = (result) => {
//     if (result) {
//       setData(result);
//       fetchEmployeeInfo(result);  
//     }
//   };

//   const handleError = (err) => {
//     message.error("Lỗi khi quét mã QR: " + err);
//   };
//   const fetchEmployeeInfo = (qrCode) => {
//     const dummyEmployee = {
//       id: qrCode,
//       name: 'Nguyễn Văn A',
//       position: 'Developer',
//     };
//     setEmployeeData(dummyEmployee);
//     message.success("Quét thành công! Nhân viên: " + dummyEmployee.name);
//   };

//   const previewStyle = {
//     height: 240,
//     width: 320,
//   };

//   return (
//     <Card title="Quét Mã QR Nhân Viên" style={{ maxWidth: 400, margin: "auto" }}>
//       <QrScanner
//         delay={300}
//         style={previewStyle}
//         onError={handleError}
//         onScan={handleScan}
//       />
//       <p>Kết quả: {data}</p>
//       {employeeData && (
//         <div>
//           <h3>Thông tin nhân viên:</h3>
//           <p>Mã nhân viên: {employeeData.id}</p>
//           <p>Họ tên: {employeeData.name}</p>
//           <p>Chức vụ: {employeeData.position}</p>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default Discounts;


import TableNew from "./component/table";
import React, { useState } from 'react';
import { Input, Button, DatePicker } from 'antd';
import ModalInvoice from '../discount/component/modalInvoice';

const { RangePicker } = DatePicker;

const Discounts = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);

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
        <ModalInvoice />
        </div>
        <div className="table-container">
        <TableNew/>       
        </div>
      </div>
      
    );
  };
  export default Discounts;


