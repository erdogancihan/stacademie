import React from "react";
import { Link } from "react-router-dom";

const LoggedIn = ({ user, LogOut, strings, toggleClass }) => {
  const userName = user.email.substring(0, user.email.indexOf("@"));
  return (
    <React.Fragment>
      <li className="nav-link">
        <Link to="/changepassword" onClick={toggleClass}>
          {" "}
          <i className="far fa-user" />
          <span> </span> {userName}
        </Link>
      </li>
      <li className="nav-link">
        <Link
          to="/"
          onClick={() => {
            LogOut();
            toggleClass();
          }}
        >
          <i className="fas fa-sign-out-alt" /> <span> </span>{" "}
          {strings.navbar.logout}
        </Link>
      </li>
    </React.Fragment>
  );
};

export default LoggedIn;
