import React from 'react';
import { navigate } from '@reach/router';
import classnames from 'classnames';
import { connect } from 'react-redux';

import * as faceIdFunctions from '../../redux/faceId/faceId.function';

import classes from './setupFaceId.module.css';

import FaceApiVideoInput from '../faceApiVideoInput/faceApiVideoInput';

class SetupFaceId extends React.Component {
  descriptors = null;
  recordDescriptors = null;

  state = {
    booleans: {
      isRecording: false
    }
  }

  _toggleBoolean = ( key ) => {
    let booleans = { ...this.state.booleans };
    booleans[ key ] = !booleans[ key ];
    this.setState ( {
      booleans
    } );
  }

  _updateFaceId = () => {
    const {
      faceIds,
      activeFaceId,
      updateFaceId
    } = this.props;

    let faceIdData = null;
    faceIds.forEach ( faceId => {
      if ( faceId.id === activeFaceId ) {
        faceIdData = faceId;
      }
    } );

    if ( faceIdData !== null && this.descriptors !== null ) {
      updateFaceId ( activeFaceId, {
        descriptors: [
          ...( faceIdData.descriptors ?? [] ),
          `[${this.descriptors.toString ()}]`
        ]
      } );
    }
  }

  componentDidMount () {
    const {
      faceIds,
      getFaceIds
    } = this.props;

    if ( faceIds === null )
      getFaceIds ();
  }

  render () {
    const {
      booleans: {
        isRecording
      }
    } = this.state;

    const {
      faceIds,
      activeFaceId,
      setActiveFaceId,
      createFaceId,
      updateFaceId
    } = this.props;

    let activeFaceData = null;
    if ( activeFaceId && faceIds ) {
      faceIds.forEach ( data => {
        if ( data.id === activeFaceId ) 
          activeFaceData = data;
      } );
    }

    let matcherProfile = null;
    if ( faceIds !== null ) {
      let nextMatcherProfile = {};
      let canSetMatcherProfile = false;
      faceIds.forEach ( ( faceId, index ) => {
        if ( faceId.formattedDescriptors && faceId.formattedDescriptors.length > 0 ) {
          nextMatcherProfile[ `face-${index}` ] = {
            name: faceId.name,
            descriptors: faceId.formattedDescriptors
          };
          canSetMatcherProfile = true;
        }
      } );
      if ( canSetMatcherProfile )
        matcherProfile = nextMatcherProfile;
    }

    return ( 
      <div className={classes.wrapper}>
        {/* <button 
          className={classnames ( 
            classes.btn_back,
            'btn btn-sm btn-link p-0 mb-2'
          )}
          onClick={() => {
            setActiveFaceId ( null );
            navigate ( '/home' );
          }}
        >
          <i className="fas fa-home mr-2"></i>
          <span>Home</span>
        </button> */}
        <h3>Face Recognition</h3>
        <hr />
        <div className="row text-left">
          <div className="col-md-2 col-lg-2">
            <h5 className="mb-2">Select a Face ID:</h5>
            {faceIds && faceIds.map ( ( { 
              id, 
              name,
              descriptors
            }, index ) => {
              return ( 
                <div 
                  key={index}
                  className={classnames ( 
                    classes.card_faceId,
                    activeFaceId === id ? classes.card_faceId_active : ''
                  )}
                  onClick={() => {
                    setActiveFaceId ( activeFaceId === id ? null : id );
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{name}</span>
                    <span>{descriptors ? descriptors.length : 0}</span>
                  </div>
                </div>
              );
            } )}
            <button 
              className="btn btn-outline-dark"
              onClick={() => createFaceId ()}
            >
              <i className="fas fa-plus mr-2"></i>
              <span>New FaceID</span>
            </button>
            <p className="text-info mt-2">
              Note: This site does not collect your information. All FaceID data are recorded and store locally on your device.
            </p>
          </div>
          <div className="col-md-8 col-lg-8">
            <div className="d-flex align-items-center mb-3">
              {activeFaceData &&
              <input 
                type="text"
                className="form-element mr-2"
                placeholder="FaceID User's Name"
                value={activeFaceData.name}
                onChange={( e ) => {
                  updateFaceId ( activeFaceId, {
                    name: e.target.value
                  } )
                }}
              />}

              <button 
                className="btn btn-sm btn-primary mr-2"
                onClick={() => this._updateFaceId ()}
                disabled={activeFaceId === null || isRecording}
              >
                Add Descriptors
              </button>

              <button 
                className={classnames ( 
                  'btn btn-sm mr-2',
                  isRecording ? 'btn-danger' : 'btn-primary'
                )}
                onClick={() => {
                  if ( isRecording ) {
                    let formattedDescriptors = [];
                    this.recordDescriptors.forEach ( desc => {
                      formattedDescriptors.push ( `[${desc}]` );
                    } );
                    updateFaceId ( activeFaceId, {
                      descriptors: formattedDescriptors
                    } );
                  }
                  else
                    this.recordDescriptors = [];
                  this._toggleBoolean ( 'isRecording' );
                }}
                disabled={activeFaceId === null}
              >
                <i className="fas fa-video mr-2"></i>
                <span>{isRecording ? 'Stop Record' : 'Record'}</span>
              </button>
            </div>
            <FaceApiVideoInput 
              matcherProfile={matcherProfile}
              onReceiveDescriptors={( descriptors ) => {
                this.descriptors = descriptors;
                if ( isRecording && descriptors ) {
                  let desc = descriptors.toString ();
                  if ( this.recordDescriptors.indexOf ( desc ) < 0 ) {
                    this.recordDescriptors.push ( desc );
                  }
                }
              }}
              isRecording={isRecording}
              width={window.innerWidth * 7.8/12}
              height={window.innerHeight * 0.8}
            />
          </div>
          <div className="col-md-2 col-lg-2">
            <div className={classes.instruct}>
              <h5>Instruction:</h5>
              <p>1. Click "+ New FaceID" on the left panel to create a new FaceID.</p>
              <p>2. Click on any of the FaceID on the list to edit it.</p>
              <p>3. The "Add Descriptors" and "Record" button should be enabled when a FaceID is selected.</p>
              <p>4. Click on "Add Descriptors" to store a copy of the descriptors data that is generated when a face is detected (green box).</p>
              <p>5. Click on "Record" to start the FaceID anew, move your head around all directions slowly. All the descriptors data will be collected every second, and will be stored in your browser's local storage on "Record" button is toggle off.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    faceIds: state.faceIdReducer.data,
    activeFaceId: state.faceIdReducer.activeDataId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFaceIds: () => dispatch ( faceIdFunctions.getFaceIds () ),
    setActiveFaceId: ( id ) => dispatch ( faceIdFunctions.setActiveFaceId ( id ) ),
    createFaceId: () => dispatch ( faceIdFunctions.createFaceId () ),
    updateFaceId: ( id, data ) => dispatch ( faceIdFunctions.updateFaceId ( id, data ) )
  }
}

export default connect ( 
  mapStateToProps,
  mapDispatchToProps
) ( SetupFaceId );