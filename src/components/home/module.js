import React from "react";
import { Link } from "react-router-dom";

function Module({ module, index }) {

  return (
    <div className="module notranslate">
      <h3>
        <Link to={"link/module" + (index + 1)}>{module}</Link>
      </h3>
    </div>
  );
}

export default Module;
