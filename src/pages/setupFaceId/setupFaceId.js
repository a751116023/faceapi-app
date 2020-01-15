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
      updateFaceId
    } = this.props;

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
        <button 
          className={classnames ( 
            classes.btn_back,
            'btn btn-sm btn-link p-0 mb-2'
          )}
          onClick={() => {
            setActiveFaceId ( null );
            navigate ( '/' );
          }}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          <span>Back</span>
        </button>
        <h3>Face ID Setup</h3>
        <hr />
        <div className="row text-left">
          <div className="col-md-3 col-lg-3">
            <h5>Select a Face ID:</h5>
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
          </div>
          <div className="col-md-9 col-lg-9">
            <div className="d-flex align-items-center mb-3">
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
            />
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
    updateFaceId: ( id, data ) => dispatch ( faceIdFunctions.updateFaceId ( id, data ) )
  }
}

export default connect ( 
  mapStateToProps,
  mapDispatchToProps
) ( SetupFaceId );