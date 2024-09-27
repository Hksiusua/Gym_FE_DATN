// import axios from "axios";
import { instance } from "../utils/axiosCustomize";

const createUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("image", image);
  return instance.post("api/v1/participant", data); // this is data is take data so add
};

const showAllUser = () => {
  return instance.get("api/v1/participant/all"); // this is data is take data so add
};

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("image", image);
  return instance.put("api/v1/participant", data); // this is data is take data so add
};

const deleteUser = (userId) => {
  return instance.delete("api/v1/participant", { data: { id: userId } }); // this is data is take data so add
};

const getUserWithPaginate = (page, limit) => {
  return instance.get(`api/v1/participant?page=${page}&limit=${limit}`); // this is data is take data so add
};

const postLoginUser = (email, password) => {
  return instance.post(`api/v1/login`, { email, password });
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
};
