import React from "react";
import { Redirect } from "react-router-dom";

const SignIn = props => {
  const {
    onChange,
    onSubmit,
    showSignup,
    error,
    auth,
    strings,
    showPasswordReset
  } = props;

  return (
    <div>
      <div>
        <form name="signIn" onSubmit={onSubmit}>
          <h2 className="text-center">{strings.auth.loginToOurblog}</h2>
          <div className="form-group">
            <label className="form-control" htmlFor="InputEmail1">
              {strings.auth.emailAddress}
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder={strings.auth.placeHolders.enterEmail}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-Control" htmlFor="InputPassword">
              {strings.auth.password}
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder={strings.auth.placeHolders.enterPassword}
              onChange={onChange}
              required
            />
          </div>

          <div className="center">
            <button className="button">{strings.auth.login}</button>
          </div>
        </form>
      </div>
      <div className="center">
        <div className="toogle" id="message">
          {strings.auth.notMember}
          <span className="toogle" onClick={showSignup}>
            {" "}
            {strings.auth.signup}
          </span>
        </div>
      </div>
      <div className="center">
        <div className="text-light toogle"  onClick={showPasswordReset}>
          
            {strings.auth.resetPasswordText}
         
        </div>
      </div>
      <div className="signup-message">
        <br />
        <p className="text-center error">
          {error.error !== false ? (
            error.error
          ) : auth.uid ? (
            auth.emailVerified === true ? (
              <Redirect to="/" />
            ) : (
              null
            )
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
