import React, { useState, useEffect } from 'react';
import { Input, Button, DatePicker,message } from 'antd';
import "./index.scss";
import { getAllClassCourses, createClassCourses,updateClassCouses,deleteClassCourses } from '../../../service/apiService';
import TableCourses from "./component/table";
import ModalClassCourses from './component/modalClassCourses';

const { RangePicker } = DatePicker;
const ClassCourses = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [courses, setCourses] = useState([]);
  const [messages,setMessages]=useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
     try {
      const response = await getAllClassCourses();
      setMessages(response.data.messages);
      setCourses(response?.data?.data);
     } catch (error) {
      message.error("Lấy dữ liệu thất bại")
     }
  };
  const handleCreateCourses = async (data) => {
    try {
      const response = await createClassCourses(data);
      if (response?.status === 200) { 
        message.success("Tạo lớp học thành công!");
        fetchCourses(); 
      } else {
        message.error("Không thể tạo lớp học, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo lớp học:", error);
      message.error("Có lỗi xảy ra khi tạo lớp học.");
    }
  };
  const handleUpdateCourses = async (updatedCourse) => {
    try {
      const response = await updateClassCouses(updatedCourse.maLopHoc, updatedCourse);
      if (response?.status === 200) {
        message.success("Cập nhật thành công!");
          setCourses((prevCourses) => 
          prevCourses.map((course) => 
          course.maLopHoc === updatedCourse.maLopHoc ? { ...course, ...updatedCourse } : course
          )
        );
      } else {
        message.error("Không thể cập nhật lớp học, vui lòng thử lại.");
      }
    } catch (error) {
      message.error("Cập nhật thất bại!");
      console.error("Lỗi khi cập nhật lớp học:", error);
    }
  };
  const handleDeleteCourses = async (maLopHocs) => {
    try {
      for (const maLopHoc of maLopHocs) {
        const response = await deleteClassCourses(maLopHoc);
        if (response?.status === 200) {
          message.success(`Xóa lớp học với mã ${maLopHoc} thành công!`);
        } else {
          message.error(`Không thể xóa lớp học với mã ${maLopHoc}, vui lòng thử lại.`);
        }
      }
            setCourses((prevCourses) => 
        prevCourses.filter(course => !maLopHocs.includes(course.maLopHoc))
      );
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa lớp học.");
      console.error("Lỗi khi xóa lớp học:", error);
    }
  };
  
  
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
      <div className="list-discount">
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
           {messages && <div>{messages}</div>}
        </span>
        <ModalClassCourses onCreateCourse={handleCreateCourses}/>
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
        <Button type="primary" onClick={handleSubmit} style={{ width: '100%' }}>
          Tìm kiếm
        </Button>
       
      </div>
      <div className="table-container">
        <TableCourses courses={courses} onHandleUpdateCourses={handleUpdateCourses} onHandleDeleteCourses={handleDeleteCourses}/>
      </div>
    </div>
  );
};

export default ClassCourses;
