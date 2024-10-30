import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import User from "./components/user/User";
import Admin from "./components/admin/Admin";
import HomePage from "./components/home/HomePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServicePage from "./components/service-page";
import DashBoard from "./components/admin/content/DashBoard";
import PackageCourses from "./components/admin/content/packageCourses";
import ClassCourses from "./components/admin/content/classCourses";
import News from "./components/admin/content/news";
import Discounts from "./components/admin/content/discount";
import Managers from "./components/admin/content/managers";
import Employees from "./components/admin/content/managers/employees";
import Customers from "./components/admin/content/managers/customers";
import HistoriesTranning from "./components/histories-tranning";
import Invoice from "./components/admin/content/invoice";
import ProtectedRoute from "./components/protected-router";
import { LoadingProvider, useLoading } from "./loadingContext";
import LoginMember from "./components/Auth/login-member";
import HistoriesMember from "./components/histories-tranningMember";

const LoadingTransition = () => {
  const { setLoading } = useLoading();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname !== "admin/logins") {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [location, setLoading]);

  return null;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <LoadingProvider>
      <BrowserRouter>
        {/* <LoadingTransition /> */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/" element={<App />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/users" element={<User />} />
            <Route path="/services-page" element={<ServicePage />} />
            <Route path="/histories/member" element={<HistoriesMember/>}/>
          </Route>
          <Route path="/admins" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
            <Route index element={<ClassCourses />} />
            <Route path="class-courses" element={<ClassCourses />} />
            <Route path="package-courses" element={<PackageCourses />} />
            <Route path="news" element={<News />} />
            <Route path="discounts" element={<Discounts />} />
            <Route path="histories-traning" element={<HistoriesTranning />} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="managers" element={<Managers />} >
              <Route path="employees" element={<Employees />} />
              <Route path="customers" element={<Customers />} />
            </Route>
          </Route>
          <Route path="admin/logins" element={<Login />} />
          <Route path="/member/logins" element={<LoginMember/>}/>
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
    </LoadingProvider>
  </Provider>
);

reportWebVitals();
