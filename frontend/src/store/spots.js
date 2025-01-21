import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/setSpots';

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    spots,
  };
};

const DELETE_REVIEW = 'spots/deleteReview';

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

export const fetchSpots = () => async (dispatch) => {
  try {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    console.log('Fetched spots:', data.Spots);
    dispatch(setSpots(data.Spots));
  } catch (error) {
    console.error('Failed to fetch spots:', error);
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  try {
    await csrfFetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
    dispatch(deleteReview(reviewId));
    dispatch(fetchSpots());
  } catch (error) {
    console.error('Failed to delete review:', error);
  }
};

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
