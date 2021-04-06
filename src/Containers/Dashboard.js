import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import classes from './Dashboard.module.css';

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
    signInFailure: function (error) {},
  },
  queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
  signInFlow: 'popup',
  signInSuccessUrl: '',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};
class Dashboard extends Component {
  render() {
    return (
      <div className={classes.contentwrapper}>
        {this.props.loading ? (
          <p>Loading..</p>
        ) : !this.props.loggedin ? (
          <React.Fragment>
            <p>Please sign in to see this page.</p>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
              className={classes.emailbox}
            />
          </React.Fragment>
        ) : (
          <p>Private stuff here !</p>
        )}
      </div>
    );
  }
}
export default Dashboard;
