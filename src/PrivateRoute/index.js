// src/privateRoute/PrivateRoute.js
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

// Import your components
import Mysidebar from "components/pages/Mysidebar";


const PrivateRoute = ({ element }) => {
    // Assume isAuthenticated is a state that determines if the user is logged in
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // Check authentication logic (you may replace this with your own logic)
    useEffect(() => {
      // Example: Check if user is authenticated from localStorage
      const storedToken = localStorage.getItem("Token");
      if (storedToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []);
  
    return isAuthenticated ? element : <Navigate to="/loginscreen" />;
  };
  
export default PrivateRoute;
