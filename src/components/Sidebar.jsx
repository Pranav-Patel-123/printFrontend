import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sidebar.css"; // Ensure your CSS file is properly linked

function Sidebar({ isSidebarOpen, toggleSidebar, uniqueId, onFormClick }) {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      if (!uniqueId) return; // Exit early if uniqueId is not provided

      try {
        console.log("Fetching QR code for:", uniqueId); // Debug log
        const response = await axios.get(
          `https://print-backend.vercel.app/api/qrcode/${uniqueId}`
        );
        console.log("QR code response:", response); // Debug log to check response
        setQrCodeUrl(response.data.url); // Set the QR code URL from the response
      } catch (error) {
        console.error("Error fetching QR code:", error);
        alert("Failed to load QR code. Please try again later.");
      }
    };

    fetchQrCode(); // Call the function to fetch the QR code
  }, [uniqueId]);

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <button className="close-button" onClick={toggleSidebar}>
        ✖
      </button>
      <div className="sidebar-content">
        {qrCodeUrl ? (
          <img src={qrCodeUrl} alt="QR Code" className="sidebar-image" />
        ) : (
          <p>Loading QR code...</p> // Fallback message while QR code is loading
        )}
        <p className="sidebar-text">Welcome to the Dashboard!</p>
        <button className="sidebar-button" onClick={onFormClick}>
          Form
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
