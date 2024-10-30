import { instance } from "../utils/axiosCustomize";

const getAllClassCourses=()=>{
 return instance.get('api-public/lophoc/getAllLopHoc');
}

const deleteClassCourses=(maLopHoc)=>{
  return instance.delete(`api-public/lophoc/delete/${maLopHoc}`);
}

const createClassCourses=(data)=>{
  return instance.post(`api-public/lophoc/add`,data);
}

const updateClassCouses=async(id, data)=>{
  return await instance.put(`api-public/lophoc/update/${id}`,data)
}

const getHistoriesTranning=async(id)=>{
  return await instance.get(`api-public/lichsutapluyen/thanhvien/${id}`)
}

const searchDiscount=(maUuDai,ngayBatDau,ngayKetThuc,trangThai)=>{
  return instance.get(`api-public/uu-dais/search`,{
    params:{
      maUuDai: maUuDai,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc,
      trangThaiUuDai: trangThai,
    }
  })
}
const createDiscount=(data)=>{
  return instance.post(`api-public/uu-dais`,data);
}

const postLoginMember=(tenThanhVien,matKhauNguoiDung)=>{
  return instance.post(`member/login`,{tenThanhVien,matKhauNguoiDung});
}

const postLoginUser = (tenNguoiDung, matKhauNguoiDung) => {
  return instance.post(`user/login`, { tenNguoiDung, matKhauNguoiDung });
};

const getDiscounts = () => {
  return instance.get('api-public/uu-dais'); 
};

const deleteDiscount = (id) => {
  return instance.delete(`api-public/uu-dais/${id}`);
};

const updateDiscount = (id, discountData) => {
  return instance.put(`api-public/uu-dais/${id}`, discountData);
};

const createUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("image", image);
  return instance.post("api/v1/participant", data); 
};

const showAllUser = () => {
  return instance.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("image", image);
  return instance.put("api/v1/participant", data);
};

const deleteUser = (userId) => {
  return instance.delete("api/v1/participant", { data: { id: userId } }); 
};

const getUserWithPaginate = (page, limit) => {
  return instance.get(`api/v1/participant?page=${page}&limit=${limit}`); 
};


const postRegisterUser = (email, username, password) => {
  return instance.post(`api/v1/register`, { email, username, password });
};

const getQuizByUser = () => {
  return instance.get("api/v1/quiz-by-participant");
};
const getDataQuestion = (id) => {
  return instance.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postFinishQuiz = (data) => {
  return instance.post(`api/v1/quiz-submit`, { ...data });
};

export {
  createUser,
  showAllUser,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLoginUser,
  postRegisterUser,
  getQuizByUser,
  getDataQuestion,
  postFinishQuiz,
  getDiscounts,
  deleteDiscount,
  updateDiscount,
  createDiscount,
  searchDiscount,
  postLoginMember,
  getAllClassCourses,
  createClassCourses,
  updateClassCouses,
  deleteClassCourses,
  getHistoriesTranning
};
