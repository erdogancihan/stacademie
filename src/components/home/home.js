import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import HomeEdit from "./homeEdit";
import Courses from "./courses";
import Img1 from "../../images/acetylene-1239331_1920.jpg";
import Img2 from "../../images/welder-673559_1920.jpg";
import Img3 from "../../images/welder-3018425_1920.jpg";
import Img4 from "../../images/courses-background.jpg";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content0: `0 loading...`,
      content1: `1 loading...`,
      homecontent0: "",
      homecontent1: "",
      title: "",
      description: "",
      edit: false,
      adminClass: "hide",
      img: "",
      collectionName: "home",
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
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.onSnapshot({
      collection: this.state.collectionName
    });
  }

  componentDidUpdate(previousProps) {
    const { firebase } = this.context.store;
    if (
      previousProps.lang !== this.props.lang ||
      previousProps.auth !== this.props.auth ||
      previousProps.content !== this.props.content
    ) {
      console.log(this.props.auth.isAdmin);
      this.props.auth.isAdmin
        ? this.setState({
            adminClass: "editButtons"
          })
        : this.setState({
            adminClass: "hide"
          });
      if (this.props.content && this.props.content[this.props.lang]) {
        this.setState({
          content0: this.props.content[this.props.lang].content0,
          content1: this.props.content[this.props.lang].content1,
          title: this.props.content[this.props.lang].title,
          description: this.props.content[this.props.lang].description
        });
      } else this.setState({ content: "lütfen veri girişi yapınız." });

      const storage = firebase.storage();
      let storageRef = storage.ref();
      /*
      const getImages = (name, index) => {
        let imagesRef = storageRef.child("images/" + name + ".jpg");
        imagesRef.getDownloadURL().then(url => {
          let newShowtime = this.state.showTime[index];
          newShowtime["image"] = url;
          this.setState({
            [this.state.showTime[index]]: newShowtime
          });
          //console.log(url);
        });
      };
      */
      const getImage = name => {
        let imagesRef = storageRef.child("images/" + name + ".jpg");
        imagesRef
          .getDownloadURL()
          .then(url => {
            this.setState({
              [name]: url
            });
            console.log(url);
          })
          .catch(err => {
            //  console.log(err);
            this.setState({
              [name]: ""
            });
          });
      };

      /*
      const imagesArray0 = ["showtime1", "showtime2", "showtime3", "showtime4"];
      imagesArray0.forEach((img, index) => {
        getImages(img, index);
      });
      */
      const imagesArray1 = ["homecontent0", "homecontent1"];
      imagesArray1.forEach(img => {
        getImage(img);
      });
    }
  }

  //handles changes on CKEditor for article content
  onChange = evt => {
    let newContent = evt.editor.getData();
    this.setState({
      ...this.state,
      [evt.editor.config.bodyId]: newContent
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggleEdit = () => {
    if (this.state.edit === true) {
      const { firestore } = this.context.store;
      let data = {
        content0: this.state.content0,
        content1: this.state.content1,
        title: this.state.title,
        description: this.state.description
      };

      firestore
        .set(
          {
            collection: this.state.collectionName,
            doc: this.props.lang
          },
          data
        )
        .then(resp => {
          return console.log(resp);
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.setState({
      edit: !this.state.edit
    });
  };

  handleFileSelect = e => {
    e.preventDefault();
    const imageName = e.target.name;
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
      alert("The File APIs are not fully supported in this browser.");
    }
    let file = e.target.files[0];

    const { firebase } = this.context.store;

    const storage = firebase.storage();
    let storageRef = storage.ref();
    let imagesRef = storageRef.child("images/" + imageName + ".jpg");
    imagesRef.put(file).then(snapshot => {
      console.log(imageName + " resim yükleme durumu=  " + snapshot.state);
    });
  };

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
    const { strings,lang } = this.props;

    return (
      <section>
        <Helmet>
          <meta charset="utf-8" />
          <title>{this.state.title}</title>
          <meta name="description" content={this.state.description} />
          <link
            rel="canonical"
            href={"https://stacademie.de/" + this.state.collectionName}
          />
        </Helmet>
        {this.state.edit === true ? (
          <HomeEdit
            onChange={this.onChange}
            handleChange={this.handleChange}
            toggleEdit={this.toggleEdit}
            handleFileSelect={this.handleFileSelect}
            state={this.state}
          />
        ) : (
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
                  childFactory={child =>
                    React.cloneElement(child, { classNames })
                  }
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

            <section>
              <div className="container ">
                <div className="picture">
                  {this.state.homecontent0 === "" ? null : (
                    <img
                      src={this.state.homecontent0}
                      alt={
                        "Schweiss Technic Academie " +
                        this.props.match.params.link
                      }
                    />
                  )}
                </div>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: this.state.content0 }}
                />
              </div>
            </section>
            <Courses strings={strings} lang={lang} />
            <section>
              <div className="container ">
                <div className="picture">
                  {this.state.homecontent1 === "" ? null : (
                    <img
                      src={this.state.homecontent1}
                      alt={
                        "Schweiss Technic Academie " +
                        this.props.match.params.link
                      }
                    />
                  )}
                </div>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: this.state.content1 }}
                />
              </div>
            </section>
          </div>
        )}

        <div className={this.state.adminClass} onClick={this.toggleEdit}>
          <i className="fas fa-edit" /> <span> </span>{" "}
          {this.state.edit === false ? <i>Düzenle </i> : <i>Kaydet</i>}
        </div>
      </section>
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
