import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to='/' className="navbar-brand">PéldaTárház</Link>
        <Nav className="ml-auto">
          <Link to='/login' className="nav-link">Belépés</Link>
          <Link to='/register' className="nav-link">Regisztráció</Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation
