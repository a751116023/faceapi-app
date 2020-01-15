import { combineReducers } from 'redux';

import { reducer as faceIdReducer } from './faceId/faceId.redux';

export default combineReducers ( {
  faceIdReducer
} );