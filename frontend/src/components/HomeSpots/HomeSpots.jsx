import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { fetchSpots } from '../../store/spots'; // Import the fetchSpots action
import './HomeSpots.css'; // CSS for styling the new layout

function HomeSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router navigation hook

  const spotsArray = useSelector((state) => state.spots.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const handleSpotClick = (id) => {
    navigate(`/spots/${id}`); // Navigate to the spot details page
  };

  return (
    <div className="spots-page">
      <h2>Available Spots: {spotsArray.length}</h2>
      {spotsArray.length > 0 ? (
        <div className="spots-container">
          {spotsArray.map((spot) => (
            <div
              key={spot.id}
              className="spot-card"
              onClick={() => handleSpotClick(spot.id)} // Add click handler
              style={{ cursor: 'pointer' }} // Add pointer cursor for visual feedback
            >
              <div className="spot-image">
                <img
                  src={
                    spot.previewImage ||
                    'https://rapidapi.com/blog/wp-content/uploads/2018/10/architecture-1836070_640.jpg'
                  }
                  alt={spot.name}
                />
                <div className="spot-name-overlay">{spot.name}</div> {/* Overlay Name */}
              </div>
              <div className="spot-info">
                <div className="spot-location">{spot.city}, {spot.state}</div>
                <div className="spot-rating-price">
                <div className="spot-rating">
                  <span className="star-icon">★</span>
                  <span>{spot.avgRating || "No ratings yet"}</span>
               </div>
                  <div className="spot-price">
                    ${spot.price} <span className="night">/ night</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No spots available.</p>
      )}
    </div>
  );
}

export default HomeSpots;
