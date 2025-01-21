import { useState, useEffect, useRef } from 'react'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PiUserCircleLight } from "react-icons/pi";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './ProfileButton.css'; // Add this for custom styling

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevents menu from closing when clicking inside
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const handleManageSpots = () => {
    navigate('/spots/current'); // Navigate to user's spots page
    closeMenu();
  };

  return (
    <div className="profile-button-container">
      <button onClick={toggleMenu} className="profile-icon-btn">
        <PiUserCircleLight size={30} />
      </button>
      <ul className={`profile-dropdown ${showMenu ? "" : "hidden"}`} ref={ulRef}>
        {user ? (
          <>
            <li className="user-info">Hello, {user.firstName}</li>
            <li className="user-info">{user.email}</li>
            <li>
  <button
    className="manage-spots-btn"
    onClick={() => {
      closeMenu();
      navigate("/manage-spots");
    }}
  >
    Manage Spots
  </button>
</li>

            <li>
              <button className="logout-btn" onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
