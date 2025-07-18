import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar__left">
      <img src={logo} alt="PlantKita Logo" className="navbar__logo" />
      <span className="navbar__brand">PlantKita</span>
    </div>
    <div className="navbar__center">
      <input type="text" className="navbar__search" placeholder="Search..." />
    </div>
    <div className="navbar__right">
      <a href="#home">Home</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
      <span className="navbar__user-icon">👤</span>
    </div>
  </nav>
);

export default Navbar; 