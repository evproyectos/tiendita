import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import "./Navbar.css";

// Define the user structure
interface User {
  name: string; // Assuming `user` is a string, change this if it's different
}

function Navigationbar() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser<User>(); // Provide the user type to useAuthUser()

  const handleLogout = () => {
    signOut();
    navigate('/login');
    console.log('Logged out');
  };

  return (
    <Navbar expand="lg" sticky="top" className="bg-body-tertiary mt-5 p-3 navbar">
      <Container fluid>
        <Navbar.Brand href="#">Tiendita</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="">Productos</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex me-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          
          <Nav>
            <NavDropdown 
              title={auth?.name || 'User'} // Use optional chaining to avoid errors if auth is null
              id="userDropdown" 
              align="end" 
            >
              <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;
