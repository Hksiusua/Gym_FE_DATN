import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom"; 
import "./SideBar.scss";
import "./Admin.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"; 
import { CopyOutlined, FormOutlined, FileSearchOutlined, FileOutlined, SolutionOutlined } from "@ant-design/icons";
import { useState } from "react";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Kiểm tra xem đường dẫn hiện tại có khớp với đường dẫn cần active không
  const isActive = (path) => location.pathname === path;

  // Kiểm tra nếu người dùng đang ở trong "/admins/managers", bao gồm cả employees và customers
  const isManagerActive = location.pathname.startsWith("/admins/managers");

  return (
    <div
      className="admin-sidebar"
      style={{ display: "flex", height: "100vh", position: "relative" }}
    >
      <Sidebar collapsed={collapsed} className={`sideBar-content ${collapsed ? 'collapsed' : ''}`}>
        <Menu>
          <MenuItem className={`ps-menu-button ${isActive("/admins") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins" className="nav-link">
              DashBoard
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isActive("/admins/courses") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/courses" className="nav-link">
              <FormOutlined className="copy-icon" />  {!collapsed && "Khóa học"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isActive("/admins/news") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/news" className="nav-link">
              <FileSearchOutlined className="copy-icon" />  {!collapsed && "Tin tức"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isActive("/admins/discounts") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/discounts" className="nav-link">
              <FileOutlined className="copy-icon" />  {!collapsed && "Khuyến mãi"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isManagerActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/managers/employees" className="nav-link">
              <SolutionOutlined className="copy-icon" />  {!collapsed && "Quản lí"}
            </Link>
          </MenuItem>
        </Menu>
      </Sidebar>
      <main className="button-content">
        <div>
          <button
            className="sb-button"
            onClick={() => setCollapsed(!collapsed)} 
          >
            <FontAwesomeIcon
              icon={collapsed ? faCircleChevronRight : faCircleChevronLeft}
              className="fa-solid"
            />
          </button>
        </div>
      </main>
    </div>
  );
};

export default SideBar;
