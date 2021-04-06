import React, { Component } from 'react';
import stockillustration from '../Resources/Images/stockillustration.svg';
import classes from './Landing.module.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';

let redirect = <Redirect to='dashboard' />;

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;
      var credential = authResult.credential;
      var isNewUser = authResult.additionalUserInfo.isNewUser;
      var providerId = authResult.additionalUserInfo.providerId;
      var operationType = authResult.operationType;
      return true;
    },
    signInFailure: function (error) {
      // return handleUIError(error);
    },
  },
  queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
  signInFlow: 'popup',
  signInSuccessUrl: '',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

class Landing extends Component {
  render() {
    return (
      <div className={classes.contentwrapper}>
        {this.props.loading ? (
          <p>Loading..</p>
        ) : this.props.loggedin ? (
          redirect
        ) : (
          <React.Fragment>
            <div className={classes.firstcol}>
              <div>
                <h1 className={classes.heading}>Learn to code!</h1>
              </div>

              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
                className={classes.emailbox}
              />
            </div>

            <div className={classes.secondcol}>
              <img
                className={classes.stock_illustration}
                src={stockillustration}
                alt='trading illustration'
              ></img>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default Landing;
