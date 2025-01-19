import { useState } from "react";
import { useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import ReviewModal from "./ReviewModal";
import "./SpotDetails.css";

function ReviewsSection({
  reviews,
  currentUserReview,
  fetchSpotDetails, // Add this prop to refetch spot details
}) {
  const currentUserId = useSelector((state) => state.session.user?.id); // Get current user ID if logged in
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteReview = async (reviewId) => {
    try {
      await csrfFetch(`/api/reviews/${reviewId}`, { method: "DELETE" });

      // Refetch the data to ensure the UI updates correctly
      await fetchSpotDetails();
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  const handlePostReview = async (newReview) => {
    try {
      await csrfFetch(`/api/spots/${reviews[0]?.spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      // Refetch the data to ensure the UI updates correctly
      await fetchSpotDetails();
      setIsModalOpen(false); // Close modal after posting review
    } catch (err) {
      console.error("Failed to post review:", err);
    }
  };

  return (
    <div className="white-box reviews-section">
      <h3>Reviews ({reviews.length})</h3>

      {/* Display all reviews */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review">
            <div className="review-header">
              <span>{review.User?.firstName || "Anonymous"}</span>
              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p>{review.review}</p>
            {/* Show Delete button only for the current user's review */}
            {currentUserId && review.userId === currentUserId && (
              <button
                className="delete-review-button"
                onClick={() => handleDeleteReview(review.id)}
              >
                Delete Review
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      {/* Show Post a Review button only if logged in and no current review */}
      {currentUserId && !currentUserReview && (
        <button
          className="reserve-button"
          onClick={() => setIsModalOpen(true)} // Open modal
        >
          Post a Review
        </button>
      )}

      {/* Render ReviewModal */}
      {isModalOpen && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePostReview}
        />
      )}
    </div>
  );
}

export default ReviewsSection;
