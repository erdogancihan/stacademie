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
      edit: false,
      adminClass: "hide",
      className: "contents"
    };
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (this.props.link) {
      this.setState({
        className: "container"
      });
    }
    this.props.isAdmin
      ? this.setState({
          adminClass: "editButtons"
        })
      : this.setState({
          adminClass: "hide"
        });

    const collections = [
      "home1",
      "home2",
      "home3",
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
      "module10",
      "about1",
      "about2",
      "about3",
      "about4",
      "about6",
      "about7",
      "about8",

    ];
    const { firestore } = this.context.store;
    collections.forEach(collection => {
      firestore.onSnapshot({
        collection
      });
    });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.isAdmin !== this.props.isAdmin) {
      this.props.isAdmin
        ? this.setState({
            adminClass: "editButtons"
          })
        : this.setState({
            adminClass: "hide"
          });
    }
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  render() {
    const defaultPropsData = {
      [this.props.lang]: {
        contents: [{ content: "loading..", img: "" }],
        metaData: { title: "title", description: "description" }
      }
    };
    const { contentData = defaultPropsData, lang,classNames } = this.props;
    const collection = this.props.collection;

    return contentData && contentData[lang] ? (
      <section>
        <Helmet>
          <meta charset="utf-8" />
          <title>{contentData[lang].metaData.title}</title>
          <meta
            name="description"
            content={contentData[lang].metaData.description}
          />
          <link rel="canonical" href={"https://st-akademie.de/" + collection} />
        </Helmet>
        {this.state.edit === true ? (
          <EditorContainer
            contents={contentData[lang].contents}
            metaData={contentData[lang].metaData}
            collection={collection}
            toggleEdit={this.toggleEdit}
            lang={lang}
          />
        ) : (
          <Content
            contents={contentData[lang].contents}
            metaData={contentData[lang].metaData}
            className={"contents "+ classNames  }
          />
        )}

        {this.state.edit === false ? (
          <div className={this.state.adminClass} onClick={this.toggleEdit}>
            <i className="fas fa-edit" /> <i>Düzenle </i>
          </div>
        ) : null}
      </section>
    ) : (
      <section>
        {this.state.edit === true ? (
          <EditorContainer
            contents={defaultPropsData[this.props.lang].contents}
            metaData={defaultPropsData[this.props.lang].metaData}
            collection={collection}
            toggleEdit={this.toggleEdit}
            lang={lang}
          />
        ) : (
          <Content
            contents={defaultPropsData[this.props.lang].contents}
            metaData={defaultPropsData[this.props.lang].metaData}
          />
        )}
        {this.state.edit === false ? (
          <div className={this.state.adminClass} onClick={this.toggleEdit}>
            <i className="fas fa-edit" /> <i>Düzenle </i>
          </div>
        ) : null}
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  //console.log(props);
  let collection = props.match ? props.match.params.link : props.link;
  return {
    lang: state.language.language,
    auth: state.firebase.auth,
    contentData: state.firestore.data[collection],
    isAdmin: state.users.isAdmin,
    collection
  };
};
export default connect(mapStateToProps)(ContentFactory);
