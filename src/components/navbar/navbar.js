import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import CookieConsent from "react-cookie-consent";
import PropTypes from "prop-types";

import { logOut } from "../../store/actions/usersActionCreator";
import Offers from "./offers";

import LoggedIn from "./loggedIn";
import Admin from "./admin";


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore, firebase } = this.context.store;
    const auth = this.props.auth;
    const authListener = firebase.auth();

    authListener.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          auth.isAdmin = idTokenResult.claims.admin;
        });
        if (auth.uid && auth.emailVerified === true) {
          firestore.onSnapshot({
            collection: "users",
            doc: auth.uid,
            storeAs: "user"
          });
        }
      }
    });
  }

  componentDidUpdate() {
    const { firebase } = this.context.store;
    const auth = this.props.auth;
    const authListener = firebase.auth();

    authListener.onAuthStateChanged(user => {

      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
           auth.isAdmin = idTokenResult.claims.admin;
        });
      }
    });
  }

  LogOut = () => {
    console.log("logout");
    this.props.logOut();
  };

  toggleClass = () => {
    const navs = document.querySelectorAll(".navbar-items");
    navs.forEach(nav => nav.classList.toggle("navbar-toggleShow"));
  };

  setNavlinkClass = path => {
    return this.props.location.pathname === path ? "active" : "nav-link";
  };
  render() {
    const { strings, user, auth,language } = this.props;
   
    return (
      <nav className="navbar notranslate">
        <CookieConsent>
          This website uses cookies to enhance the user experience.
        </CookieConsent>

        <div className="navbar-brand">
          <Link to="/">Schweiss Technic Academie</Link>
        </div>
        <div className=" nav-link-toggle" onClick={this.toggleClass}>
          <i className="fas fa-bars" />
        </div>
        <ul className="navbar-items">
          <Offers strings={strings} toggleClass={this.toggleClass} language={language} />

          <li className={this.setNavlinkClass("/"+language+"/further")}>
            <Link to={"/"+language+"/further"} onClick={this.toggleClass}>
              {strings.navbar.furtherEducation}
            </Link>
          </li>
          <li className={this.setNavlinkClass("/"+language+"/employer")}>
            <Link to={"/"+language+"/employer"}onClick={this.toggleClass}>
              {strings.navbar.employer}
            </Link>
          </li>
          <li className={this.setNavlinkClass("/"+language+"/certificates")}>
            <Link to={"/"+language+"/certificates"} onClick={this.toggleClass}>
              {strings.navbar.certificates}
            </Link>
          </li>
          <li className={this.setNavlinkClass("/"+language+"/about")}>
            <Link to={"/"+language+"/about"}onClick={this.toggleClass}>
              {strings.navbar.about}
            </Link>
          </li>
        </ul>

        <ul className="navbar-items navbar-items-right">
          {!user ? null : auth.isAdmin === true ? (
            <React.Fragment>
              <Admin strings={strings} toggleClass={this.toggleClass} />
              <LoggedIn
                user={user}
                LogOut={this.LogOut}
                strings={strings}
                toggleClass={this.toggleClass}
              />
            </React.Fragment>
          ) : (
            <LoggedIn
              user={user}
              LogOut={this.LogOut}
              strings={strings}
              toggleClass={this.toggleClass}
            />
          )}
        </ul>
      </nav>
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

const mapDispatchToProps = dispatch => {
  return {
       logOut: () => dispatch(logOut())
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect()
)(Navbar);
