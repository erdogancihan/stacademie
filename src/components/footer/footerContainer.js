import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import banner from "../../images/logo/logo2.jpg";

export class FooterContainer extends Component {
  render() {
    const { strings, language } = this.props;
    return (
      <footer className="notranslate">
        <ul className="footer-nav">
          <li>
            <Link to={"/" + language + "/impressum"}>
              {strings.navbar.impressum}
            </Link>
          </li>
          <li>
            <Link to={"/" + language + "/terms"}>{strings.navbar.terms}</Link>
          </li>
          <li>
            <Link to={"/contact"}>{strings.navbar.contact}</Link>
          </li>
        </ul>
        <div className="footer-info">
          <div>
            <img className="footer-banner" src={banner} alt="Schweiß" />
          </div>

          <div>
            <p>
              <a href="https://www.google.de/maps/dir/?api=1&destination=In+Schlenk+86%2C+47055+Duisburg">
                Im Schlenk 86, 47055 Duisburg
              </a>
            </p>
            <div className="telephone">
              <p>
                <a href="tel:+4920371281413">Tel: +49 (0) 203 7128 1413</a>
              </p>
              <p>Fax: +49 (0) 203 7128 1412</p>
            </div>
            <div className="telephone">
              <p>
                <a href="www.st-akademie.de">www.st-akademie.de</a>
              </p>
              <p>
                <a href="mailto:info@st-akademie.de">
                  <i className="fas fa-envelope" /> info@st-akademie.de
                </a>{" "}
              </p>
            </div>
          </div>
        </div>
        <p> &copy; 2019 Schweißtechnik Akademie GmbH All Rights Reserved.</p>
      </footer>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    language: state.language.language,
    user: state.firestore.data.user,
    strings: state.language.strings,
    auth: state.firebase.auth
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps),
  firestoreConnect()
)(FooterContainer);
