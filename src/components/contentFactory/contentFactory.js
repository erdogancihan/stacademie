import React, { Component } from "react";
import { connect } from "react-redux";
import CKEditor from "react-ckeditor-component";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

class ContentFactory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: `loading...`,
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
    
    const { firestore} = this.context.store;

    const collections = [
      "about",
      "employer",
      "further",
      "certicates",
      "terms",
      "impressum",
      "module1",
      "module2",
      "module3",
      "module4",
      "module5",
      "module6",
      "module7",
      "module8",
      "module9",
      "module10"
    ];
    collections.forEach(collection => {
      firestore.onSnapshot({
        collection
      });
    });


  }

  componentDidUpdate(previousProps) {
    const { firebase } = this.context.store;

    if (
      previousProps.lang !== this.props.lang ||
      previousProps.auth !== this.props.auth ||
      previousProps.content !== this.props.content
    ) {
      this.props.auth.isAdmin
        ? this.setState({
            adminClass: "editButtons"
          })
        : this.setState({
            adminClass: "hide"
          });
      if (this.props.content && this.props.content[this.props.lang]) {
        this.setState({
          content: this.props.content[this.props.lang].content,
          title: this.props.content[this.props.lang].title,
          description: this.props.content[this.props.lang].description
        });
      } else this.setState({ content: "lütfen veri girişi yapınız." });
      const collectionName = this.props.match.params.link;
      const storage = firebase.storage();
      let storageRef = storage.ref();
      let imagesRef = storageRef.child("images/" + collectionName + ".jpg");
      imagesRef.getDownloadURL().then(url => {
        this.setState({
          img: url
        });
        //console.log(url);
      }).catch(err => {
        //  console.log(err);
          this.setState({
            img: ""
          });
        });
    }
  }


  //handles changes on CKEditor for article content
  onChange = evt => {
    //console.log("onChange fired with event info: ", evt);
    let newContent = evt.editor.getData();
    this.setState({
      ...this.state,
      content: newContent
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
        content: this.state.content,
        title: this.state.title,
        description: this.state.description
      };
      const collectionName = this.props.match.params.link;
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
    const collectionName = this.props.match.params.link;
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
      alert("The File APIs are not fully supported in this browser.");
    }
    let file = e.target.files[0];
    console.log(file);
    const { firebase } = this.context.store;
    // const collectionName = this.props.match.params.link;
    const storage = firebase.storage();
    let storageRef = storage.ref();
    let imagesRef = storageRef.child("images/" + collectionName + ".jpg");
    imagesRef.put(file).then(snapshot => {
      console.log("uploaded a file");
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
            href={"https://stacademie.de/" + this.props.match.params.link}
          />
        </Helmet>
        {this.state.edit === true ? (
          <div className="editor">
            <div className="form-group">
              <label className="form-control" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="title"
                placeholder="Sayfa başlığı girin."
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-control" htmlFor="description">
                Description{" "}
                <span className="blurred">
                  (Google arama sonuçlarında görünebilir olmak için açıklama
                  yazınız. Açıklama başlıktaki kelimeleri de içermeli ve 150
                  karakteri geçmemelidir.)
                </span>
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                aria-describedby="description"
                placeholder="Açıklama girin."
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>

            <label className="form-control custom-file-upload" htmlFor="file">
              Resim Seçin
              <input
                type="file"
                id="file"
                name="file"
                aria-describedby="file"
                onChange={this.handleFileSelect}
              />
            </label>

            <CKEditor
              className="CKeditor"
              content={this.state.content}
              events={{
                change: this.onChange
              }}
            />
          </div>
        ) : (
          <div className="content-container">
            <div className="picture">
              <img src={this.state.img} alt={"Schweiss Technic Academie "+this.props.match.params.link}/>
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: this.state.content }}
            />
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
  let collection = props.match.params.link;
  return {
    lang: state.language.language,
    auth: state.firebase.auth,
    content: state.firestore.data[collection]
  };
};
export default connect(mapStateToProps)(ContentFactory);
