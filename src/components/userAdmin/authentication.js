import React, { Component } from "react";
import { connect } from "react-redux";
import authenticate from "../auth/authenticate";
import { changePassword } from "../../store/actions/usersActionCreator";
import { clearAuthMessages } from "../../store/actions/usersActions";
import { Redirect } from "react-router-dom";
import ChangePassword from "./changePassword";

const ChangePasswordForm = authenticate(ChangePassword);

export class authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    this.props.clearAuthMessages();
  }

  render() {
    const { changePassword, strings, error, auth } = this.props;
    return (
      <div className="authentication">
        {auth.emailVerified===false ? (
          <Redirect to="/" />
        ) : (
          <ChangePasswordForm
            onSubmit={changePassword}
            strings={strings}
            error={error}
          />
        )}
      </div>
    );
  }
}
const mapStateToprops = state => {
  return {
    error: state.users,
    auth: state.firebase.auth,
    strings: state.language.strings
  };
};

export default connect(
  mapStateToprops,
  { changePassword, clearAuthMessages }
)(authentication);
