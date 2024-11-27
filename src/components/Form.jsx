import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Form.css";
import axios from "axios";

function FormComponent({ onCancel }) {
  const [files, setFiles] = useState([]);
  const [username, setUsername] = useState("");
  const location = useLocation();

  // Extract UUID from URL
  const params = new URLSearchParams(location.search);
  const uniqueId = params.get("uniqueId");

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      file,
      layout: "A4",
      pages: "1",
      color: "Color",
      copies: "1",
    }));
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const handleFileOptionChange = (index, optionName, value) => {
    const updatedFiles = files.map((file, i) =>
      i === index ? { ...file, [optionName]: value } : file
    );
    setFiles(updatedFiles);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!username) {
    alert("Please enter your username.");
    return;
  }

  const formData = new FormData();
  formData.append("uniqueId", uniqueId);
  formData.append("username", username);

  // Append files as "files[]" in the formData
  files.forEach((fileData) => {
    formData.append("files[]", fileData.file);
  });

  // Separate metadata and append as a JSON string
  const metadata = files.map(({ layout, pages, color, copies }) => ({
    layout,
    pages,
    color,
    copies,
  }));
  formData.append("metadata", JSON.stringify(metadata));

  try {
    await axios.post("https://print-backend.vercel.app/api/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Files uploaded successfully!");
    setFiles([]);
    setUsername("");
  } catch (error) {
    console.error("Error uploading files:", error);
    alert("Failed to upload files.");
  }
};

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="form-container">
      <h2>File Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="file-upload">
          Upload Files:
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            required
          />
        </label>

        {files.length > 0 && (
          <div className="file-options">
            {files.map((fileData, index) => (
              <div key={index} className="file-section">
                <p className="file-name">
                  {fileData.file.name}{" "}
                  <button
                    type="button"
                    className="remove-file-button"
                    onClick={() => removeFile(index)}
                  >
                    ✖
                  </button>
                </p>
                <label>
                  Layout:
                  <select
                    value={fileData.layout}
                    onChange={(e) =>
                      handleFileOptionChange(index, "layout", e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      Select Layout
                    </option>
                    <option value="A4">A4</option>
                    <option value="Letter">Letter</option>
                    <option value="A3">A3</option>
                  </select>
                </label>
                <label>
                  Pages:
                  <input
                    type="number"
                    value={fileData.pages}
                    onChange={(e) =>
                      handleFileOptionChange(index, "pages", e.target.value)
                    }
                    required
                    min="1"
                  />
                </label>
                <label>
                  Color:
                  <select
                    value={fileData.color}
                    onChange={(e) =>
                      handleFileOptionChange(index, "color", e.target.value)
                    }
                    required
                  >
                    <option value="Color">Color</option>
                    <option value="Black & White">Black & White</option>
                  </select>
                </label>
                <label>
                  No. of Copies:
                  <input
                    type="number"
                    value={fileData.copies}
                    onChange={(e) =>
                      handleFileOptionChange(index, "copies", e.target.value)
                    }
                    required
                    min="1"
                  />
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="form-buttons">
          <button type="submit" className="submit-button" disabled={!files.length}>
            Upload
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              onCancel();
              setFiles([]);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormComponent;
