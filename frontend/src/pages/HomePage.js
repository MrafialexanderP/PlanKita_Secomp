import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import "../styles/HomePage.css";

const features = [
  {
    title: "Fitur 01",
    desc: "Mendeteksi suhu & kelembaban tanah",
    icon: "fitur1.svg",
  },
  {
    title: "Fitur 02",
    desc: "Jadwal penyiraman otomatis",
    icon: "fitur2.svg",
  },
  {
    title: "Fitur 03",
    desc: "Kontrol Melalui Website",
    icon: "fitur3.svg",
  },
];

const HomePage = ({ setCurrentPage }) => (
  <>
    <Navbar setCurrentPage={setCurrentPage} />
    <HeroSection setCurrentPage={setCurrentPage} />
    <section className="features modern-features">
      {features.map((f, i) => (
        <div className="feature-animate" key={f.title} style={{animationDelay: `${i * 0.15}s`}}>
          <FeatureCard title={f.title} desc={f.desc} icon={f.icon} />
        </div>
      ))}
    </section>
    <AboutSection />
    <Footer />
  </>
);

export default HomePage; 