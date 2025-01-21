import { NavLink } from 'react-router-dom';
import './CreateSpotLink.css';

function CreateSpotLink() {
  return (
    <NavLink to="/spots/new" className="create-spot-link">
      Create a New Spot
    </NavLink>
  );
}

export default CreateSpotLink;
