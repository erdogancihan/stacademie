import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import EditorContainer from "./editorContainer";
import Content from "./content";

class ContentFactory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: "",
      contents: [{ content: `loading...`, img: "" }],
      metaData: { title: "", description: "" },
      edit: false,
      adminClass: "hide"
    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const collectionName = this.props.match.params.link;
    this.setState({
      collection: collectionName
    });
    const { firestore } = this.context.store;

    const collections = [
      "about",
      "employer",
      "further",
      "certificates",
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

  getImage = (name, index) => {
    const { firebase } = this.context.store;
    const storage = firebase.storage();
    let storageRef = storage.ref();
    let imagesRef = storageRef.child("images/" + name + ".jpg");
    imagesRef
      .getDownloadURL()
      .then(url => {
        let newContent = this.state.contents[index];
        newContent["img"] = url;
        console.log(index);
        this.setState({
          [this.state.contents[index]]: newContent
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          [this.state.contents[index]]: ""
        });
      });
  };

  componentDidUpdate(previousProps) {
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
        let contentArray = null;
        this.props.content[this.props.lang].contents
          ? (contentArray = this.props.content[this.props.lang].contents)
          : (contentArray = this.state.contents);
        this.setState(
          {
            contents: contentArray,
            metaData: {
              title: this.props.content[this.props.lang].metaData.title,
              description: this.props.content[this.props.lang].metaData
                .description
            }
          },
          () => {
            for (let i = 0; i < this.state.contents.length; i++) {
              this.getImage(this.state.collection + i, i);
            }
          }
        );
      } else
        this.setState({
          contents: [{ content: "lütfen veri girişi yapınız.", img: "" }]
        });
    }
  }

  //handles changes on CKEditor for article content
  onChange = evt => {
    //  console.log(evt.editor.config.bodyId);
    const editorName = evt.editor.config.bodyId;
    let newContent =this.state.contents[editorName];
    console.log(newContent);
    newContent["content"] = evt.editor.getData();
    console.log(newContent);
    console.log(this.state.contents[editorName]);
    this.setState({
      [this.state.contents[editorName]]: newContent
    });

    // console.log(evt.editor.getData());
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //save data to database
  dbAdd = () => {
    const { firestore } = this.context.store;
    let data = {
      contents: this.state.contents,
      metaData: this.state.metaData
    };
    console.log(data);
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
  };

  addContent = () => {
    const newContent = { content: `loading...`, img: "" };
    this.setState({
      contents: [...this.state.contents, newContent]
    });
    console.log(this.state.contents);
  };

  removeContent = e => {
    e.preventDefault();
    const index = e.target.id;
    const newContent = this.state.contents;
    newContent.splice(index, 1);

    const { firestore } = this.context.store;
    const collectionName = this.state.collection;
    let data = {
      contents: newContent,
      metaData: this.state.metaData
    };
    firestore
      .update(
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
  };

  toggleEdit = () => {
    //console.log(this.state);
    if (this.state.edit === true) {
      this.dbAdd();
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
    return (
      <section>
        <Helmet>
          <meta charset="utf-8" />
          <title>{this.state.metaData.title}</title>
          <meta name="description" content={this.state.metaData.description} />
          <link
            rel="canonical"
            href={"https://stacademie.de/" + this.state.collection}
          />
        </Helmet>
        {this.state.edit === true ? (
          <EditorContainer
            CKChange={this.onChange}
            handleChange={this.handleChange}
            toggleEdit={this.toggleEdit}
            handleFileSelect={this.handleFileSelect}
            metaData={this.state.metaData}
            contents={this.state.contents}
            collection={this.state.collection}
            addContent={this.addContent}
            removeContent={this.removeContent}
          />
        ) : (
          <Content
            contents={this.state.contents}
            metaData={this.state.metaData}
          />
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
