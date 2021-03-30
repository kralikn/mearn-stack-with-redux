import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchTopics } from '../../../redux';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { RiAdminFill } from 'react-icons/ri';
import './AdminNav.scss';


const AdminNav = ({onLogoutClick}) => {

  const dispatch = useDispatch()

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const currentUser = useSelector(state => state.currentUser)

  return (
    <>
      <p className="nav-link user-name" >{currentUser.user.name}</p>
      <div className="icon">
        <RiAdminFill />
      </div>
      <div className="hamburger">
        {!sidebar ? <AiOutlineMenu onClick={showSidebar} /> : <AiOutlineClose onClick={showSidebar}/>}
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className="nav-text">
            <Link
              to='/dashboard/admin/excercises'
              className="nav-link"
              onClick={() => dispatch(fetchTopics())}
            >
              Példatár
            </Link>
          </li>
          <li className="nav-text">
            <Link to='/dashboard/admin/users' className="nav-link">Felhasználók</Link>
          </li>
          <li className="nav-text">
            <a
              href="."
              onClick={onLogoutClick}
            >
              <span>Kilépés</span>          
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default AdminNav
