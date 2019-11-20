import React from "react";
import { Link } from "react-router-dom";

function Offer({
  module,
  index,
  toggleClass,
  handleDropdown,
  language,
  linkInitial
}) {
  return (
    <li
      onClick={() => {
        handleDropdown();
        toggleClass();
      }}
    >
      <Link to={"/" + language + linkInitial + (index + 1)}>{module}</Link>
    </li>
  );
}

export default Offer;
