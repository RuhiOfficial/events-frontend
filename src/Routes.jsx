import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mysidebar from "pages/Mysidebar";
import Dashboard from "pages/Dashboard";
import SignUp from "pages/SignUp";
import LoginScreen from "pages/LoginScreen";
import Header from "pages/Header";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Layout from "pages/Layout";
import Modal from "pages/Modal";
import Canvas from "pages/Canvas";
import Reservation from "pages/reservation";
import ViewLayout from "pages/ViewLayout";
import TicketReservations from "pages/TicketReservations";
import Calender from "pages/Calender";
const ProjectRoutes = () => {
  const auth = localStorage.getItem("Name");
  console.log(auth);

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        {auth ? (
          <Mysidebar>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/canvas" element={<Canvas/>}/>
              <Route path="/reservation" element={<Reservation/>}/>
              <Route path="/view" element={<ViewLayout/>}/>
              <Route path="/tickets" element={<TicketReservations/>}/>
              <Route path="/calender" element={<Calender/>}/>
              
              {/* <Route path="/modal" element={<Modal />} /> */}
            </Routes>
          </Mysidebar>
        ) : (
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        )}
      </Router>
    </React.Suspense>
  );
};

export default ProjectRoutes;
