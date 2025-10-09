import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">@nvminh162</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <NavDropdown
                style={{ marginLeft: "50px" }}
                title={`(${users.length}) Users`}
                id="basic-nav-dropdown"
              >
                {users &&
                  users.length > 0 &&
                  users.map((user, index) => (
                    <NavDropdown.Item key={`user-${index}`}>{user.username}</NavDropdown.Item>
                  ))}
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
