import React, { useEffect, useState } from "react";
import { getAllMember,createRegisterAndMember } from '../../../../service/apiService';
import TableMembers from "./component/table";
import { message } from "antd";
import ModalMember from "./component/modalMembers";
 
const Members = () => {
  const [member,setMembers]=useState([]);
  
  const fetchDataMembers=async()=>{
    try {
      const response=await getAllMember();
      setMembers(response.data.content);
      message.success("Lấy dữ liệu thành công")
    } catch (error) {
      message.error("Lấy dữ liệu thất bại")
    }
  }
  
     useEffect(( )=>{    
    fetchDataMembers();
  },[])

  const handleCreateMember=async(maGoiTap, data)=>{
    try {
      const response=await createRegisterAndMember(maGoiTap,data);
      fetchDataMembers();
      message.success("Tạo thành công thành viên");
    } catch (error) {
      message.error("Tạo thất bại thành viên");
    }
  }
  return (
    <div className="courses-page">
      <div className="list-discount">
        <ModalMember onCreateMember={handleCreateMember} />
      </div>
      <div className="table-container">
        <TableMembers onMembers={member}/>
      </div>
    </div>
  );
};

export default Members;
