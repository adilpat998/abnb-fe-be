import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { useSelector } from "react-redux";
import ReviewsSection from "./ReviewsSection";
import SpotImages from "./SpotImages";
import ReservationSection from "./ReservationSection";
import "./SpotDetails.css";
import { useCallback } from "react";

function SpotDetails() {
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.session.user?.id);
  const [spot, setSpot] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentUserReview, setCurrentUserReview] = useState(null);
  

  const fetchSpotDetails = useCallback(async () => {
    try {
      const spotResponse = await csrfFetch(`/api/spots/${id}`);
      const spotData = await spotResponse.json();
      setSpot(spotData);
  
      const reviewsResponse = await csrfFetch(`/api/spots/${id}/reviews`);
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData.Reviews || []);
  
      if (currentUserId) {
        const currentReview = reviewsData.Reviews?.find(
          (review) => review.userId === currentUserId
        );
        setCurrentUserReview(currentReview || null);
      }
    } catch (err) {
      console.error("Failed to fetch spot details or reviews:", err);
    }
  }, [id, currentUserId]);
  
  useEffect(() => {
    fetchSpotDetails();
  }, [fetchSpotDetails]);
  

  if (!spot) {
    return <p>Loading spot details...</p>;
  }

  return (
    <div className="spot-details">
      <div>
        <h1 className="spot-title">{spot.name}</h1>
        <p className="spot-location">
          {spot.city}, {spot.state}, {spot.country}
        </p>
      </div>

      <SpotImages images={spot.SpotImages} name={spot.name} />

      <ReservationSection 
        spot={spot} 
        isOwner={spot.ownerId === currentUserId} 
        numReviews={reviews.length}
      />

      <ReviewsSection
        reviews={reviews}
        currentUserReview={currentUserReview}
        fetchSpotDetails={fetchSpotDetails}
        spotOwnerId={spot.ownerId}
        spotId={spot?.id} 
      />
    </div>
  );
}

export default SpotDetails;
