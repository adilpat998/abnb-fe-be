import "./SpotDetails.css";

function SpotInfo({ spot }) {
  return (
    <div>
      <h1 className="spot-title">{spot.name}</h1>
      <p className="spot-location">
        {spot.city}, {spot.state}, {spot.country}
      </p>
      <div className="white-box host-details">
        <h3>
          Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}
        </h3>
        <p>{spot.description}</p>
      </div>
    </div>
  );
}

export default SpotInfo;
