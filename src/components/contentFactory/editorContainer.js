import React from "react";
import Editor from "./editor";

const EditorContainer = ({
  CKChange,
  handleChange,
  handleFileSelect,
  contents,
  metaData,
  collection,
  addContent,
  removeContent,
  removeImage
}) => {
  return (
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
          value={metaData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-control" htmlFor="description">
          Description{" "}
          <span className="blurred">
            (Google arama sonuçlarında görünebilir olmak için açıklama yazınız.
            Açıklama başlıktaki kelimeleri de içermeli ve 150 karakteri
            geçmemelidir.)
          </span>
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          aria-describedby="description"
          placeholder="Açıklama girin."
          value={metaData.description}
          onChange={handleChange}
        />
        <div className="add-image">
          <button className=" custom-file-upload" onClick={addContent}>
            Yeni İçerik Ekle
          </button>
          {contents.map((content, index) => {
            return (
              <button
                className=" custom-file-upload"
                key={index}
                id={index}
                onClick={removeContent}
              >
                {index + " nolu içeriği sil"}
              </button>
            );
          })}
        </div>
      </div>
      {contents.map((content, index) => {
        return (
          <Editor
            content={content}
            index={index}
            key={index}
            CKChange={CKChange}
            handleFileSelect={handleFileSelect}
            collection={collection}
            removeImage={removeImage}
          />
        );
      })}
    </div>
  );
};

export default EditorContainer;
