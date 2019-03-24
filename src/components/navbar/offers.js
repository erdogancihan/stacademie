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

  handleDropdown = (e) => {
  // e.preventDefault();
    const dropdownContent = document.getElementById("dropdownContent");
    return dropdownContent.classList.toggle("drop");
  };

  render() {
    const { strings, toggleClass, language } = this.props;
    const offersArray = Object.keys(strings.offers).map(i => strings.offers[i]);

    return (
      <React.Fragment>
        <li
          className="nav-link"
          onClick={this.handleDropdown}
           >
          {strings.navbar.offers} <i className="fas fa-sort-down" />
        </li>

        <ul className="dropdown-content" id="dropdownContent"
        >
          {offersArray.map((module, index) => {
            return (
              <Offer
                key={module}
                index={index}
                module={module}
                toggleClass={toggleClass}
                handleDropdown={this.handleDropdown}
                language={language}
              />
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}
export default Offers;
