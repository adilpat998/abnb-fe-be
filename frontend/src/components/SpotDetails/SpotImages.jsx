import "./SpotDetails.css";

function SpotImages({ images, name }) {
  if (!images || images.length === 0) {
    return <p>No images are available for this spot.</p>;
  }

  return (
    <div className="spot-images">
      <img
        className="main-image"
        src={images[0]?.url || "https://via.placeholder.com/500"}
        alt={name}
      />
      <div className="secondary-images">
        {images.slice(1).map((image) => (
          <img
            key={image.id}
            className="secondary-image"
            src={image.url}
            alt={`Spot Image ${image.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default SpotImages;
