import React from "react";
import CKEditor from "react-ckeditor-component";

function Editor(props) {
  // console.log(props.content);

  return (
    <div className="editor__edit">
      <h2> {"İçerik ' " + props.index + " ' Düzenle "}</h2>
      <div className="add-image">
        <label
          className=" custom-file-upload"
          htmlFor={props.collection + props.index}
          name={props.index}
        >
          Resim Seç
          <input
            type="file"
            id={props.collection + props.index}
            name={props.index}
            aria-describedby={props.collection + props.index}
            onChange={props.handleFileSelect}
          />
        </label>
        {props.content.img === "" ? null : (
          <React.Fragment>
            <a
              className="custom-file-upload"
              href={props.content.img}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mevcut Resmi Göster
            </a>
            <label
              className=" custom-file-upload"
              data-name={props.content.img}
              data-index={props.index}
              htmlFor="file5"
              onClick={props.removeImage}
            >
              Resmi Sil
            </label>
          </React.Fragment>
        )}
      </div>
      <CKEditor
        className="CKeditor"
        content={props.content.content}
        config={{ bodyId: props.index }}
        events={{
          change: props.CKChange
        }}
      />
    </div>
  );
}

export default Editor;
