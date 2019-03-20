import React from "react";

const ChangePassword = props => {
  const { onChange, onSubmit, strings, error } = props;

  return (
    <div>
      <div>
        <form name="changePassword" onSubmit={onSubmit}>
          <h2 className="text-center">{strings.auth.changePassword}</h2>

          <div className="form-group">
            <label className="form-Control" htmlFor="InputPassword">
              {strings.auth.oldPassword}
            </label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              name="oldPassword"
              placeholder={strings.auth.oldPassword}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="h6 " htmlFor="InputPassword">
              {strings.auth.newpassword}
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              placeholder={strings.auth.newpassword}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="h6 " htmlFor="InputPassword1">
              {strings.auth.newpasswordRe}
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword1"
              name="newPassword1"
              placeholder={strings.auth.newpasswordRe}
              onChange={onChange}
              required
            />
          </div>
          <div className="center">
            <button className="button">{strings.auth.change}</button>
          </div>
          {error.error!==false? (
          <div className="error">{strings.auth.passwordChangeError}</div>
          ) :  error.response === true ? (
            <div>{strings.auth.passwordChanged}</div>
          ) : (
          null
          )}
        </form>
       
      </div>
    </div>
  );
};

export default ChangePassword;
