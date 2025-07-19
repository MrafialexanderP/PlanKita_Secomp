import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import instagram from "../assets/instagram1.svg";
import whatsapp from "../assets/whasapp.svg";
import linkedin from "../assets/linkedin.svg";
import "../styles/ContactPage.css";

const ContactPage = ({ setCurrentPage }) => (
  <>
    <Navbar setCurrentPage={setCurrentPage} />
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-form-section">
          <h1 className="contact-title">Kirimkan Pesanmu di Sini!</h1>
          <form className="contact-form">
            <input type="text" placeholder="Nama" className="contact-input" />
            <input type="tel" placeholder="Nomor Telfon" className="contact-input" />
            <input type="email" placeholder="Email" className="contact-input" />
            <textarea placeholder="Pesan" className="contact-textarea" rows="5"></textarea>
            <button type="submit" className="contact-button">Kirim</button>
          </form>
        </div>
        
        <div className="contact-info-section">
          <div className="contact-info-card">
            <div className="contact-info-item">
              <h3>Alamat</h3>
              <p>JL. Lodaya II RT.02/RW.06, Babakan, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16128, Indonesia</p>
            </div>
            
            <div className="contact-info-item">
              <h3>Kontak</h3>
              <div className="contact-detail">
                <span className="contact-icon">📞</span>
                <span>Nomor Telfon: +6287654321</span>
              </div>
              <div className="contact-detail">
                <span className="contact-icon">📧</span>
                <span>Email: example@gmail.com</span>
              </div>
            </div>
            
            <div className="contact-info-item">
              <h3>Stay Connected</h3>
              <div className="social-icons">
                <div className="social-icon">
                  <img src={whatsapp} alt="WhatsApp" />
                </div>
                <div className="social-icon">
                  <img src={instagram} alt="Instagram" />
                </div>
                <div className="social-icon">
                  <img src={linkedin} alt="LinkedIn" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="map-section">
        <div className="map-placeholder">
          <h3>Peta Lokasi</h3>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d106.8!3d-6.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c3b0b0b0b0b0%3A0x0!2sBogor%2C%20West%20Java%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi PlantKita di Bogor"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default ContactPage; 