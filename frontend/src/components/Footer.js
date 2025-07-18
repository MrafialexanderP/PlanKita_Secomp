import React from "react";
import logo from "../assets/logo.png";
import "../styles/Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer__brand">
      <img src={logo} alt="PK Logo" className="footer__logo-img" />
      <span className="footer__brand-text">PlantKita</span>
      <p>Melalui sistem penyiraman otomatis dan monitoring berbasis sensor, kami memberikan solusi agar tanaman anda tumbuh maksimal tanpa harus repot setiap hari.</p>
      <div className="footer__socials">
        <span>IG</span> <span>FB</span> <span>YT</span>
      </div>
    </div>
    <div className="footer__links">
      <h4>Jelajahi</h4>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </div>
    <div className="footer__contact">
      <h4>Contact</h4>
      <p>+62 81234567891<br/>example@gmail.com<br/>Jl. Ladogi 4, Kec. Babadan, Kab. Ponorogo, Jawa Timur, Indonesia</p>
    </div>
    <div className="footer__copyright">
      &copy; Copyright 2023 by Teamworkku | Terms of Use | Privacy Policy
    </div>
  </footer>
);

export default Footer; 