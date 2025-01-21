import { csrfFetch } from './csrf'; // Import csrfFetch for making secure API requests

// Action types
const SET_SPOTS = 'spots/setSpots';

// Action creator to set the spots in the state
const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    spots,
  };
};

const DELETE_REVIEW = 'spots/deleteReview';

// Action creator to delete a review
const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});
// Thunk action to fetch the spots from the API
export const fetchSpots = () => async (dispatch) => {
    try {
      const response = await csrfFetch('/api/spots');
      const data = await response.json();
      console.log('Fetched spots:', data.Spots); // Debugging
      dispatch(setSpots(data.Spots)); // Dispatch the spots array
    } catch (error) {
      console.error('Failed to fetch spots:', error);
    }
  };
  
  export const deleteReviewThunk = (reviewId, spotId) => async (dispatch) => {
    try {
      await csrfFetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
  
      // Dispatch action to remove the review from state
      dispatch(deleteReview(reviewId));
  
      // Optionally refetch updated spot details if necessary
      dispatch(fetchSpots());
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };
  
  
// Update reducer to handle DELETE_REVIEW
const spotsReducer = (state = { spots: [] }, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.spots };

    case DELETE_REVIEW:
      return {
        ...state,
        spots: state.spots.map((spot) => ({
          ...spot,
          Reviews: spot.Reviews.filter((review) => review.id !== action.reviewId),
        })),
      };

    default:
      return state;
  }
};

export default spotsReducer;