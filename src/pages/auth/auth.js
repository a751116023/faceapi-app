import React from 'react';
import { Redirect } from '@reach/router';

import { connect } from 'react-redux';
import * as authFunctions from '../../redux/auth/auth.function';

import classes from './auth.module.css';

class Auth extends React.Component { 
  state = {
    input: {  
      email: '',
      password: ''
    }
  }

  _onChangeInput = ( key ) => ( { target: { value } } ) => {
    let input = { ...this.state.input };
    input[ key ] = value;
    this.setState ( {
      input
    } );
  }

  _onSubmit = ( e ) => {
    e.preventDefault ();

    const {
      input
    } = this.state;

    const {
      login
    } = this.props;

    login ( input.email, input.password );
  }

  componentDidMount () {
    const {
      isLogin
    } = this.props;

    isLogin ();
  }

  render () {
    const {
      input
    } = this.state;

    const {
      authIsLoading,
      authIsLoaded,
      authError
    } = this.props;

    if ( !authIsLoading && authIsLoaded )
      return <Redirect noThrow to="/" />;
    
    return ( 
      <div className={classes.wrapper}>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <form onSubmit={this._onSubmit}>
              <div className="form-group mb-2">
                <label>Email</label>
                <input 
                  type="email"
                  className="form-control"
                  value={input.email}
                  onChange={this._onChangeInput ( 'email' )}
                  disabled={authIsLoading}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password"
                  className="form-control"
                  value={input.password}
                  onChange={this._onChangeInput ( 'password' )}
                  disabled={authIsLoading}
                  required
                />
              </div>
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={authIsLoading}
              >
                Login
              </button>
              {authError && 
              <p className="text-danger mt-2">{authError}</p>}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    authIsLoading: state.authReducer.isLoading,
    authIsLoaded: ( state.authReducer.data != null ),
    authError: state.authReducer.error
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    isLogin: () => dispatch ( authFunctions.isLogin () ),
    login: ( email, password ) => dispatch ( authFunctions.login ( email, password ) )
  }
}

export default connect ( 
  mapStateToProps,
  mapDispatchToProps
) ( Auth );