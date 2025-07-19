import React from "react";
import "../styles/Footer.css";
import logo from "../assets/logo.png";
import instagram from "../assets/instagram1.svg";
import whatsapp from "../assets/whasapp.svg";
import linkedin from "../assets/linkedin.svg";
import bungaFooter from "../assets/bungafooter.svg";

const Footer = () => (
  <footer className="footer">
    <div className="footer__brand">
      <div className="footer__logo-container">
        <img src={logo} alt="PK Logo" className="footer__logo-img" />
        <span className="footer__brand-text">PlantKita</span>
      </div>
      <p>Melalui sistem penyiraman otomatis dan monitoring berbasis sensor yang terintegrasi, 
        kami menghadirkan solusi inovatif untuk memastikan tanaman Anda mendapatkan perawatan yang optimal setiap waktu. 
        Dengan teknologi ini, Anda tidak perlu lagi repot menyiram secara manual atau memantau kondisi tanaman setiap hari, 
        karena semuanya telah kami otomatisasi demi pertumbuhan tanaman yang lebih sehat, efisien, dan terkontrol dengan baik.</p>
      <div className="footer__socials">
        <div className="social-icon-yellow">
          <img src={whatsapp} alt="WhatsApp" />
        </div>
        <div className="social-icon-yellow">
          <img src={instagram} alt="Instagram" />
        </div>
        <div className="social-icon-yellow">
          <img src={linkedin} alt="LinkedIn" />
        </div>
      </div>
    </div>
    <div className="footer__links">
      <h4>Jelajahi</h4>
      <ul>
        <li>
          <img src={bungaFooter} alt="" className="footer-link-icon" />
          <a href="#home">Home</a>
        </li>
        <li>
          <img src={bungaFooter} alt="" className="footer-link-icon" />
          <a href="#contact">Contact</a>
        </li>
        <li>
          <img src={bungaFooter} alt="" className="footer-link-icon" />
          <a href="#about">About</a>
        </li>
        <li>
          <img src={bungaFooter} alt="" className="footer-link-icon" />
          <a href="#login">Login</a>
        </li>
      </ul>
    </div>
    <div className="footer__contact">
      <h4>Contact</h4>
      <div className="contact-item">
        <span className="contact-icon">📞</span>
        <span>+6287654321</span>
      </div>
      <div className="contact-item">
        <span className="contact-icon">📧</span>
        <span>example@gmail.com</span>
      </div>
      <div className="contact-item">
        <span className="contact-icon">📍</span>
        <span>Jl. Lodaya II, RT.02/RW.06, Babak Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16128, Indonesia.</span>
      </div>
    </div>
    <div className="footer__copyright">
      &copy; All Copyright 2023 by TanamanKita | Terms of Use | Privacy Policy
    </div>
  </footer>
);

export default Footer; 