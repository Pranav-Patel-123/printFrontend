import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar component
import TableComponent from "../components/Table"; // Import TableComponent
import FormComponent from "../components/Form"; // Import FormComponent
import "./Home.css";

function Homepage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState(null); // State to hold the uniqueId

  // Fetch the uniqueId from localStorage when the component mounts
  useEffect(() => {
    const storedUniqueId = localStorage.getItem("uniqueId");
    if (storedUniqueId) {
      setUniqueId(storedUniqueId);
    } else {
      alert("No uniqueId found. Please log in again.");
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const openForm = () => {
    setFormOpen(true); // Open the form
    setSidebarOpen(false); // Optionally close the sidebar
  };

  const closeForm = () => {
    setFormOpen(false); // Close the form
  };

  const handleSubmit = (formData) => {
    console.log("Form Submitted:", formData);
    setFormOpen(false); // Close the form after submission
  };

  return (
    <div className="homepage-container">
      {/* Center Welcome Message */}
      <h1 className="homepage-name">Welcome Owner..</h1>

      {/* Hamburger Icon */}
      <button className="hamburger-icon" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onFormClick={openForm} uniqueId={uniqueId} />

      {/* Table Component */}
      {!isFormOpen && uniqueId && <TableComponent uniqueId={uniqueId} />}

      {/* Form Component */}
      {isFormOpen && <FormComponent onSubmit={handleSubmit} onCancel={closeForm} />}
    </div>
  );
}

export default Homepage;
