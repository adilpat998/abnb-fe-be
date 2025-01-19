import { useState } from "react";
import ReactDOM from "react-dom";
import "./ReviewModal.css";

function ReviewModal({ isOpen, onClose, onSubmit }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (!reviewText || rating === 0) {
      alert("Please provide a review and a rating.");
      return;
    }
    onSubmit({ review: reviewText, stars: rating });
    setReviewText("");
    setRating(0);
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <h3>Post a Review</h3>
        <textarea
          placeholder="Write your review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${rating >= star ? "filled" : ""}`}
              onClick={() => setRating(star)} // Handle star selection
            >
              ★
            </span>
          ))}
        </div>
        <div className="modal-actions">
          <button className="reserve-button" onClick={handleSubmit}>
            Submit Review
          </button>
          <button className="delete-review-button cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure it mounts in #modal-root
  );
}

export default ReviewModal;
