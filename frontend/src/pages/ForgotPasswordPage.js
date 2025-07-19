import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../styles/ForgotPasswordPage.css";

const ForgotPasswordPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi reset password
    console.log('Reset password for:', email);
    alert('Link reset password telah dikirim ke email Anda!');
    setIsSubmitted(true);
  };

  const goBackToLogin = () => {
    setCurrentPage('login');
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-background">
        <div className="forgot-password-forms-container">
          <div className="form-container active">
            <div className="logo-panel">
              <img src={logo} alt="PK Logo" className="login-logo" />
              <span className="login-brand">PlantKita</span>
            </div>
            <div className="form-content">
              {!isSubmitted ? (
                <>
                  <h2 className="form-title">Lupa Kata Sandi</h2>
                  <p className="form-description">
                    Masukkan email Anda untuk menerima link reset kata sandi
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="input-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <span className="input-icon">📧</span>
                    </div>
                    <button type="submit" className="submit-btn">KIRIM LINK RESET</button>
                  </form>
                  <div className="form-links">
                    <a href="#" onClick={goBackToLogin}>Kembali ke Login</a>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="form-title">Email Terkirim!</h2>
                  <div className="success-icon">✅</div>
                  <p className="form-description">
                    Link reset kata sandi telah dikirim ke email Anda. 
                    Silakan cek inbox atau folder spam.
                  </p>
                  <div className="form-links">
                    <a href="#" onClick={goBackToLogin}>Kembali ke Login</a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 