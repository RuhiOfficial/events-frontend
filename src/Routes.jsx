import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mysidebar from "pages/Mysidebar";
import Header from "pages/Header";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Modal from "pages/Modal";
const Dashboard = React.lazy(() => import("pages/Dashboard"));
const SignUp = React.lazy(() => import("pages/SignUp"));
const LoginScreen = React.lazy(() => import("pages/LoginScreen")); 


const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
       
        <Mysidebar>
        <Routes>
         
         
          {/* <Route path="/loginscreen" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/modal" element={<Modal />} />  */}
        </Routes>
        </Mysidebar>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
