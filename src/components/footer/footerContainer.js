import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import banner from "../../images/logo/logo2.jpg";
import azav from "../../images/logo/Zz_AZAV_fbg.jpg";

export class FooterContainer extends Component {

  toggleClass = () => {
     const dropDownContent = document.querySelectorAll(".dropdown-content");
    dropDownContent.forEach(item => {
      return item.classList.value !== "dropdown-content drop"
        ? () => {
            console.log(item, "1");
          }
        : item.classList.remove("drop");
    });
  };
  render() {
    const { strings, language } = this.props;
    return (
      <footer className="notranslate">
        <ul className="footer-nav">
          <li onClick={this.toggleClass}>
            <Link to={"/" + language + "/contact"}>
              {strings.navbar.contact}
            </Link>
          </li>
          <li onClick={this.toggleClass}>
            <Link to={"/" + language + "/impressum"}>
              {strings.footer.impressum}
            </Link>
          </li>
          <li>
          <div>
            <img className="footer-azav" src={azav} alt="Azav" />
          </div>
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
