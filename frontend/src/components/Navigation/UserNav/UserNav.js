import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { RiUserFill } from 'react-icons/ri';
import './UserNav.scss';
// import { SidebarData } from './SidebarData';


const UserNav = ({onLogoutClick}) => {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const currentUser = useSelector(state => state.currentUser)

  return (
    <>
      <p className="nav-link user-name" >{currentUser.user.name}</p>
      <div className="icon">
        <RiUserFill />
      </div>
      <div className="hamburger">
        {!sidebar ? <AiOutlineMenu onClick={showSidebar} /> : <AiOutlineClose onClick={showSidebar}/>}
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className="nav-text">
            <a
              href="vmi"
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

export default UserNav
