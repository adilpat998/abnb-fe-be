import { NavLink } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpotLink from './CreateSpotLink'; // Import the new link component
import './Navigation.css';
import homeIcon from '../../images/home.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="navbar">
       <div className="navbar-left">
        <NavLink to="/" className="navbar-link">
          <img src={homeIcon} alt="Home" className="navbar-home-icon" />
        </NavLink>
      </div>

      <div className="navbar-right">
        {isLoaded && sessionUser && <CreateSpotLink />}  {/* Show only when logged in */}
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </nav>
  );
}

export default Navigation;
