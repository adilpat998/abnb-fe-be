import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import "./ManageSpots.css";

function ManageSpots() {
  const [spots, setSpots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await csrfFetch("/api/spots/current");
        if (response.ok) {
          const data = await response.json();
          setSpots(data.Spots || []);
        }
      } catch (error) {
        console.error("Failed to fetch spots:", error);
      }
    };

    fetchSpots();
  }, []);

  const handleDelete = async (spotId) => {
    if (window.confirm("Are you sure you want to delete this spot?")) {
      try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setSpots(spots.filter((spot) => spot.id !== spotId));
        }
      } catch (error) {
        console.error("Failed to delete spot:", error);
      }
    }
  };

  const handleUpdate = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };

  return (
    <div className="manage-spots-container">
      <h1>Manage Your Spots</h1>
      <button className="create-spot-btn" onClick={() => navigate("/spots/new")}>
        Create a New Spot
      </button>
      <div className="spots-grid">
        {spots.map((spot) => (
          <div key={spot.id} className="spot-card">
            <img
              src={spot.previewImage || "/default-placeholder.png"}
              alt={spot.name}
              className="spot-image"
            />
            <div className="spot-details">
              <p className="spot-location">
                {spot.city}, {spot.state}
              </p>
              <p className="spot-price">${spot.price.toFixed(2)} <span>night</span></p>
              <p className="spot-rating">
                {spot.avgRating ? `★ ${spot.avgRating.toFixed(1)}` : "★ New"}
              </p>
            </div>
            <div className="spot-actions">
              <button className="update-btn" onClick={() => handleUpdate(spot.id)}>
                Update
              </button>
              <button className="delete-btn" onClick={() => handleDelete(spot.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageSpots;
