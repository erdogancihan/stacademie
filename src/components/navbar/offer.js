import React from "react";
import { Link } from "react-router-dom";

function Offer({ module, index, toggleClass, handleDropdown,language }) {
 
  return (
    <li
      onClick={() => {
        handleDropdown();
        toggleClass();
      }}
    >
      <Link to={"/" + language + "/module" + (index + 1)}>{module}</Link>
    </li>
  );
}

export default Offer;
