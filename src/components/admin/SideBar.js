import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"; 
import { FormOutlined, FileSearchOutlined, FileOutlined, SolutionOutlined } from "@ant-design/icons";
import "./SideBar.scss";
import "./Admin.scss";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true); 
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isManagerActive = location.pathname.startsWith("/admins/managers");
  return (
    <div
      className="admin-sidebar"
      style={{ display: "flex", height: "100vh", position: "relative" }}
    >
      <Sidebar collapsed={collapsed} className={`sideBar-content ${collapsed ? 'collapsed' : ''}`}>
        <Menu>
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
          <MenuItem className={`ps-menu-button ${isActive("/admins/histories-traning") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/histories-traning" className="nav-link">
              <SolutionOutlined className="copy-icon" />  {!collapsed && "Lịch sử tập luyện"}
            </Link>
          </MenuItem>
          <MenuItem className={`ps-menu-button ${isActive("/admins/invoice") ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}>
            <Link to="/admins/invoice" className="nav-link">
              <SolutionOutlined className="copy-icon" />  {!collapsed && "Hóa đơn"}
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
