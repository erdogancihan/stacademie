import React from "react";
import { Link } from "react-router-dom";

function Module({ module, moduleLink, lang, img }) {
  return (
    <div className="module">
      <img src={img} alt="Schweiß Technik Akademie" />
      <h3>
        <Link to={lang + "/" + moduleLink}>{module}</Link>
      </h3>
    </div>
  );
}

export default Module;
