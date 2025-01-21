import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewThunk } from "../../store/spots";
import ReviewModal from "./ReviewModal";
import "./SpotDetails.css";
import { csrfFetch } from "../../store/csrf";


function ReviewsSection({
  reviews,
  currentUserReview,
  fetchSpotDetails, 
  spotOwnerId,  
  spotId        
}) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.session.user?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  // Sync local state with updated reviews when the reviews prop changes
  useEffect(() => {
    setLocalReviews(reviews.length ? reviews : []); // Ensure empty array is set correctly
  }, [reviews]);
  

  const handleDeleteReview = async () => {
    try {
      await dispatch(deleteReviewThunk(selectedReviewId));
      setShowDeleteModal(false); 
      
      setLocalReviews((prevReviews) => {
        const updatedReviews = prevReviews.filter(review => review.id !== selectedReviewId);
        return updatedReviews.length ? updatedReviews : [];  // Ensure an empty array is set
      });
      
      // Refetch the spot details to ensure UI syncs with the backend
      fetchSpotDetails(); 
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };
  

  const handlePostReview = async (newReview) => {
    if (!spotId) {
      console.error("Error: spotId is undefined.");
      return;
    }
  
    // Validation for review length
    const minReviewLength = 5; // Minimum characters for a review
    const maxReviewLength = 500; // Maximum characters for a review
  
    if (newReview.review.length < minReviewLength) {
      alert(`Review must be at least ${minReviewLength} characters long.`);
      return;
    }
  
    if (newReview.review.length > maxReviewLength) {
      alert(`Review must not exceed ${maxReviewLength} characters.`);
      return;
    }
  
    try {
      await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
  
      await fetchSpotDetails();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to post review:", error);
    }
  };

  return (
    <div className="white-box reviews-section">
      <h3>Reviews ({localReviews.length})</h3>

      {localReviews.length > 0 ? (
        localReviews.map((review) => (
          <div key={review.id} className="review">
            <div className="review-header">
              <span>{review.User?.firstName || "Anonymous"}</span>
              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p>{review.review}</p>
            {currentUserId && review.userId === currentUserId && (
              <button 
                className="delete-review-button" 
                onClick={() => {
                  setSelectedReviewId(review.id);
                  setShowDeleteModal(true);
                }}
              >
                Delete Review
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      {currentUserId && !currentUserReview && currentUserId !== spotOwnerId && (
        <button className="reserve-button" onClick={() => setIsModalOpen(true)}>
          Post a Review
        </button>
      )}

      {isModalOpen && (
        <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handlePostReview} />
      )}

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this review?</p>
            <button className="delete-btn" onClick={handleDeleteReview}>
              Yes (Delete Review)
            </button>
            <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
              No (Keep Review)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewsSection;
