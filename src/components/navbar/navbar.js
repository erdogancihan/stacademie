import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import CookieConsent from "react-cookie-consent";
import PropTypes from "prop-types";

import { logOut, isAdmin } from "../../store/actions/usersActionCreator";
import Offers from "./offers";

import LoggedIn from "./loggedIn";
import Admin from "./admin";
import logo from "../../images/logo/logo1.jpg";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "user"
    };
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
        if (auth.emailVerified === true) {
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
    const authListener = firebase.auth();
    authListener.onAuthStateChanged(user => {
      this.props.isAdmin(user);
    });
  }

  LogOut = () => {
    this.props.logOut();
  };

  toggleClass = (params = "") => {
    //dropdowns menu when window width is LE 740px
    const width = window.outerWidth;
    if (width <= 740) {
      if (params === "navbar-brand") {
        const navs = document.querySelectorAll(".navbar-items");
        navs.forEach(nav => nav.classList.remove("navbar-toggleShow"));
      }else{
        const navs = document.querySelectorAll(".navbar-items");
        navs.forEach(nav => nav.classList.toggle("navbar-toggleShow"));
      }
    }
    const dropDownContent = document.querySelectorAll(".dropdown-content");

    dropDownContent.forEach(item => {
      return item.classList.value !== "dropdown-content drop"
        ? () => {
            console.log(item, "1");
          }
        : item.classList.remove("drop");
    });
  };

  setNavlinkClass = path => {
    return this.props.location.pathname === path ? "active" : "nav-link";
  };

  render() {
    const { strings, auth, language, isAdmin } = this.props;

    return (
      <div>
        <nav className=" navbar notranslate">
          <CookieConsent buttonText="OK">
            Diese Website nutzt Cookies, um bestmögliche Funktionalität bieten
            zu können.
            <Link
              to={"/" + language + "/terms"}
              style={{ color: "#fefefe", textDecoration: "underline" }}
            >
              Mehr erfahren
            </Link>
          </CookieConsent>

          <div
            className="navbar-brand"
            onClick={() => this.toggleClass("navbar-brand")}
          >
            <Link to="/">
              {" "}
              <img
                className="logo"
                src={logo}
                alt="Schweißtechnik Akademie GmbH"
              />{" "}
              Schweißtechnik Akademie{" "}
            </Link>
          </div>
          <div className=" nav-link-toggle" onClick={this.toggleClass}>
            <i className="fas fa-bars" />
          </div>
          <ul className="navbar-items">
            <Offers
              strings={strings.navbar.offers}
              dropMenu={strings.offers}
              toggleClass={this.toggleClass}
              language={language}
              linkInitial="/module"
            />
            <Offers
              strings={strings.navbar.about}
              dropMenu={strings.about}
              toggleClass={this.toggleClass}
              language={language}
              linkInitial="/about"
            />
            <li className={this.setNavlinkClass("/" + language + "/register")}>
              <Link
                to={"/" + language + "/register"}
                onClick={this.toggleClass}
              >
                {strings.navbar.register}
              </Link>
            </li>
            <li className={this.setNavlinkClass("/" + language + "/contact")}>
              <Link to={"/" + language + "/contact"} onClick={this.toggleClass}>
                {strings.navbar.contact}
              </Link>
            </li>
          </ul>

          <ul className="navbar-items navbar-items-right">
            {auth.isEmpty === true ? null : isAdmin ? (
              <React.Fragment>
                <Admin strings={strings} toggleClass={this.toggleClass} />
                <LoggedIn
                  user={auth}
                  LogOut={this.LogOut}
                  strings={strings}
                  toggleClass={this.toggleClass}
                />
              </React.Fragment>
            ) : (
              <LoggedIn
                user={auth}
                LogOut={this.LogOut}
                strings={strings}
                toggleClass={this.toggleClass}
              />
            )}
          </ul>
        </nav>
        <div id="navbarline" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.language.language,
    user: state.firestore.data.user,
    strings: state.language.strings,
    auth: state.firebase.auth,
    isAdmin: state.users.isAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    isAdmin: user => dispatch(isAdmin(user))
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect()
)(Navbar);
