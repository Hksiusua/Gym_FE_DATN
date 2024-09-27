import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Admin from "./components/admin/Admin";

const App = () => {
  return (
    <div>
      <div className="header-container">
        <Header/>
      </div>

      {/* <div className="main-container">
        <Admin />
      </div> */}
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
