import React, { useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = ({ setCurrentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    setCurrentPage('contact');
    setMenuOpen(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setCurrentPage('home');
    setMenuOpen(false);
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setCurrentPage('about');
    setMenuOpen(false);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setCurrentPage('login');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
        </button>
        <img src={logo} alt="PlantKita Logo" className="navbar__logo" />
        <span className="navbar__brand">PlantKita</span>
      </div>
      <div className={`navbar__center${menuOpen ? ' navbar__center--open' : ''}`}>
        <input type="text" className="navbar__search" placeholder="Search..." />
      </div>
      <div className={`navbar__right${menuOpen ? ' navbar__right--open' : ''}`}>
        <a href="#" onClick={handleHomeClick}>Home</a>
        <a href="#" onClick={handleContactClick}>Contact</a>
        <a href="#" onClick={handleAboutClick}>About</a>
        <span className="navbar__user-icon" onClick={handleLoginClick} style={{cursor: 'pointer'}}>👤</span>
      </div>
    </nav>
  );
};

export default Navbar; 