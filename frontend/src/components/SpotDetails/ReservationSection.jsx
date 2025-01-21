import "./SpotDetails.css";

function ReservationSection({ spot, numReviews }) {
  return (
    <div className="description-host-reservation">
      {/* Left Side: Description */}
      <div className="description">
        <h3>Description</h3>
        <p>{spot.description}</p>
      </div>

      {/* Right Side: Hosted By and Reservation */}
      <div className="host-reservation">
        {/* Hosted By */}
        <div className="host-details">
          <h3>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
        </div>

        {/* Reservation Section */}
        <div className="reservation-section">
          <div className="price-and-reviews">
            <div className="price">
              ${spot.price} <span className="night">/ night</span>
            </div>
            <div className="review-info">
              {numReviews === 0 ? (
                <span className="new-badge">★ New</span>
              ) : (
                <span>
                  ★ {spot.avgStarRating?.toFixed(1)} ({numReviews} review{numReviews !== 1 ? "s" : ""})
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => alert("Feature Coming Soon...")}
            className="reserve-button"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationSection;
