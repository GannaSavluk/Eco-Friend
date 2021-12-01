import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const Header = () => {
  const userId = useSelector((store) => store.auth.user?.id);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Eco Friend</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/">Map</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/blog">Blog</Link>
            </Nav.Link>
          </Nav>
          <Nav>
            {!userId && (
              <Nav.Link>
                <Link to="/signup">Signup</Link>
              </Nav.Link>
            )}
            {!userId && (
              <Nav.Link>
                <Link to="/signin">Signin</Link>
              </Nav.Link>
            )}
            {userId && (
              <NavDropdown title="Username" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/account">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/logout">Logout</Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
