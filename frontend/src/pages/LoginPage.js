import React, { useState } from "react";
import logo from "../assets/logo.png";
import "../styles/LoginPage.css";

const LoginPage = ({ setCurrentPage }) => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulasi login
    console.log('Login attempt:', { email: formData.email, password: formData.password });
    alert('Login berhasil!');
    setCurrentPage('home');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulasi register
    console.log('Register attempt:', formData);
    alert('Registrasi berhasil! Silakan login.');
    setIsLoginPage(true); // Redirect ke halaman login
    setFormData({ username: '', email: '', password: '' }); // Reset form
  };

  const goToRegister = () => {
    setIsLoginPage(false);
    setFormData({ username: '', email: '', password: '' }); // Reset form
  };

  const goToLogin = () => {
    setIsLoginPage(true);
    setFormData({ username: '', email: '', password: '' }); // Reset form
  };

  const goToForgotPassword = () => {
    setCurrentPage('forgot-password');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-forms-container">
          {/* Login Form */}
          {isLoginPage && (
            <div className="form-container active">
              <div className="logo-panel">
                <img src={logo} alt="PK Logo" className="login-logo" />
                <span className="login-brand">PlantKita</span>
              </div>
              <div className="form-content">
                <h2 className="form-title">Masuk ke Akun Anda</h2>
                <form onSubmit={handleLogin}>
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-icon">📧</span>
                  </div>
                  <div className="input-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Kata sandi"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-icon">🔒</span>
                  </div>
                  <button type="submit" className="submit-btn">MASUK</button>
                </form>
                <div className="form-links">
                  <a href="#" onClick={goToRegister}>Buat akun</a>
                  <a href="#" onClick={goToForgotPassword}>Lupa kata sandi?</a>
                </div>
              </div>
            </div>
          )}

          {/* Register Form */}
          {!isLoginPage && (
            <div className="form-container active">
              <div className="form-content">
                <h2 className="form-title">DAFTAR</h2>
                <form onSubmit={handleRegister}>
                  <div className="input-group">
                    <input
                      type="text"
                      name="username"
                      placeholder="Nama pengguna"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-icon">👤</span>
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-icon">📧</span>
                  </div>
                  <div className="input-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Kata sandi"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="input-icon">🔒</span>
                  </div>
                  <button type="submit" className="submit-btn">DAFTAR</button>
                </form>
                <div className="form-links">
                  <a href="#" onClick={goToLogin}>Sudah punya akun?</a>
                </div>
              </div>
              <div className="logo-panel">
                <img src={logo} alt="PK Logo" className="login-logo" />
                <span className="login-brand">PlantKita</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 