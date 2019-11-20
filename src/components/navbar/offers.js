import React, { Component } from "react";
import Offer from "./offer";

class Offers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDrop: false
    };
  }

  //Handles dopdown Menu

  handleDropdown = e => {
    // e.preventDefault();
    const dropdownContent = document.getElementById(this.props.strings);
    console.log(dropdownContent);
    dropdownContent.classList.toggle("drop");
    return console.log(dropdownContent.classList);
  };

  render() {
    const {
      dropMenu,
      toggleClass,
      language,
      strings,
      linkInitial
    } = this.props;
    const offersArray = Object.keys(dropMenu).map(i => dropMenu[i]);
    return (
      <div>
        <li className="nav-link" onClick={this.handleDropdown}>
          {strings} <i className="fas fa-sort-down" />
        </li>
        <ul className="dropdown-content" id={strings}>
          {offersArray.map((module, index) => {
            return (
              <Offer
                key={module}
                index={index}
                module={module}
                toggleClass={toggleClass}
                handleDropdown={this.handleDropdown}
                language={language}
                linkInitial={linkInitial}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
export default Offers;
