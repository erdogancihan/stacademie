import React from "react";
import { Link } from "react-router-dom";

function Offer({ module, link, toggleClass, handleDropdown, language }) {
  return (
    <li
      onClick={() => {
        handleDropdown();
        toggleClass();
      }}
    >
      <Link to={"/" + language + "/" + link}>{module}</Link>
    </li>
  );
}

export default Offer;
