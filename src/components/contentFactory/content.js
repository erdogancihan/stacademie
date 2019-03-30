import React, { Component } from "react";

class Content extends Component {
  render() {
    const { contents, metaData, className } = this.props;
    return contents.map((content,index) => {
      return (
        <div className="container" key={index}>
          <div  className={className}>
            {content.img === "" ? null : (
              <div className="picture">
                <img src={content.img} alt={metaData.title} />
              </div>
            )}

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
