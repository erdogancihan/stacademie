import React, { Component } from "react";
import { connect } from "react-redux";


import {
  setLanguage,
  getLanguage
} from "../../store/actions/languagesActionCreator";


export class Topnav extends Component {
  componentDidMount() {
    //gets the language from the local stroge.
    const lang = localStorage.getItem("language");
    //dispatches action to change the language from the reducer.
    this.props.setLanguage(lang);
    this.props.getLanguage();
  }

  //dispatches an action to change the language.
  handleSetLang = e => {
    const lang = e.target.id;
    this.props.setLanguage(lang);
   
  };
  componentDidUpdate() {
    //changes the class of the selected item
    let active = this.props.language.language;
    switch (active) {
      case "tr":
        document.getElementById("tr").classList.add("active-lang");
        document.getElementById("de").classList.remove("active-lang");
        return (document.getElementById("en").classList.remove("active-lang"));
      case "de":
      document.getElementById("tr").classList.remove("active-lang");
        document.getElementById("de").classList.add("active-lang");
        return (document.getElementById("en").classList.remove("active-lang"));
      case "en":
      document.getElementById("tr").classList.remove("active-lang");
        document.getElementById("de").classList.remove("active-lang");
        return (document.getElementById("en").classList.add("active-lang"));
      default:
      document.getElementById("tr").classList.remove("active-lang");
      document.getElementById("de").classList.remove("active-lang");
      return (document.getElementById("en").classList.remove("active-lang"));
    }
  }
  render() {
    return (
      <div className="topnav notranslate">
        <ul className="nav" id="languageUl">
          <li className="nav-item" id="tr" onClick={this.handleSetLang}>
            tr
          </li>

          <li className="nav-item" id="de" onClick={this.handleSetLang}>
            de
          </li>

          <li className="nav-item" id="en" onClick={this.handleSetLang}>
            en
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    language: state.language
  };
};
const mapDispatchToprops = dispatch => {
  return {
    setLanguage: lang => dispatch(setLanguage(lang)),
    getLanguage: () => dispatch(getLanguage()),

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToprops
)(Topnav);
