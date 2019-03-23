import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Map from "./map";
class Contact extends Component {
  render() {
    return (
      <section className="notranslate">
        <Helmet>
          <meta charset="utf-8" />
          <title>Schweiss Technic Academie Kontakt</title>
          <meta
            name="description"
            content="Schweiss Technic Academie Kontakt"
          />
          <link rel="canonical" href="https://stacademie.de/link/contact" />
        </Helmet>

        <div className="content-container">
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
                title: 'Schweiss Technic Academie'
              });
            }}
          />
          <div className="contact">
            <h1>Schweiss Technic Academie</h1>

            <p><a href="https://www.google.de/maps/dir/?api=1&destination=In+Schlenk+86%2C+47055+Duisburg">In Schlenk 86, 47055 Duisburg</a></p>
            <p> <a href="tel:+4920371281413">Tel: +49 (0) 203 7128 1413</a></p>
            <p>Fax: +49 (0) 203 7128 1412</p>

            <p>
              <a href="mailto:aa@aa.com">
                <i className="fas fa-envelope" />{" "}
                mail@guerotech-bildungszentrum.de
              </a>{" "}
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
