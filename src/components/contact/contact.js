import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Map from "./map";
class Contact extends Component {
  render() {
    return (
      <section className="container">
        <Helmet>
          <meta charset="utf-8" />
          <title>Schweiss Technic Academie Kontakt</title>
          <meta
            name="description"
            content="Schweiss Technic Academie Kontakt"
          />
          <link rel="canonical" href="https://st-akademie.de/link/contact" />
        </Helmet>

        <div className="contents">
          <Map
            className="picture"
            id="map"
            options={{
              zoom: 18,
              center: { lat: 51.40102, lng: 6.77131}
            }}
            onMapLoad={map => {
              let marker = new window.google.maps.Marker({
                position: { lat: 51.40102, lng: 6.77131},
                map: map,
                title: 'Schweiß Technik Akademie'
              });
            }}
          />
          <address className="contact ">
            <h1>Schweiß Technik Akademie</h1>

            <p><a href="https://www.google.de/maps/dir/?api=1&destination=In+Schlenk+86%2C+47055+Duisburg">Im Schlenk 86, 47055 Duisburg</a></p>
            <p> <a href="tel:+4920371281413">Tel: +49 (0) 203 7128 1413</a></p>
            <p>Fax: +49 (0) 203 7128 1412</p>

            <p>
              <a href="mailto:demirlikan@st-akademie.de">
                <i className="fas fa-envelope" />{" "}
                demirlikan@st-akademie.de
              </a>{" "}
            </p>
          </address>
        </div>
      </section>
    );
  }
}

export default Contact;
