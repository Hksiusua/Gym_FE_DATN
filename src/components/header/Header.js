import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.scss";

function BasicExample() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  console.log("checkkkk", account);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="nav-brand nav-link">
          NghiaDzai
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link fontText">
              Home
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <NavLink to="/logins" className="nav-link fontText">
                  Login
                </NavLink>
                <NavLink to="/registers" className="nav-link">
                  Sign up
                </NavLink>
              </>
            ) : (
              <NavDropdown title={account.username}>
                <div></div>
                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Language</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
