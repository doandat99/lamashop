import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Announcenment from "../../components/Announcenment/Announcenment";
import { Outlet } from "react-router-dom";
import "../../App.css";

const DefaultLayout = () => {
  return (
    <div className="App">
      <Announcenment />
      <Header />
      <div className="Content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
