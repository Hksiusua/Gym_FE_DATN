import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";  import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import User from "./components/user/User";
import Admin from "./components/admin/Admin";
import HomePage from "./components/home/HomePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServicePage from "./components/service-page";
import DashBoard from "./components/admin/content/DashBoard"
import Courses from "./components/admin/content/courses";
import News from "./components/admin/content/news";
import Discounts from "./components/admin/content/discount";
import Managers from "./components/admin/content/managers";
import Employees from "./components/admin/content/managers/employees";
import Customers from "./components/admin/content/managers/customers";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/" element={<App />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/users" element={<User />} />
          <Route path="/services-page" element={<ServicePage />} />
        </Route>
        <Route path="/admins" element={<Admin />}>
             <Route index element={<DashBoard />} />
             <Route path="courses" element={<Courses />} />
             <Route path="news" element={<News />} />
             <Route path="discounts" element={<Discounts />} />
             <Route path="managers" element={<Managers />}>
               <Route path="employees" element={<Employees />} />
               <Route path="customers" element={<Customers />} />
             </Route>
           </Route>
        <Route path="/logins" element={<Login />} />
        <Route path="/registers" element={<Register />} />
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
  </Provider>
);

reportWebVitals();
