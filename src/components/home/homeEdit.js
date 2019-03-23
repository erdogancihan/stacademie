import React from "react";
import CKEditor from "react-ckeditor-component";

const HomeEdit = ({ onChange, handleChange, handleFileSelect, state }) => {
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
          value={state.title}
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
          value={state.description}
          onChange={handleChange}
        />
      </div>
      
      <div className="editcontainer">
        <h2>İLK BÖLÜM</h2>
        <label className="form-control custom-file-upload" htmlFor="file5">
        İlk Bölüm Resim 
          <input
            type="file"
            id="file5"
            name="homecontent0"
            aria-describedby="file"
            onChange={handleFileSelect}
          />
        </label>

        <CKEditor
          className="CKeditor"
          content={state.content0}
          config={{bodyId:"content0"}}
          events={{
            change: onChange
          }}
        />
      </div>
      <div className="editcontainer">
        <h2>İKİNCİ BÖLÜM</h2>
        <label className="form-control custom-file-upload" htmlFor="file6">
        İkinci Bölüm Resim 
          <input
            type="file"
            id="file6"
            name="homecontent1"
            aria-describedby="file"
            onChange={handleFileSelect}
          />
        </label>

        <CKEditor
          className="CKeditor"
          content={state.content1}
          config={{bodyId:'content1'}}
          events={{
            change: onChange
          }}
        />
      </div>
    </div>
  );
};

export default HomeEdit;
