import axios from "axios";
import { store } from "../../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    if (state && state.user && state.user.account) {
      const access_token = state?.user?.account?.access_token;
      if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
    }
    // console.log("store getState", state);
    // console.log("Request headers:", config.headers); // Log headers for debugging
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance };
