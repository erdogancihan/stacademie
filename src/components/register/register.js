import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Helmet } from "react-helmet";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        accept: false,
        callme: false,
        email: "",
        message: "",
        name: "",
        phoneNumber: ""
      },
      responseText: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static contextTypes = { store: PropTypes.object.isRequired };

  onChange(e) {
    let checked = e.target.checked;
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = checked;
    }

    this.setState({
      message: { ...this.state.message, [e.target.name]: value }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { firestore, firebase } = this.context.store;

    let data = {
      message: { ...this.state.message }
    };
    const collectionName = "messages";
    const sendmail = firebase.functions().httpsCallable("sendMail");

    sendmail(data.message).then(result => {
           console.log(result);
    });

    firestore
      .add(
        {
          collection: collectionName
        },
        data
      )
      .then(resp => {
        this.setState({
          message: {
            accept: false,
            callme: false,
            email: "",
            message: "",
            name: "",
            phoneNumber: ""
          },
          responseText: this.props.strings.register.success
        });
        return console.log(resp);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    let { strings, error } = this.props;

    return (
      <section>
        <Helmet>
          <meta charset="utf-8" />
          <title>{strings.register.title}</title>
          <meta name="description" content={strings.register.description} />
          <link rel="canonical" href={"https://st-akademie.de/register"} />
        </Helmet>

        <div className="container register">
          <h1>{strings.register.title}</h1>
          <form name="register" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="Name">{strings.register.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                aria-describedby="Name"
                placeholder={strings.register.name}
                onChange={this.onChange}
                value={this.state.message.name}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailAddress">{strings.register.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                aria-describedby="email"
                placeholder={strings.register.email}
                onChange={this.onChange}
                value={this.state.message.email}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telephoneNumber">
                {strings.register.telephone}
              </label>
              <input
                type="phone"
                id="phoneNumber"
                name="phoneNumber"
                aria-describedby="phoneNumber"
                placeholder={strings.register.telephone}
                onChange={this.onChange}
                value={this.state.message.phoneNumber}
              />
            </div>
            <div className="registerCheckbox">
              <input
                type="checkbox"
                id="callme"
                name="callme"
                aria-describedby="callme"
                onChange={this.onChange}
                checked={this.state.message.callme}
              />
              <label htmlFor="callme">{strings.register.callme}</label>
            </div>
            <div className="form-group">
              <label htmlFor="message">{strings.register.message}</label>
              <textarea
                className="message"
                id="message"
                name="message"
                aria-describedby="message"
                placeholder={strings.register.message}
                onChange={this.onChange}
                value={this.state.message.message}
                required
              />
            </div>

            <div className="registerCheckbox">
              <input
                type="checkbox"
                id="accept"
                name="accept"
                aria-describedby="accept"
                onChange={this.onChange}
                checked={this.state.message.accept}
                required
              />
              <label htmlFor="accept">{strings.register.accept}</label>
            </div>
            <div className="form-group">
              <button>{strings.register.send}</button>
            </div>
          </form>
        </div>
        <div className="text-center text-light toogle" id="message">
          {error.error !== false ? (
            <div className="responseText">
              <br />
              <p className="text-center error">{error.error}</p>
            </div>
          ) : (
            <div className="responseText">
              <br />
              <p className="text-center ">{this.state.responseText}</p>
            </div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    strings: state.language.strings,
    error: state.users
  };
};
export default connect(mapStateToProps)(Register);
