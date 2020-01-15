import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../../face';

const inputSize = 160;

class FaceApiVideoInput extends Component {
  webcam = React.createRef ();

  state = {
    fullDesc: null,
    detections: null,
    descriptors: null,
    faceMatcher: null,
    match: null,
    facingMode: null
  }

  componentWillMount = async () => {
    await loadModels();
    this.setInputDevice();
  };

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === 'videoinput'
      );
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: 'user'
        });
      } else {
        await this.setState({
          facingMode: { exact: 'environment' }
        });
      }
      this.startCapture();
    });
  };

  startCapture = () => {
    this.interval = setInterval ( () => {
      this.capture ();
    }, 1000 );
  };

  _setupMatcher = async () => {
    const {
      matcherProfile
    } = this.props;

    if ( matcherProfile )
      this.setState ( { 
        matcherProfile,
        faceMatcher: await createMatcher ( matcherProfile ) 
      } );
  }

  componentDidUpdate ( prevProps ) {
    if ( prevProps.matcherProfile !== this.state.matcherProfile )
      this._setupMatcher ();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  capture = async () => {
    if (this.webcam.current) {
      await getFullFaceDescription(
        this.webcam.current.getScreenshot(),
        inputSize
      ).then(fullDesc => {
        if (fullDesc) {
          let detections = fullDesc.map(fd => fd.detection);
          let descriptors = fullDesc.map(fd => fd.descriptor);

          if ( this.props.onReceiveDescriptors ) {
            this.props.onReceiveDescriptors ( 
              descriptors.length > 0 ? descriptors : null
            );
          }

          this.setState({
            detections,
            descriptors
          });
        }
      });

      if (this.state.descriptors && this.state.faceMatcher) {
        let match = await this.state.descriptors.map(descriptor =>
          this.state.faceMatcher.findBestMatch(descriptor)
        );
        if ( match && match.length > 0 ) {
          if ( this.props.onReceiveMatch ) {
            this.props.onReceiveMatch ( match );
          }
        }
        this.setState ( { match } );
      }
    }
  };

  render() {
    const {
      width = window.innerWidth,
      height = window.innerHeight,
      activeProfileLabel = null
    } = this.props;

    const { detections, match, facingMode } = this.state;
    let videoConstraints = null;
    // let camera = '';
    if (facingMode) {
      videoConstraints = {
        width: width,
        height: height,
        facingMode: facingMode
      };
      // if (facingMode === 'user') {
      //   camera = 'Front';
      // } else {
      //   camera = 'Back';
      // }
    }

    let drawBox = null;
    if (detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;

        let hasMatch = false;
        if ( match && match[i] ) {
          hasMatch = ( 
            match[i]._label !== 'unknown' 
            && match[i]._distance < 0.5 
          );
          if ( hasMatch && activeProfileLabel !== null ) {
            hasMatch = ( match[i]._label === activeProfileLabel );
          }
        }
        let bgColor = hasMatch ? 'green' : 'blue';

        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: bgColor,
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {hasMatch ? (
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: bgColor,
                    border: 'solid',
                    borderColor: bgColor,
                    width: _W,
                    marginTop: 0,
                    color: '#fff',
                    transform: `translate(-3px,${_H}px)`
                  }}
                >
                  <span>{match[i]._label}</span>
                  <span>{match[i]._distance.toFixed ( 2 )}</span>
                </div>
              ) : null}
            </div>
          </div>
        );
      });
    }

    return (
      <div
        className="Camera"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* <p>Camera: {camera}</p> */}
        <div
          style={{
            width: width,
            height: height
          }}
        >
          <div style={{ position: 'relative', width: width }}>
            {videoConstraints ? (
              <div style={{ position: 'absolute' }}>
                <Webcam
                  audio={false}
                  width={width}
                  height={height}
                  ref={this.webcam}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
            ) : null}
            {drawBox ? drawBox : null}
          </div>
        </div>
      </div>
    );
  }
}

export default FaceApiVideoInput;