import React from "react";

const PasswordResetRequest = props => {
  const { onChange, onSubmit,  strings,error } = props;
 console.log(props)
  return (
    <div>
      <div>
        <form name="signIn" onSubmit={onSubmit}>
          <h2 className="text-center">{strings.auth.resetPasswordForm}</h2>
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

          <div className="center">
            <button className="button">{strings.auth.resetPassword}</button>
          </div>
        </form>
      </div>
      <div className="signup-message">
          <div className="text-light text-center" id="message">
          {strings.auth.resetPasswordDescription}
           
          </div>
          <div className="text-light text-center" id="message">
          {error.error!==false?error.error:null}
           
          </div>
        </div>
    </div>
  );
};

export default PasswordResetRequest;
