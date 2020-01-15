import * as faceIdCtrl from './faceId.controller';
import { actions as faceIdActions } from './faceId.redux';

export const getFaceIds = () => {
  return dispatch => {
    faceIdCtrl.getFaceIds ( ( err, data ) => {
      dispatch ( faceIdActions.loadSuccess ( data ) );
    } );
  }
}

export const setActiveFaceId = ( id ) => {
  return dispatch => {
    dispatch ( faceIdActions.setActiveDataId ( id ) );
  }
}

export const updateFaceId = ( id, data ) => {
  return async dispatch => {
    faceIdCtrl.updateFaceId ( id, data );
    dispatch ( getFaceIds () );
  }
}