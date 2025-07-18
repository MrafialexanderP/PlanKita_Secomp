import React from "react";
import Slider from "react-slick";
import bajakan from "../assets/bajakan.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HeroSection.css";

const images = [bajakan, bajakan]; // Tambah gambar jika ada

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className="hero-section">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="hero-slide">
            <img src={img} alt="Hero" className="hero-img" />
            <div className="hero-overlay">
              <p className="hero-welcome">SELAMAT DATANG DI PERTANIAN CERDAS DAN SISTEM PERAWATAN OTOMATIS</p>
              <h1 className="hero-title animate-title">Agriculture & Smart Plant</h1>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSection; 