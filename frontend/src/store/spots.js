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
  
  
  
  
const spotsReducer = (state = { spots: [] }, action) => {
    switch (action.type) {
      case SET_SPOTS: // Ensure this matches the action creator
        console.log('Reducer updating spots:', action.spots); // Debugging
        return { ...state, spots: action.spots };
      default:
        return state;
    }
  };
  


  

// Export the reducer as default
export default spotsReducer;
