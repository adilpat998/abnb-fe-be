import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { useSelector } from "react-redux";
import ReviewsSection from "./ReviewsSection";
import SpotImages from "./SpotImages";
import ReservationSection from "./ReservationSection";
import "./SpotDetails.css";

function SpotDetails() {
  const { id } = useParams(); // Get the spot ID from the URL
  const currentUserId = useSelector((state) => state.session.user?.id); // Get the current user's ID
  const [spot, setSpot] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentUserReview, setCurrentUserReview] = useState(null); // Track current user's review

  // Fetch spot details and reviews
  const fetchSpotDetails = async () => {
    try {
      const spotResponse = await csrfFetch(`/api/spots/${id}`);
      const spotData = await spotResponse.json();
      setSpot(spotData);

      const reviewsResponse = await csrfFetch(`/api/spots/${id}/reviews`);
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData.Reviews || []);

      // Set the current user's review, if it exists
      if (currentUserId) {
        const currentReview = reviewsData.Reviews?.find(
          (review) => review.userId === currentUserId
        );
        setCurrentUserReview(currentReview || null);
      }
    } catch (err) {
      console.error("Failed to fetch spot details or reviews:", err);
    }
  };

  useEffect(() => {
    fetchSpotDetails();
  }, [id, currentUserId]);

  if (!spot) {
    return <p>Loading spot details...</p>;
  }

  return (
    <div className="spot-details">
      {/* Title and Location */}
      <div>
        <h1 className="spot-title">{spot.name}</h1>
        <p className="spot-location">
          {spot.city}, {spot.state}, {spot.country}
        </p>
      </div>

      {/* Images Section */}
      <SpotImages images={spot.SpotImages} name={spot.name} />

      {/* Reservation Section */}
      <ReservationSection spot={spot} />

      {/* Reviews Section */}
      <ReviewsSection
        reviews={reviews}
        currentUserReview={currentUserReview}
        setReviews={setReviews}
        setCurrentUserReview={setCurrentUserReview}
        fetchSpotDetails={fetchSpotDetails} // Pass the fetch function
      />
    </div>
  );
}

export default SpotDetails;
