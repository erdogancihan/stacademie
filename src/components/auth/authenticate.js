import React, { Component } from "react";
import PropTypes from "prop-types";

function authenticate(WrappedComponent) {
  class Authenticate extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.onInputChange = this.onInputChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
    static contextTypes = {
      store: PropTypes.object.isRequired
    };
    //reset customvalidate
    validateReset = () => {
      if (document.getElementById("password1")) {
        document.getElementById("password1").setCustomValidity("");
      }
      if (document.getElementById("newPassword1")) {
        document.getElementById("newPassword1").setCustomValidity("");
      }
    };
    //set customvalidate
    validate = () => {
      if (document.getElementById("password1")) {
        if (this.state.password !== this.state.password1) {
          document
            .getElementById("password1")
            .setCustomValidity(this.props.strings.auth.passwordsNotMatch);
        }
      }
      if (document.getElementById("newPassword1")) {
        if (this.state.newPassword !== this.state.newPassword1) {
          document
            .getElementById("newPassword1")
            .setCustomValidity(this.props.strings.auth.passwordsNotMatch);
        }
      }
    };

    onInputChange(e) {
      this.validateReset();
      const inputName = e.target.name;
      const inputValue = e.target.value;
      this.setState({ [inputName]: inputValue }, () => {
        this.validate();
      });
    }
    

    onSubmit(e) {
      e.preventDefault();
      if (e.target.name === "signUp") {
        if (this.state.password !== this.state.password1) {
        } else {
          this.props.onSubmit(this.state);
        }
      } else if (e.target.name === "changePassword") {
        if (this.state.newPassword !== this.state.newPassword1) {
          alert("Şifreler Eşleşmiyor. Lütfen Tekrar deneyiniz.");
        } else {
          this.props.onSubmit(this.state);
        }
      } else {
        this.props.onSubmit(this.state);
      }
    }

    render() {
      const { onSubmit, ...otherProps } = this.props;
      return (
        <WrappedComponent
          onChange={this.onInputChange}
          onSubmit={this.onSubmit}
          {...otherProps}
        />
      );
    }
  }
  return Authenticate;
}

export default authenticate;
