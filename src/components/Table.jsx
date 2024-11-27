import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";

function TableComponent({ uniqueId }) {
  const [filesData, setFilesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch files for the given uniqueId
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        console.log(`Fetching files for uniqueId: ${uniqueId}`);
        const response = await axios.get(
          `https://print-backend.vercel.app/api/displayfiles/${uniqueId}/files`
        );
        console.log("Files fetched:", response.data.files);
        setFilesData(response.data.files || {});
      } catch (error) {
        console.error("Error fetching files:", error);
        alert("Failed to load files.");
      } finally {
        setIsLoading(false);
      }
    };

    if (uniqueId) {
      fetchFiles();
    }
  }, [uniqueId]);

  return (
    <div className="table-container">
      <h2>Uploaded Files</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : Object.keys(filesData).length > 0 ? (
        <table className="print-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>File Name</th>
              <th>File Details</th>
              <th>Print</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(filesData).map(([username, files]) => (
              <React.Fragment key={username}>
                <tr>
                  <td rowSpan={files.length}>{username}</td>
                  <td>{files[0].fileName}</td>
                  <td>{`${files[0].format.toUpperCase()} - ${files[0].size}`}</td>
                  <td>
                    <button
                      className="print-button"
                      onClick={() => alert(`Printing ${files[0].fileName}`)}
                    >
                      Print
                    </button>
                  </td>
                  <td>
                    <span
                      className="cancel-icon"
                      onClick={() => alert(`Cancelled ${files[0].fileName}`)}
                    >
                      ❌
                    </span>
                  </td>
                </tr>
                {files.slice(1).map((file) => (
                  <tr key={`${username}-${file.fileName}`}>
                    <td>{file.fileName}</td>
                    <td>{`${file.format.toUpperCase()} - ${file.size}`}</td>
                    <td>
                      <button
                        className="print-button"
                        onClick={() => alert(`Printing ${file.fileName}`)}
                      >
                        Print
                      </button>
                    </td>
                    <td>
                      <span
                        className="cancel-icon"
                        onClick={() => alert(`Cancelled ${file.fileName}`)}
                      >
                        ❌
                      </span>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No files uploaded for this unique ID.</p>
      )}
    </div>
  );
}

export default TableComponent;
