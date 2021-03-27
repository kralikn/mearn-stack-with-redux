import { useSelector } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminNav from './AdminNav/AdminNav';
import UserNav from './UserNav/UserNav';
import setAuthToken from '../../utils/setAuthToken'

const Navigation = () => {

  const currentUser = useSelector(state => state.currentUser)
	const { isAuthenticated } = currentUser
	const { isAdmin } = currentUser.user

  const onLogoutClick = (e) => {

    e.preventDefault();

    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);

    window.location.href = '/login';

  }

  const authLinks = (
    <Nav className="ml-auto">
      {isAdmin ? <AdminNav onLogoutClick={onLogoutClick}/> : <UserNav onLogoutClick={onLogoutClick}/>}
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <Link to='/login' className="nav-link">Belépés</Link>
      <Link to='/register' className="nav-link">Regisztráció</Link>
    </Nav>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to='/' className="navbar-brand">PéldaTárház</Link>
        {isAuthenticated ? authLinks : guestLinks}
      </Container>
    </Navbar>
  )
}

export default Navigation
