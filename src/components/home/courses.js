import React from "react";
import Module from "./module";
import img1 from "../../images/offers/47ed55411db2a59bdc8d7a525602ae08v1_max_755x425_b3535db83dc50e27c1bb1392364c95a2.jpg";
import img2 from "../../images/offers/istockphoto-490855086-1024x1024.jpg";
import img3 from "../../images/offers/istockphoto-519690994-1024x1024.jpg";
import img4 from "../../images/offers/istockphoto-661410282-1024x1024.jpg";
import img5 from "../../images/offers/istockphoto-903128166-1024x1024.jpg";
import img6 from "../../images/offers/istockphoto-915544394-1024x1024.jpg";
import img7 from "../../images/offers/istockphoto-915574098-1024x1024.jpg";
import img8 from "../../images/offers/istockphoto-940555806-1024x1024.jpg";
import img9 from "../../images/offers/istockphoto-967906154-1024x1024.jpg";
import img10 from "../../images/offers/istockphoto-1025919106-1024x1024.jpg";


function Courses({ strings, lang }) {
  const offersArray = Object.keys(strings.offers).map(i => strings.offers[i]);
const images=[img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,]
  return (
    <section className="container">
      <h1 className="courses__title">{strings.navbar.offers}</h1>

      <div className="courses">
        {offersArray.map((module, index) => {
          return (
            <Module
              index={index}
              key={index}
              module={module}
              lang={lang}
              img={images[index]}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Courses;
