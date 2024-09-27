import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
// import store from "./redux/store";

import { store, persistor } from "./redux/store"; // Đảm bảo rằng đường dẫn tới store đúng

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/user/User";
import Admin from "./components/admin/Admin";
import HomePage from "./components/home/HomePage";
import Manager from "./components/admin/content/Manager";
import DashBoard from "./components/admin/content/DashBoard";
import Login from "./components/Auth/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";
import { PersistGate } from "redux-persist/integration/react";
import ListQuiz from "./components/user/ListQuizzUser";
import DetailQuiz from "./components/user/DetailQuiz";
// import NotFound from "./components/Error/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}></Route>
            <Route path="users" element={<ListQuiz />}></Route>
          </Route>

          <Route path="/quiz/:id" element={<DetailQuiz />}></Route>

          <Route path="/admins" element={<Admin />}>
            <Route index element={<DashBoard />}></Route>
            <Route path="manage-users" element={<Manager />}></Route>
          </Route>

          <Route path="/logins" element={<Login />}></Route>
          <Route path="/registers" element={<Register />}></Route>

          {/* <Route path="*" element={<NotFound />}></Route> */}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();
