import './Landing.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'


const Landing = (props) => {

  const auth = useSelector(state => state.currentUser.isAuthenticated)
  if(auth){
    props.history.push('/dashboard/user')
  };
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Üdvözlünk a PéldaTárház oldalán</h1>
        <p>Regisztrált felhasználóink számára bejelentkezés után érhető el az online számviteli példatárunk</p>
        <div className="landing-btn-group">
          <Link to='/login' className="btn btn-info">Belépés</Link>
          <Link to='/register' className="btn btn-outline-info">Regisztráció</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
