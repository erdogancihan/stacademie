import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import CertificatesEdit from "./certificatesEdit";

class Certificates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: "certificates",
      content0: `loading...`,
      certificate0: "",
      content1: `loading...`,
      certificate1: "",
      content2: `loading...`,
      certificate2: "",
      title: "",
      description: "",
      edit: false,
      adminClass: "hide",
      img: ""
    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
   // console.log(this.props);
    const collectionName = this.state.collection;
    const { firestore } = this.context.store;

    firestore.onSnapshot({
      collection: collectionName
    });
  }
  componentDidUpdate(previousProps) {
    const { firebase } = this.context.store;
    //console.log(previousProps.match.params.link);
    // console.log(this.state.collection )

    if (
      previousProps.lang !== this.props.lang ||
      previousProps.auth !== this.props.auth ||
      previousProps.content !== this.props.content
    ) {
      !this.props.auth.isAdmin
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
          content2: this.props.content[this.props.lang].content2,
          title: this.props.content[this.props.lang].title,
          description: this.props.content[this.props.lang].description
        });
      } else this.setState({ content: "lütfen veri girişi yapınız." });
      const storage = firebase.storage();
      let storageRef = storage.ref();

      const getImage = name => {
        let imagesRef = storageRef.child("images/" + name + ".jpg");
        imagesRef
          .getDownloadURL()
          .then(url => {
            this.setState({
              [name]: url
            });
            //console.log(url);
          })
          .catch(err => {
            //  console.log(err);
            this.setState({
              [name]: ""
            });
          });
      };
      const imagesArray1 = ["certificate0", "certificate1", "certificate2"];
      imagesArray1.forEach(img => {
        getImage(img);
      });
    }
  }

  //handles changes on CKEditor for article content
  onChange = evt => {
    console.log(evt.editor.config.bodyId);

    const editorName = () => {
      if (evt.editor.config.bodyId === "editor0") {
        return "content0";
      } else if (evt.editor.config.bodyId === "editor1") {
        return "content1";
      } else return "content2";
    };

    console.log(editorName());

    let newContent = evt.editor.getData();
    this.setState({
      ...this.state,
      [editorName()]: newContent
    });

    // console.log(evt.editor.getData());
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggleEdit = () => {
    //console.log(this.state);
    if (this.state.edit === true) {
      const { firestore } = this.context.store;

      let data = {
        content0: this.state.content0,
        content1: this.state.content1,
        content2: this.state.content2,
        title: this.state.title,
        description: this.state.description
      };
      const collectionName = this.state.collection;
      firestore
        .set(
          {
            collection: collectionName,
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

  render() {
    //console.log(this.props);
    return (
      <section>
        <Helmet>
          <meta charset="utf-8" />
          <title>{this.state.title}</title>
          <meta name="description" content={this.state.description} />
          <link
            rel="canonical"
            href={"https://stacademie.de/" + this.state.collection}
          />
        </Helmet>
        {this.state.edit === true ? (
          <CertificatesEdit
            onChange={this.onChange}
            handleChange={this.handleChange}
            toggleEdit={this.toggleEdit}
            handleFileSelect={this.handleFileSelect}
            state={this.state}
          />
        ) : (
          <div>
            <div className="content-container">
              <div className="picture">
                <img
                  src={this.state.certificate0}
                  alt="Schweiss Technic Academie Certificate"
                />
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: this.state.content0 }}
              />
            </div>
            <div className="content-container">
              <div className="picture">
                <img
                  src={this.state.certificate1}
                  alt="Schweiss Technic Academie Certificate"
                />
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: this.state.content1 }}
              />
            </div>
            <div className="content-container">
              <div className="picture">
                <img
                  src={this.state.certificate2}
                  alt="Schweiss Technic Academie Certificate"
                />
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: this.state.content2 }}
              />
            </div>
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
  //console.log(props, state);
  let collection = "certificates";
  return {
    lang: state.language.language,
    auth: state.firebase.auth,
    content: state.firestore.data[collection]
  };
};
export default connect(mapStateToProps)(Certificates);
