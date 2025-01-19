

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import sessionReducer from './session';
import spotsReducer from './spots'; // Import the new spotsReducer

// Combine reducers
const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer, // Add the spotsReducer to the combined reducers
});

// Apply middleware and create the store
let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk));
}

// Create and export the store
const configureStore = (preloadedState) => createStore(rootReducer, preloadedState, enhancer);
export default configureStore;
