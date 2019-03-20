import React, { Component } from "react";
import { connect } from "react-redux";
import SignIn from "./signIn";
import SignUp from "./signUp";
import PasswordResetRequest from "./PasswordResetRequest";

import authenticate from "./authenticate";
import {
  signInUser,
  signUpUser,
  resetPassword
} from "../../store/actions/usersActionCreator";
import { clearAuthMessages } from "../../store/actions/usersActions";

import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

//wrap components by higher order components
const SignUpForm = authenticate(SignUp);
const SignInForm = authenticate(SignIn);
const PasswordResetRequestForm = authenticate(PasswordResetRequest);

export class authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAccess: true,
      passwordReset: false
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.togglePasswordResetForm = this.togglePasswordResetForm.bind(this);
  }

  componentWillUnmount() {
    this.props.clearAuthMessages();
  }

  //toggles between signin and signup forms.
  toggleForm = () => {
    console.log(this.state);
    this.setState({
      userAccess: !this.state.userAccess,
      passwordReset: false
    });
  };

  //toggles reset password form.
  togglePasswordResetForm = () => {
    this.setState({
      userAccess: !this.state.userAccess,
      passwordReset: !this.state.passwordReset
    });
  };

  render() {
    console.log(this.props);
    const {
      signInUser,
      signUpUser,
      error,
      resetPassword,
      strings,
      user,
      auth
    } = this.props;
    return (
      <div className="authentication">
        {this.state.passwordReset ? (
          <PasswordResetRequestForm
            strings={strings}
            onSubmit={resetPassword}
            showSignin={this.toggleForm}
            error={error}
          />
        ) : user && user.id !== null ? (
          <Redirect to="/" />
        ) : this.state.userAccess ? (
          <SignInForm
            onSubmit={signInUser}
            showSignup={this.toggleForm}
            showPasswordReset={this.togglePasswordResetForm}
            strings={strings}
            auth={auth}
            user={user}
            error={error}
          />
        ) : (
          <SignUpForm
            onSubmit={signUpUser}
            user={user}
            auth={auth}
            showSignin={this.toggleForm}
            strings={strings}
            error={error}
          />
        )}
      </div>
    );
  }
}
const mapStateToprops = state => {
  console.log(state);
  return {
    user: state.firestore.user,
    strings: state.language.strings,
    auth: state.firebase.auth,
    error: state.users
  };
};

export default compose(
  connect(
    mapStateToprops,
    { signUpUser, signInUser, resetPassword, clearAuthMessages }
  ),
  firestoreConnect()
)(authentication);
