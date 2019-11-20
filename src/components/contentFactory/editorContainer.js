import React, { Component } from "react";
import Editor from "./editor";
import PropTypes from "prop-types";

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: [{ content: `loading...`, img: "" }],
      metaData: { title: "", description: "" }
    };
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.setState({
      contents: this.props.contents,
      metaData: this.props.metaData
    });
  }

  getImage = (name, id) => {
    const { firebase } = this.context.store;
    const storage = firebase.storage();
    let storageRef = storage.ref();
    let imagesRef = storageRef.child("images/" + name + ".jpg");
    id = parseInt(id);
    imagesRef
      .getDownloadURL()
      .then(url => {
        this.setState(
          {
            contents: this.state.contents.map((item, index) => {
              console.log(id, " ve ", index);
              return id !== index ? item : { ...item, img: url };
            })
          },
          () => {
            console.log(this.state);
            this.dbAdd();
          }
        );
      })
      .catch(err => {
        console.log(err);
        this.setState({
          [this.state.contents[id]]: ""
        });
      });
  };

  removeImage = e => {
    e.persist();
    const name = e.target.dataset.name;
    const id = parseInt(e.target.dataset.index);
    console.log(this.state.contents[id]);
    const { firebase } = this.context.store;
    const storage = firebase.storage();
    let httpsReference = storage.refFromURL(name);

    // Delete the file
    httpsReference
      .delete()
      .then(() => {
        console.log("File deleted successfully");
        this.setState(
          {
            contents: this.state.contents.map((item, index) => {
              return id !== index ? item : { ...item, img: "" };
            })
          },
          this.dbAdd()
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  //handles changes on CKEditor for article content
  onChange = evt => {
    const editorName = parseInt(evt.editor.config.bodyId);
    let newContent = evt.editor.getData();
    this.setState({
      contents: this.state.contents.map((item, index) => {
        return editorName !== index ? item : { ...item, content: newContent };
      })
    });
  };

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({
      metaData: { ...this.state.metaData, [e.target.name]: e.target.value }
    });
    console.log(this.state);
  };

  //save data to database
  dbAdd = () => {
    const { firestore } = this.context.store;
    let data = {
      contents: [...this.state.contents],
      metaData: { ...this.state.metaData }
    };
    console.log(data);
    console.log(this.props);
    const collectionName = this.props.collection;
    firestore
      .set(
        {
          collection: collectionName,
          doc: this.props.lang
        },
        data
      )
      .then(resp => {
        return resp;
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
  };

  removeContent = e => {
    e.preventDefault();
    const id = parseInt(e.target.id);
    const newContents = this.state.contents.filter((content, index) => {
      return index === id ? null : content;
    });
    const { firestore } = this.context.store;
    const collectionName = this.props.collection;
    this.setState(
      {
        contents: newContents,
        metaData: { ...this.state.metaData }
      },
      () => {
        firestore
          .update(
            {
              collection: collectionName,
              doc: this.props.lang
            },
            this.state
          )
          .then(resp => {
            return console.log(resp);
          })
          .catch(error => {
            console.log(error);
          });
      }
    );
  };

  handleFileSelect = e => {
    e.preventDefault();
    e.persist();
    const imageName = Math.floor(Math.random() * 10000);
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
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(imageName + " yükleme durumu: " + progress + "%");
      this.getImage(imageName, e.target.name);
    });
  };

  render() {
    const { collection, toggleEdit } = this.props;

    return (
      <div className="container">
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
              value={this.state.metaData.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-control" htmlFor="description">
              Description{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              aria-describedby="description"
              placeholder="Açıklama girin."
              value={this.state.metaData.description}
              onChange={this.handleChange}
            />
          </div>
          <p className="blurred">
            (Google arama sonuçlarında görünebilir olmak için açıklama yazınız.
            Açıklama başlıktaki kelimeleri de içermeli ve 150 karakteri
            geçmemelidir.)
          </p>
          <div className="add-image">
            <button className=" custom-file-upload" onClick={this.addContent}>
              Yeni İçerik Ekle
            </button>
            {this.state.contents.map((content, index) => {
              return (
                <button
                  className=" custom-file-upload"
                  key={index}
                  id={index}
                  onClick={this.removeContent}
                >
                  {' " ' + index + ' " ' + " nolu içeriği sil"}
                </button>
              );
            })}
          </div>
          {this.state.contents.map((content, index) => {
            return (
              <Editor
                content={content}
                index={index}
                key={index}
                CKChange={this.onChange}
                handleFileSelect={this.handleFileSelect}
                collection={collection}
                removeImage={this.removeImage}
              />
            );
          })}
          <div
            className={"editButtons"}
            onClick={() => {
              toggleEdit();
              this.dbAdd();
            }}
          >
            {" "}
            <i className="fas fa-edit" /> <i> Kaydet</i>{" "}
          </div>
        </div>
      </div>
    );
  }
}
export default EditorContainer;
