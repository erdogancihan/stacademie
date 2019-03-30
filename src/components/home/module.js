import React from "react";
import { Link } from "react-router-dom";

function Module({ module, index, lang, img }) {
  return (
    <div className="module">
      <img src={img} alt="Schweiß Technik Akademie" />
      <h3>
        <Link to={lang + "/module" + (index + 1)}>{module}</Link>
      </h3>
    </div>
  );
}

export default Module;
