import axios from "axios";
import store from "../../store/index";  // Import Redux store

// Tạo một instance của axios với baseURL
const instance = axios.create({
  baseURL: "http://localhost:8085/",
});

// Interceptor để thêm token từ Redux Toolkit store vào mỗi request
instance.interceptors.request.use(
  (config) => {
    const state = store.getState();  // Lấy trạng thái từ Redux Toolkit store
    if (state && state.user && state.user.account) {
      const access_token = state.user.account.access_token;  // Truy xuất token từ Redux Toolkit store
      if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`;  // Thêm token vào headers của request
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance };
