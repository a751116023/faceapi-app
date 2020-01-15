import React from 'react';
import { loadModels, getFullFaceDescription, createMatcher } from '../../face';

const testImg = require ( '../../images/test_0.jpg' );
const JSON_PROFILE = require ( '../../descriptors/test.json' );

const INIT_STATE = {
  imageURL: testImg,
  fullDesc: null,
  detections: null,
  descriptors: null,
  match: null
};

class FaceApiRender extends React.Component {
  state = { 
    ...INIT_STATE, 
    faceMatcher: null 
  };

  _init = async () => {
    await loadModels ();
    this.setState ( { faceMatcher: await createMatcher ( JSON_PROFILE ) } );
    await this._handleImage ( this.state.imageURL );
  }

  _handleImage = async ( image = this.state.imageURL ) => {
    await getFullFaceDescription ( image )
    .then ( fullDesc => {
      if ( fullDesc ) {
        console.log ( fullDesc );
        this.setState ( { 
          fullDesc,
          detections: fullDesc.map ( fd => fd.detection ),
          descriptors: fullDesc.map ( fd => fd.descriptor )
        } );
      }
    } );

    if ( !!this.state.descriptors && !!this.state.faceMatcher ) {
      let match = await this.state.descriptors.map ( descriptor =>
        this.state.faceMatcher.findBestMatch ( descriptor )
      );
      this.setState ( { match } );
    }
  };

  _handleFileChange = async event => {
    this._resetState ();
    await this.setState ( {
      imageURL: URL.createObjectURL ( event.target.files[0] ),
      loading: true
    } );
    this._handleImage ();
  };

  _resetState = () => {
    this.setState ( {
      ...INIT_STATE
    } );
  }

  componentDidMount () {
    this._init ();
  }

  render () {
    const {
      imageURL,
      detections,
      match
    } = this.state;

    let drawBox;
    if ( detections ) {
      drawBox = detections.map ( ( detection, i ) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: 'blue',
                    border: 'solid',
                    borderColor: 'blue',
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  {match[i]._label}
                </p>
              ) : null}
            </div>
          </div>
        );
      } );
    }

    return ( 
      <div>
        <input
          id="imageUpload"
          type="file"
          onChange={this._handleFileChange}
          accept=".jpg, .jpeg, .png"
        />
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute' }}>
            <img src={imageURL} alt="imageURL" />
          </div>
          {!!drawBox ? drawBox : null}
        </div>
      </div>
    );
  }
}

export default FaceApiRender;