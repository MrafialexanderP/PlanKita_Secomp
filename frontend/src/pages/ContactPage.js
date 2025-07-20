import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import instagram from "../assets/instagram1.svg";
import whatsapp from "../assets/whasapp.svg";
import linkedin from "../assets/linkedin.svg";
import "../styles/ContactPage.css";

const ContactPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('pesan');
  // State untuk form pesan
  const [pesan, setPesan] = useState({ nama: '', telp: '', email: '', pesan: '' });
  const [pesanSuccess, setPesanSuccess] = useState(false);
  // State untuk form testimoni
  const [testimoni, setTestimoni] = useState({ nama: '', testi: '', rating: 5 });
  const [testiSuccess, setTestiSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handler form pesan
  const handlePesanChange = e => setPesan({ ...pesan, [e.target.name]: e.target.value });
  const handlePesanSubmit = e => {
    e.preventDefault();
    if (pesan.nama.trim().length < 3) return setError('Nama minimal 3 karakter.');
    if (pesan.pesan.trim().length < 5) return setError('Pesan minimal 5 karakter.');
    setError('');
    setPesanSuccess(true);
    setPesan({ nama: '', telp: '', email: '', pesan: '' });
    setTimeout(() => setPesanSuccess(false), 2500);
  };
  // Handler form testimoni
  const handleTestiChange = e => setTestimoni({ ...testimoni, [e.target.name]: e.target.value });
  const handleRating = r => setTestimoni(f => ({ ...f, rating: r }));
  const handleTestiSubmit = e => {
    e.preventDefault();
    if (testimoni.nama.trim().length < 3) return setError('Nama minimal 3 karakter.');
    if (testimoni.testi.trim().length < 10) return setError('Testimoni minimal 10 karakter.');
    setError('');
    setTestiSuccess(true);

    // Simpan ke localStorage
    const newTesti = {
      avatar: "🧑‍🌾", // atau random emoji
      name: testimoni.nama,
      text: testimoni.testi,
      rating: testimoni.rating
    };
    const existing = JSON.parse(localStorage.getItem('plantkita_testimoni') || '[]');
    localStorage.setItem('plantkita_testimoni', JSON.stringify([...existing, newTesti]));

    setTestimoni({ nama: '', testi: '', rating: 5 });
    setTimeout(() => setTestiSuccess(false), 2500);
  };

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-form-section">
            <div className="tab-switch">
              <button className={activeTab === 'pesan' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab('pesan')}>Pesan</button>
              <button className={activeTab === 'testimoni' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab('testimoni')}>Testimoni</button>
            </div>
            {activeTab === 'pesan' && (
              <form className="contact-form" onSubmit={handlePesanSubmit} autoComplete="off">
                <input type="text" name="nama" placeholder="Nama" className="contact-input" value={pesan.nama} onChange={handlePesanChange} required />
                <input type="tel" name="telp" placeholder="Nomor Telfon" className="contact-input" value={pesan.telp} onChange={handlePesanChange} />
                <input type="email" name="email" placeholder="Email" className="contact-input" value={pesan.email} onChange={handlePesanChange} />
                <textarea name="pesan" placeholder="Pesan" className="contact-textarea" rows="5" value={pesan.pesan} onChange={handlePesanChange} required></textarea>
                <button type="submit" className="contact-button">Kirim</button>
                {error && <div className="testimoni-error">{error}</div>}
                {pesanSuccess && <div className="testimoni-success">Pesan berhasil dikirim!</div>}
              </form>
            )}
            {activeTab === 'testimoni' && (
              <form className="contact-form" onSubmit={handleTestiSubmit} autoComplete="off">
                <input type="text" name="nama" placeholder="Nama" className="contact-input" value={testimoni.nama} onChange={handleTestiChange} required />
                <textarea name="testi" placeholder="Tulis testimoni..." className="contact-textarea" rows={3} value={testimoni.testi} onChange={handleTestiChange} required></textarea>
                <div className="testimoni-rating-input">
                  {[1,2,3,4,5].map(r => (
                    <span
                      key={r}
                      className={r <= testimoni.rating ? 'star active' : 'star'}
                      onClick={() => handleRating(r)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Beri rating ${r}`}
                      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleRating(r)}
                    >★</span>
                  ))}
                </div>
                <button type="submit" className="contact-button">Kirim Testimoni</button>
                {error && <div className="testimoni-error">{error}</div>}
                {testiSuccess && <div className="testimoni-success">Testimoni berhasil dikirim!</div>}
              </form>
            )}
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
};

export default ContactPage; 