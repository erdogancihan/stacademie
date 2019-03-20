import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

export class FooterContainer extends Component {
  render() {
    const { strings } = this.props;
    return (
      <footer>
        
        <ul className="footer-nav">
          <li>
            <Link to="/link/impressum">{strings.navbar.impressum}</Link>
          </li>
          <li>
            <Link to="/link/terms">{strings.navbar.terms}</Link>
          </li>
          <li>
            <Link to="/link/contact">{strings.navbar.contact}</Link>
          </li>
        </ul>
        

        <p> &copy; 2019 stacademy.de All Rights Reserved.</p>
        <p>Developed by E.C.</p>
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

export default compose(withRouter,
  connect(mapStateToProps),
  firestoreConnect()
)(FooterContainer);
