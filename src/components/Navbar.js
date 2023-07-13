import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  Button,
} from "react-bootstrap";
import "../components/components.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";

function NavbarComponents() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  function logout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        setIsLogin(false);
        navigate("/login");
        navigate(0);
      })
      .catch(() => {
        alert("Something went wrong");
      });
  }

  function handleLogin() {
    if (isLogin) {
      handleShow();
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <Navbar
        expand="lg"
        className=" navbar shadow bg-body-tertiary sticky-top"
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Shop Familly
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="navbar-menu" id="basic-navbar-nav">
            <Nav className="nav-title ">
              <Nav.Link as={NavLink} to="/deals">
                Today's Deals
              </Nav.Link>
              <Nav.Link as={NavLink} to="/">
                Gift Cards
              </Nav.Link>
            </Nav>
            <NavDropdown
              className="btn dropDown"
              title={isLogin ? "Logout" : "Login"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={NavLink} to="/Profile">
                My Account
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogin}>
                {isLogin ? "Logout" : "Login"}
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show && isLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarComponents;
