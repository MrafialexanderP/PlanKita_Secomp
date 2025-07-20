import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AboutPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Hapus import Slider dan slick-carousel

const initialTestimoni = [
  {
    avatar: "👨‍🌾",
    name: "Pak Ahmad",
    text: "PlantKita sangat membantu saya dalam merawat tanaman. Sistem otomatisnya sangat praktis!",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    avatar: "👩‍🌾",
    name: "Bu Siti",
    text: "Monitoring yang real-time membuat saya tidak perlu khawatir tanaman kekeringan.",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    avatar: "👨‍💻",
    name: "Budi Santoso",
    text: "Interface yang user-friendly dan fitur yang lengkap. Sangat recommended!",
    rating: "⭐⭐⭐⭐⭐"
  }
];

const AboutPage = ({ setCurrentPage }) => {
  const [testimoni, setTestimoni] = useState(initialTestimoni);

  useEffect(() => {
    const localTesti = JSON.parse(localStorage.getItem('plantkita_testimoni') || '[]');
    if (localTesti.length > 0) {
      setTestimoni([...initialTestimoni, ...localTesti]);
    }
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.77, 0, 0.175, 1)",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  // Hapus seluruh kode terkait form testimoni, state form, error, submitted, dan handler-nya
  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="about-page-container">
        {/* About Section */}
        <section className="about-section-page">
          <div className="about-content-wrapper">
            <div className="about-image-section">
              <div className="about-image-placeholder">
                <img src={require("../assets/bajakan.png")} alt="PlantKita Team" />
              </div>
            </div>
            <div className="about-text-section">
              <h2>PlantKita - Solusi Pertanian Cerdas</h2>
              <p>
                PlantKita adalah platform inovatif yang menggabungkan teknologi IoT dengan pertanian tradisional 
                untuk menciptakan sistem perawatan tanaman otomatis yang efisien dan ramah lingkungan.
              </p>
              <p>
                Website ini dirancang untuk membantu petani, penggemar tanaman, dan siapa saja yang ingin 
                merawat tanaman mereka dengan cara yang lebih cerdas dan terukur.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <span className="feature-icon">🌱</span>
                  <span>Monitoring Real-time</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💧</span>
                  <span>Penyiraman Otomatis</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📊</span>
                  <span>Analisis Data</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="video-section">
          <h1 className="section-title">Video Perkenalan</h1>
          <div className="video-grid">
            <div className="video-item">
              <div className="video-placeholder">
                <span className="video-label">Sulthan</span>
                <div className="video-thumbnail">
                  <span className="play-icon">▶️</span>
                </div>
              </div>
            </div>
            <div className="video-item">
              <div className="video-placeholder">
                <span className="video-label">Naufa</span>
                <div className="video-thumbnail">
                  <span className="play-icon">▶️</span>
                </div>
              </div>
            </div>
            <div className="video-item">
              <div className="video-placeholder">
                <span className="video-label">Alex</span>
                <div className="video-thumbnail">
                  <span className="play-icon">▶️</span>
                </div>
                <span className="video-label-bottom"></span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimoni Section */}
        <section className="testimoni-section">
          <h1 className="section-title">testimoni</h1>
          <div className="testimoni-slider-wrapper testimoni-slider-wide">
            <Slider {...sliderSettings}>
              {testimoni.map((t, idx) => (
                <div key={idx}>
                  <div className="testimoni-card custom-testimoni-card">
                    <div className="testimoni-avatar">{t.avatar}</div>
                    <h3>{t.name}</h3>
                    <p>"{t.text}"</p>
                    <div className="rating">{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Developer Section */}
        <section className="developer-section">
          <h2 className="developer-title">Tim Pengembang</h2>
          <div className="developer-grid">
            <div className="developer-card">
              <div className="developer-avatar">👨‍💻</div>
              <h3>alex</h3>
              <p>Frontend Developer</p>
              <p>Bertanggung jawab atas UI/UX dan implementasi React</p>
            </div>
            <div className="developer-card">
              <div className="developer-avatar">👩‍💻</div>
              <h3>Naufa</h3>
              <p>Backend Developer</p>
              <p>Mengembangkan API dan sistem database</p>
            </div>
            <div className="developer-card">
              <div className="developer-avatar">👨‍🔬</div>
              <h3>sulthan</h3>
              <p>IoT Specialist</p>
              <p>Mengintegrasikan sensor dan hardware pertanian</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage; 