import React from "react";
import { Link } from "react-router-dom";

const Admin = ({ strings , toggleClass}) => {
  return (
    <React.Fragment>
      <li className="nav-link">
        <Link to="/users" onClick={toggleClass}>Users</Link>
      </li>
    </React.Fragment>
  );
};

export default Admin;
