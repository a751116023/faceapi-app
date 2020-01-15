import uuid from 'uuid/v1';

const dbName = 'faceApiApp-faceIds';

const getData = () => {
  // localStorage.clear ();
  let data = localStorage.getItem ( dbName );
  if ( data === null ) {
    saveData ( [] );
    return [];
  }
  else
    return JSON.parse ( data );
}
const saveData = ( data ) => {
  localStorage.setItem ( dbName, JSON.stringify ( data ) );
}

export const getFaceIds = async ( callback ) => {
  let faceIds = getData ();
  faceIds.forEach ( faceId => {
    faceId = formatFaceIdData ( faceId );
  } );
  callback ( null, faceIds );
}

export const formatFaceIdData = ( data ) => {
  if ( data.descriptors ) {
    let descriptors = [];
    data.descriptors.forEach ( desc => {
      descriptors.push ( JSON.parse ( desc ) );
    } );
    data.formattedDescriptors = descriptors;
  }
  return data;
}

export const createFaceId = () => {
  let faceIds = getData ();
  let data = {
    id: uuid (),
    name: 'New Face ID',
    descriptors: [],
    date_created: new Date (),
    date_updated: new Date ()
  };
  faceIds.push ( data );
  saveData ( faceIds );
}

export const updateFaceId = ( id, data ) => {
  let faceIds = getData ();
  data.date_updated = new Date ();
  let index = -1;
  faceIds.forEach ( ( faceId, i ) => {
    if ( faceId.id === id )
      index = i;
  } );
  if ( index >= 0 ) {
    faceIds[ index ] = {
      ...faceIds[ index ],
      ...data
    };
    saveData ( faceIds );
  }
}