import React, { Component } from "react";

class Content extends Component {
  render() {
    const { contents,metaData } = this.props;
      return contents.map(content => {
      return (
        <div key={content.content}>
          <div className="content-container">
            <div className="picture">
              {content.img === "" ? null : (
                <img
                  src={content.img}
                  alt={metaData.title}
                />
              )}
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </div>
        </div>
      );
    });
  }
}
export default Content;
