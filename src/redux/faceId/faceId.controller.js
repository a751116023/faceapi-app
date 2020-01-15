const dbName = process.env.STORAGE_KEY + '-faceIds';

export const getFaceIds = async ( callback ) => {
  let faceIds = localStorage.getItem ( dbName );
  callback ( null, faceIds );
}

export const updateFaceId = ( id, data ) => {
  let faceIds = localStorage.getItem ( dbName );
  data.date_updated = new Date ();
  let index = -1;
  faceIds.forEach ( ( faceId, i ) => {
    if ( faceId.id === id )
      index = i;
  } );
  if ( index >= 0 ) {
    faceIds[ index ] = data;
    localStorage.setItem ( dbName, faceIds );
  }
}