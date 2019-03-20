import React from "react";
import { Link } from "react-router-dom";


const SignUp = props => {
  const { onSubmit, onChange, showSignin, strings, error,  auth } = props;

  return (
    <div>
      <div>
        <form name="signUp" onSubmit={onSubmit}>
          <h2 className="text-center">{strings.auth.signupToOurBlog}</h2>
          <div className="form-group">
            <label className="h6 mt-3" htmlFor="InputEmail1">
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
            <label className="h6 " htmlFor="InputPassword">
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
          <div className="form-group">
            <label className="h6 " htmlFor="InputPassword1">
              {strings.auth.passwordRe}
            </label>
            <input
              type="password"
              className="form-control"
              id="password1"
              name="password1"
              placeholder={strings.auth.placeHolders.passwordRe}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="h6 " htmlFor="firstName">
              {strings.auth.nameAndLastName}
            </label>
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              aria-describedby="firstName"
              placeholder={strings.auth.placeHolders.nameAndLastName}
              onChange={onChange}
              required
            />
          </div>
          <div className="signup-message">
            <br />
            <Link to="/terms">
              {" "}
              <p className="text-center text-light toogle">
                {strings.auth.userAgreement}
              </p>
            </Link>
          </div>
          <div className="center">
            <button className="button">{strings.auth.signup}</button>
          </div>
        </form>
      </div>
      <div className="text-center text-light toogle" id="message">
        {strings.auth.allreadyMember}
        <span className="toogle" onClick={showSignin}>
          {strings.auth.login}
        </span>
        {auth.uid ? (
          <div className="signup-message">
            <br />
            <p className="text-center">{strings.auth.signUpSuccess}</p>
          </div>
        ) : null}

        {error.error!==false? (
          <div className="signup-message">
            <br />
            <p className="text-center error">{error.error}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SignUp;
