import React from "react";
import { Layout, Menu, Dropdown, Button } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import './Header.scss';

const { Header } = Layout;

function BasicExample() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <NavLink to="/logout">Logout</NavLink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <NavLink to="/language">Language</NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout >
      <Header className="header">
        <div className="logo">
          <NavLink to="/home" className="nav-brand">
            Crafters
          </NavLink>
        </div>
        <div className="scroll-item">
            <div className="menu-container">
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <NavLink to="/home" className="nav-link">
                    Home
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <NavLink to="/admins" className="nav-link">
                    Admin
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/users" className="nav-link">
                    User
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                  <NavLink to="/users" className="nav-link">
                    User
                  </NavLink>
                </Menu.Item>
             </Menu>
            </div>
        </div>

          <div className="auth-section">
          {!isAuthenticated ? (
            <>
              <Button  style={{ marginRight: '5%' }}>
                <NavLink to="/logins" className="nav-link">
                  Login
                </NavLink>
              </Button>
              <Button>
                <NavLink to="/registers" className="nav-link">
                  Sign up
                </NavLink>
              </Button>
            </>
          ) : (
            <Dropdown overlay={menu}>
              <Button>
                {account.username} <DownOutlined />
              </Button>
            </Dropdown>
          )}
          </div>
        
        
      </Header>
    </Layout>
  );
}

export default BasicExample;
