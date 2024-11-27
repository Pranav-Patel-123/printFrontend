import React from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Homepage from "./pages/Home";
import Login from "./pages/Login";
import Form from "./components/Form";

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        <Routes>
    <Route path="/form" element={<FormWithQueryParam />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><Homepage /></PrivateRoute>} />
          
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    fontFamily: "'Roboto', sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
};

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = checkAuth(); // Check authentication status
  return isAuthenticated ? children : <Navigate to="/" />;
};

// Function to Check Authentication Status
const checkAuth = () => {
  // Example: Check for a token in localStorage
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists, false otherwise
};

// Component to Parse Query Parameters and Pass uniqueId to Form
const FormWithQueryParam = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const uniqueId = params.get("uniqueId"); // Extract the uniqueId parameter

  // Handle the case where uniqueId is missing
  if (!uniqueId) {
    return <div>Error: uniqueId is missing!</div>;
  }

  return <Form uniqueId={uniqueId} />;
};

export default App;
