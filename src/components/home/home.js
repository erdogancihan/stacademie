import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Courses from "./courses";
import ContentFactory from "../contentFactory/contentFactory";
import Img1 from "../../images/acetylene-1239331_1920.jpg";
import Img2 from "../../images/welder-673559_1920.jpg";
import Img3 from "../../images/welder-3018425_1920.jpg";
import Img4 from "../../images/courses-background.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminClass: "hide",
      slideIndex: 0,
      slideDirection: "",
      showTime: [
        {
          showtimeTextHeader: "1 WIR HILFE DABEI, IHRE ALIEGE UMZUETEN",
          showtimeText: "wir hilfe dabei, ihre aliege umzuete.",
          image: Img1
        },
        {
          showtimeTextHeader: "2 WIR HILFE DABEI, IHRE ALIEGE UMZUETEN",
          showtimeText: "2 wir hilfe dabei, ihre aliege umzuete.",
          image: Img2
        },
        {
          showtimeTextHeader: "3 WIR HILFE DABEI, IHRE ALIEGE UMZUETEN",
          showtimeText: "3 wir hilfe dabei, ihre aliege umzuete.",
          image: Img3
        },
        {
          showtimeTextHeader: "4 WIR HILFE DABEI, IHRE ALIEGE UMZUETEN",
          showtimeText: "4 wir hilfe dabei, ihre aliege umzuete.",
          image: Img4
        }
      ]
    };
  }

  slide = e => {
    e.target.id === "left"
      ? this.state.slideIndex === 0
        ? this.setState({
            slideIndex: this.state.showTime.length - 1,
            slideDirection: "slide-left"
          })
        : this.setState({
            slideIndex: this.state.slideIndex - 1,
            slideDirection: "slide-left"
          })
      : this.state.slideIndex === this.state.showTime.length - 1
      ? this.setState({
          slideIndex: 0,
          slideDirection: "slide-right"
        })
      : this.setState({
          slideIndex: this.state.slideIndex + 1,
          slideDirection: "slide-right"
        });
  };

  render() {
    const classNames = this.state.slideDirection;
    const { strings, lang } = this.props;

    return (
      <div>
        <section className="showtime">
          <div id="leftArrow" onClick={this.slide}>
            <i id="left" className="fas fa-angle-left" />
          </div>
          <div id="rightArrow" onClick={this.slide}>
            <i id="right" className="fas fa-angle-right" />
          </div>
          <div className="slide">
            <TransitionGroup
              childFactory={child => React.cloneElement(child, { classNames })}
            >
              <CSSTransition
                key={this.state.slideIndex}
                timeout={1000}
                classNames={classNames}
              >
                <img
                  src={this.state.showTime[this.state.slideIndex].image}
                  alt=""
                />
              </CSSTransition>
            </TransitionGroup>

            <TransitionGroup>
              <CSSTransition
                key={this.state.slideIndex}
                timeout={1000}
                classNames="showtimeText"
              >
                <div className="showtimeText">
                  <h1>
                    {
                      this.state.showTime[this.state.slideIndex]
                        .showtimeTextHeader
                    }
                  </h1>
                  <p>
                    {
                      this.state.showTime[this.state.slideIndex]
                        .showtimeTextHeader
                    }{" "}
                  </p>
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        </section>

        <ContentFactory link={"home1"} />
        <Courses strings={strings} lang={lang} />
        <ContentFactory link={"home2"} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  //console.log(state);
  let collection = "home";
  return {
    lang: state.language.language,
    auth: state.firebase.auth,
    content: state.firestore.data[collection],
    strings: state.language.strings
  };
};
export default connect(mapStateToProps)(Home);
