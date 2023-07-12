import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../components/components.css";
import { NavLink } from "react-router-dom";

function NavbarComponents() {
  return (
    <Navbar expand="lg" className=" navbar shadow bg-body-tertiary sticky-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Shop Bestiee
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="navbar-menu" d="basic-navbar-nav">
          <Nav className="nav-title ">
            <Nav.Link as={NavLink} to="/home">
              Shop Mall
            </Nav.Link>
            <Nav.Link as={NavLink} to="/">
              Trending Brands
            </Nav.Link>
          </Nav>
          <NavDropdown
            className="btn dropDown"
            title="Dropdown"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponents;
