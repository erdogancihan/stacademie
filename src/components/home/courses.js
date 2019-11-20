import React from "react";
import Module from "./module";
import img1 from "../../images/offers/Resim2.jpg";
import img2 from "../../images/offers/Resim17.jpg";
import img3 from "../../images/offers/Resim8.jpg";
import img4 from "../../images/offers/Resim5.jpg";
import img5 from "../../images/offers/Resim4.jpg";
import img6 from "../../images/offers/Resim6.jpg";
import img7 from "../../images/offers/Resim21.jpg";
import img8 from "../../images/offers/Resim22.jpg";
import img9 from "../../images/offers/Resim20.jpg";
import img10 from "../../images/offers/Resim23.jpg";


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
