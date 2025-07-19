import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = ({ setCurrentPage }) => {
  const handleContactClick = (e) => {
    e.preventDefault();
    setCurrentPage('contact');
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setCurrentPage('home');
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setCurrentPage('about');
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img src={logo} alt="PlantKita Logo" className="navbar__logo" />
        <span className="navbar__brand">PlantKita</span>
      </div>
      <div className="navbar__center">
        <input type="text" className="navbar__search" placeholder="Search..." />
      </div>
      <div className="navbar__right">
        <a href="#" onClick={handleHomeClick}>Home</a>
        <a href="#" onClick={handleContactClick}>Contact</a>
        <a href="#" onClick={handleAboutClick}>About</a>
        <span className="navbar__user-icon">👤</span>
      </div>
    </nav>
  );
};

export default Navbar; 