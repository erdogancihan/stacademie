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
    const shrinkContent = document.getElementsByClassName("dropdown-content");
    //console.log(shrinkContent);
    //console.log(dropdownContent);
    for (let i = 0; i < 2; i++) {
      if (shrinkContent[i].id !== dropdownContent.id) {
        console.log(shrinkContent[i].id);
        shrinkContent[i].classList.remove("drop");
      }
    }
    dropdownContent.classList.toggle("drop");

    return;
  };

  render() {
    const { dropMenu, toggleClass, language, strings } = this.props;

    const offersArray = Object.keys(dropMenu).map(i => dropMenu[i]);
    // console.log(offersArray)
    return (
      <div>
        <li className="nav-link" onClick={this.handleDropdown}>
          {strings} <i className="fas fa-sort-down" />
        </li>
        <ul className="dropdown-content" id={strings}>
          {offersArray.map(module => {
            const key = Object.keys(dropMenu)[
              Object.values(dropMenu).indexOf(module)
            ];

            return (
              <Offer
                key={key}
                link={key}
                module={module}
                toggleClass={toggleClass}
                handleDropdown={this.handleDropdown}
                language={language}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
export default Offers;
