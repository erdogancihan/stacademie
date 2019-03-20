import React from "react";
import CKEditor from "react-ckeditor-component";

const CertificatesEdit = ({ onChange, handleChange, handleFileSelect, state }) => {
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
        <h2> Birinci Sertifika</h2>
        <label className="form-control custom-file-upload" htmlFor="file5">
        Birinci Sertifika
          <input
            type="file"
            id="file5"
            name="certificate0"
            aria-describedby="file"
            onChange={handleFileSelect}
          />
        </label>

        <CKEditor
          className="CKeditor"
          content={state.content0}
          config={{bodyId:'editor0'}}
          events={{
            change: onChange
          }}
        />
      </div>
      <div className="editcontainer">
        <h2>İkinci Sertifika</h2>
        <label className="form-control custom-file-upload" htmlFor="file6">
        İkinci  Sertifika
          <input
            type="file"
            id="file6"
            name="certificate1"
            aria-describedby="file"
            onChange={handleFileSelect}
          />
        </label>

        <CKEditor
          className="CKeditor"
          content={state.content1}
          config={{bodyId:'editor1'}}
          events={{
            change: onChange
          }}
        />
      </div>
      <div className="editcontainer">
        <h2>Üçüncü Sertifika</h2>
        <label className="form-control custom-file-upload" htmlFor="file6">
        Üçüncü Sertifika
          <input
            type="file"
            id="file6"
            name="certificate2"
            aria-describedby="file"
            onChange={handleFileSelect}
          />
        </label>

        <CKEditor
          className="CKeditor"
          content={state.content2}
          config={{bodyId:'editor2'}}
          events={{
            change: onChange
          }}
        />
      </div>
    </div>
  );
};

export default CertificatesEdit;
