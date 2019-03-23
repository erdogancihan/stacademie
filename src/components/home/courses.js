import React from "react";
import Module from "./module";


function Courses({ strings ,lang}) {
  const offersArray = Object.keys(strings.offers).map(i => strings.offers[i]);

  return (
    <section>
      <div className="courses">
        {offersArray.map((module, index) => {
          return <Module index={index} key={index} module={module} lang={lang} />;
        })}
      </div>
    </section>
  );
}

export default Courses;
