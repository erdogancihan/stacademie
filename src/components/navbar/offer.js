import React from "react";
import { Link } from "react-router-dom";

function Offer({ module, index, toggleClass, handleDropdown }) {
  return (
    <li
      onClick={() => {
        handleDropdown();
        toggleClass();
      }}
    >
      <Link to={"/link/module" + (index + 1)}>{module}</Link>
    </li>
  );
}

export default Offer;
