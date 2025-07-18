import React from "react";
import bajakan from "../assets/bajakan.png";
import tanam from "../assets/tanam.png";
import buah1 from "../assets/buah1.svg";
import tanaman from "../assets/tanaman.svg";
import "../styles/AboutSection.css";

const AboutSection = () => (
  <section className="about-section">
    <div className="about-images">
      <div className="about-main-img">
        <img src={bajakan} alt="Agriculture" />
        <div className="about-small-img">
          <img src={tanam} alt="Tanam" />
        </div>
      </div>
    </div>
    <div className="about-content">
      <span className="about-highlight">Pertanian Kita</span>
      <h1 className="about-title">Pertanian Cerdas &<br/>Sistem Perawatan<br/>Tanaman Otomatis</h1>
      <p className="about-green">PlantKita hadir untuk membantu Anda merawat tanaman Anda secara cerdas dan efisien.</p>
      <p className="about-desc">
        Kami percaya bahwa setiap tanaman membutuhkan perawatan yang tepat waktu dan konsisten. Melalui sistem penyiraman otomatis dan monitoring berbasis sensor, kami memberikan solusi agar tanaman anda tumbuh maksimal tanpa harus repot setiap hari.
      </p>
      <div className="about-benefit-icons">
        <div className="about-benefit-item">
          <img src={buah1} alt="Buah dan sayuran organik" />
          <span>Buah dan sayuran organik</span>
        </div>
        <div className="about-benefit-item">
          <img src={tanaman} alt="Tanaman hias dalam dan luar ruangan" />
          <span>Tanaman hias dalam dan luar ruangan</span>
        </div>
      </div>
      <ul className="about-list">
        <li>Nutrisi dan kelembapan selalu terjaga</li>
        <li>Tidak perlu khawatir lupa menyiram</li>
      </ul>
    </div>
  </section>
);

export default AboutSection; 