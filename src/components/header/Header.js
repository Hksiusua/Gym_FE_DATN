import React, { useState } from "react";
import { Layout, Menu, Dropdown, Button, Modal } from "antd";
import { NavLink } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import './Header.scss';
import { useSelector, useDispatch } from 'react-redux'; 
import { doLogout } from '../../store/userSlice'; 

const { Header } = Layout;

function BasicExample() {
  const dispatch = useDispatch(); 
  const { isAuthenticated, user } = useSelector((state) => state.user || {});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showLogoutConfirm = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(doLogout()); 
  };

  const handleCancel = () => {
    setIsModalVisible(false);  
  };

  const menu = (
    <Menu style={{ backgroundColor: '#DBA82B', border: '1px solid black' }}>
      <Menu.Item key="1">
        <NavLink to="/home" onClick={showLogoutConfirm} style={{ textDecoration: 'none' }}>
          <span style={{ color: 'white' }}>Đăng xuất</span>
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo">
          <NavLink to="/home" className="nav-brand">
            Crafters
          </NavLink>
        </div>

        <div className="menu-container" style={{ flex: 1 }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <NavLink to="/home" className="nav-link">
                Trang chủ
              </NavLink>
            </Menu.Item>
            {isAuthenticated && (
              <Menu.Item key="2">
                <NavLink to="/admins" className="nav-link">
                  Admin
                </NavLink>
              </Menu.Item>
             )} 
            <Menu.Item key="3">
              <NavLink to="/services-page" className="nav-link">
                Dịch vụ
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/users" className="nav-link">
                Giới thiệu
              </NavLink>
            </Menu.Item>
          </Menu>
        </div>

        <div className="auth-section">
          {!isAuthenticated ? (
            <>
              <Button style={{ marginRight: '5%', backgroundColor:'orange', color:'white', border: '1px solid black'}}>
                <NavLink to="/logins" className="nav-link">
                  Đăng nhập
                </NavLink>
              </Button>
              {/* <Button style={{ backgroundColor:'orange',color:'white',border: '1px solid black'}}>
                <NavLink to="/registers" className="nav-link">
                  Sign up
                </NavLink>
              </Button> */}
            </>
          ) : (
            <Dropdown overlay={menu}>
              <Button style={{ backgroundColor:'orange',color:'white',border: '1px solid black'}}>
                {user?.username} <DownOutlined />
              </Button>
            </Dropdown>
          )}
        </div>
      </Header>
      <Modal
        title="Xác nhận đăng xuất"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
      </Modal>
    </Layout>
  );
}

export default BasicExample;
