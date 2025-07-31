import React, { useState, useEffect } from 'react';
import { 
  FaTachometerAlt, 
  FaCog, 
  FaCalendarAlt, 
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaBellSlash,
  FaShieldAlt,
  FaWifi,
  FaThermometerHalf,
  FaTint,
  FaSun,
  FaWater,
  FaSave,
  FaEdit,
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaMoon,
  FaDesktop,
  FaMobile,
  FaTablet,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaTrash,
  FaDownload,
  FaUpload,
  FaSync,
  FaLock,
  FaUnlock
} from 'react-icons/fa';
import '../styles/SettingsPage.css';

const SettingsPage = ({ setCurrentPage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, Indonesia',
    avatar: null,
    bio: 'Petani hidroponik yang passionate dengan teknologi IoT'
  });

  // Settings states
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    watering: true,
    nutrient: true,
    lighting: true,
    climate: true,
    maintenance: true,
    alerts: true
  });

  const [systemSettings, setSystemSettings] = useState({
    language: 'id',
    theme: 'light',
    timezone: 'Asia/Jakarta',
    units: 'metric',
    autoBackup: true,
    dataRetention: 30,
    updateFrequency: 5
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginNotifications: true,
    deviceManagement: true
  });

  const [deviceSettings, setDeviceSettings] = useState({
    wateringPump: { enabled: true, autoMode: true },
    nutrientPump: { enabled: true, autoMode: true },
    lighting: { enabled: true, autoMode: true },
    climateControl: { enabled: true, autoMode: true },
    sensors: { enabled: true, calibration: 'auto' }
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-profile-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Format time and date
  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    alert('Anda telah berhasil logout dari dashboard');
    setCurrentPage('home');
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  // Profile functions
  const handleProfileUpdate = () => {
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserProfile(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Settings functions
  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const updateSystemSetting = (key, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSecuritySetting = (key) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleDeviceSetting = (device, setting) => {
    setDeviceSettings(prev => ({
      ...prev,
      [device]: {
        ...prev[device],
        [setting]: !prev[device][setting]
      }
    }));
  };

  // Save all settings
  const saveAllSettings = () => {
    // Simulate saving to backend
    setTimeout(() => {
      alert('Semua pengaturan berhasil disimpan!');
    }, 1000);
  };

  // Reset settings
  const resetSettings = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset semua pengaturan ke default?')) {
      // Reset to default values
      alert('Pengaturan telah direset ke default!');
    }
  };

  // Export/Import settings
  const exportSettings = () => {
    const settings = {
      notifications,
      systemSettings,
      securitySettings,
      deviceSettings
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plantkita-settings.json';
    link.click();
    
    URL.revokeObjectURL(url);
  };

  // Setting Card Component
  const SettingCard = ({ title, icon, children }) => (
    <div className="setting-card">
      <div className="setting-header">
        {icon}
        <h3>{title}</h3>
      </div>
      <div className="setting-content">
        {children}
      </div>
    </div>
  );

  // Toggle Switch Component
  const ToggleSwitch = ({ checked, onChange, label }) => (
    <div className="toggle-item">
      <span>{label}</span>
      <label className="toggle-switch">
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={onChange}
        />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">🌱</div>
            <span>PlantKita</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item" onClick={() => setCurrentPage('dashboard')}>
            <FaTachometerAlt />
            <span>Dasbor</span>
          </div>
          <div className="nav-item" onClick={() => setCurrentPage('control')}>
            <FaCog />
            <span>Kontrol</span>
          </div>
          <div className="nav-item" onClick={() => setCurrentPage('schedule')}>
            <FaCalendarAlt />
            <span>Jadwal</span>
          </div>
          <div className="nav-item active">
            <FaUser />
            <span>Pengaturan</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Pengaturan</h1>
          <div className="user-profile-container">
            <div className="user-profile" onClick={toggleUserMenu}>
              <FaUser />
              <span>Pengguna</span>
              <span className={`dropdown-arrow ${showUserMenu ? 'rotated' : ''}`}>▼</span>
            </div>
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="dropdown-item">
                  <FaUser />
                  <span>Profil</span>
                </div>
                <div className="dropdown-item">
                  <FaCog />
                  <span>Pengaturan</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout-item" onClick={handleLogout}>
                  <FaSignOutAlt />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Time Display */}
        <div className="time-section">
          <div className="time-display">
            <div className="time">{formatTime(currentTime)}</div>
            <div className="date">{formatDate(currentTime)}</div>
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="settings-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser />
            <span>Profil</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell />
            <span>Notifikasi</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'system' ? 'active' : ''}`}
            onClick={() => setActiveTab('system')}
          >
            <FaCog />
            <span>Sistem</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FaShieldAlt />
            <span>Keamanan</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'devices' ? 'active' : ''}`}
            onClick={() => setActiveTab('devices')}
          >
            <FaWifi />
            <span>Perangkat</span>
          </button>
        </div>

        {/* Settings Content */}
        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="tab-content">
              <SettingCard title="Informasi Profil" icon={<FaUser />}>
                <div className="profile-section">
                  <div className="avatar-section">
                    <div className="avatar">
                      {userProfile.avatar ? (
                        <img src={userProfile.avatar} alt="Avatar" />
                      ) : (
                        <FaUser />
                      )}
                    </div>
                    <input 
                      type="file" 
                      id="avatar-input" 
                      accept="image/*" 
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="avatar-input" className="avatar-upload">
                      <FaCamera />
                      <span>Ubah Foto</span>
                    </label>
                  </div>
                  
                  <div className="profile-form">
                    <div className="form-group">
                      <label>Nama Lengkap:</label>
                      <input 
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email:</label>
                      <input 
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Nomor Telepon:</label>
                      <input 
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Lokasi:</label>
                      <input 
                        type="text"
                        value={userProfile.location}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Bio:</label>
                      <textarea
                        value={userProfile.bio}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        rows="3"
                      />
                    </div>
                    
                    <div className="profile-actions">
                      {isEditing ? (
                        <>
                          <button className="btn btn-primary" onClick={handleProfileUpdate}>
                            <FaSave />
                            <span>Simpan</span>
                          </button>
                          <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                            <span>Batal</span>
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                          <FaEdit />
                          <span>Edit Profil</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </SettingCard>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="tab-content">
              <SettingCard title="Pengaturan Notifikasi" icon={<FaBell />}>
                <div className="notification-settings">
                  <h4>Metode Notifikasi</h4>
                  <ToggleSwitch 
                    checked={notifications.email}
                    onChange={() => toggleNotification('email')}
                    label="Email Notifikasi"
                  />
                  <ToggleSwitch 
                    checked={notifications.sms}
                    onChange={() => toggleNotification('sms')}
                    label="SMS Notifikasi"
                  />
                  <ToggleSwitch 
                    checked={notifications.push}
                    onChange={() => toggleNotification('push')}
                    label="Push Notifikasi"
                  />
                  
                  <h4>Jenis Notifikasi</h4>
                  <ToggleSwitch 
                    checked={notifications.watering}
                    onChange={() => toggleNotification('watering')}
                    label="Penyiraman"
                  />
                  <ToggleSwitch 
                    checked={notifications.nutrient}
                    onChange={() => toggleNotification('nutrient')}
                    label="Nutrisi"
                  />
                  <ToggleSwitch 
                    checked={notifications.lighting}
                    onChange={() => toggleNotification('lighting')}
                    label="Pencahayaan"
                  />
                  <ToggleSwitch 
                    checked={notifications.climate}
                    onChange={() => toggleNotification('climate')}
                    label="Iklim"
                  />
                  <ToggleSwitch 
                    checked={notifications.maintenance}
                    onChange={() => toggleNotification('maintenance')}
                    label="Pemeliharaan"
                  />
                  <ToggleSwitch 
                    checked={notifications.alerts}
                    onChange={() => toggleNotification('alerts')}
                    label="Peringatan Sistem"
                  />
                </div>
              </SettingCard>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="tab-content">
              <SettingCard title="Pengaturan Sistem" icon={<FaCog />}>
                <div className="system-settings">
                  <div className="form-group">
                    <label>Bahasa:</label>
                    <select 
                      value={systemSettings.language}
                      onChange={(e) => updateSystemSetting('language', e.target.value)}
                    >
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Tema:</label>
                    <select 
                      value={systemSettings.theme}
                      onChange={(e) => updateSystemSetting('theme', e.target.value)}
                    >
                      <option value="light">Terang</option>
                      <option value="dark">Gelap</option>
                      <option value="auto">Otomatis</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Zona Waktu:</label>
                    <select 
                      value={systemSettings.timezone}
                      onChange={(e) => updateSystemSetting('timezone', e.target.value)}
                    >
                      <option value="Asia/Jakarta">WIB (UTC+7)</option>
                      <option value="Asia/Makassar">WITA (UTC+8)</option>
                      <option value="Asia/Jayapura">WIT (UTC+9)</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Unit Pengukuran:</label>
                    <select 
                      value={systemSettings.units}
                      onChange={(e) => updateSystemSetting('units', e.target.value)}
                    >
                      <option value="metric">Metrik (°C, mm)</option>
                      <option value="imperial">Imperial (°F, in)</option>
                    </select>
                  </div>
                  
                  <ToggleSwitch 
                    checked={systemSettings.autoBackup}
                    onChange={() => updateSystemSetting('autoBackup', !systemSettings.autoBackup)}
                    label="Backup Otomatis"
                  />
                  
                  <div className="form-group">
                    <label>Retensi Data (hari):</label>
                    <input 
                      type="number"
                      value={systemSettings.dataRetention}
                      onChange={(e) => updateSystemSetting('dataRetention', parseInt(e.target.value))}
                      min="7"
                      max="365"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Frekuensi Update (menit):</label>
                    <input 
                      type="number"
                      value={systemSettings.updateFrequency}
                      onChange={(e) => updateSystemSetting('updateFrequency', parseInt(e.target.value))}
                      min="1"
                      max="60"
                    />
                  </div>
                </div>
              </SettingCard>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-content">
              <SettingCard title="Pengaturan Keamanan" icon={<FaShieldAlt />}>
                <div className="security-settings">
                  <ToggleSwitch 
                    checked={securitySettings.twoFactorAuth}
                    onChange={() => toggleSecuritySetting('twoFactorAuth')}
                    label="Autentikasi 2 Faktor"
                  />
                  
                  <div className="form-group">
                    <label>Timeout Sesi (menit):</label>
                    <input 
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                      min="5"
                      max="120"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Kedaluwarsa Password (hari):</label>
                    <input 
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordExpiry: parseInt(e.target.value) }))}
                      min="30"
                      max="365"
                    />
                  </div>
                  
                  <ToggleSwitch 
                    checked={securitySettings.loginNotifications}
                    onChange={() => toggleSecuritySetting('loginNotifications')}
                    label="Notifikasi Login"
                  />
                  
                  <ToggleSwitch 
                    checked={securitySettings.deviceManagement}
                    onChange={() => toggleSecuritySetting('deviceManagement')}
                    label="Manajemen Perangkat"
                  />
                  
                  <div className="security-actions">
                    <button className="btn btn-warning">
                      <FaLock />
                      <span>Ubah Password</span>
                    </button>
                    <button className="btn btn-danger">
                      <FaTrash />
                      <span>Hapus Akun</span>
                    </button>
                  </div>
                </div>
              </SettingCard>
            </div>
          )}

          {activeTab === 'devices' && (
            <div className="tab-content">
              <SettingCard title="Pengaturan Perangkat IoT" icon={<FaWifi />}>
                <div className="device-settings">
                  <div className="device-item">
                    <div className="device-info">
                      <FaWater />
                      <span>Pompa Penyiraman</span>
                    </div>
                    <div className="device-controls">
                      <ToggleSwitch 
                        checked={deviceSettings.wateringPump.enabled}
                        onChange={() => toggleDeviceSetting('wateringPump', 'enabled')}
                        label="Aktif"
                      />
                      <ToggleSwitch 
                        checked={deviceSettings.wateringPump.autoMode}
                        onChange={() => toggleDeviceSetting('wateringPump', 'autoMode')}
                        label="Mode Otomatis"
                      />
                    </div>
                  </div>
                  
                  <div className="device-item">
                    <div className="device-info">
                      <FaTint />
                      <span>Pompa Nutrisi</span>
                    </div>
                    <div className="device-controls">
                      <ToggleSwitch 
                        checked={deviceSettings.nutrientPump.enabled}
                        onChange={() => toggleDeviceSetting('nutrientPump', 'enabled')}
                        label="Aktif"
                      />
                      <ToggleSwitch 
                        checked={deviceSettings.nutrientPump.autoMode}
                        onChange={() => toggleDeviceSetting('nutrientPump', 'autoMode')}
                        label="Mode Otomatis"
                      />
                    </div>
                  </div>
                  
                  <div className="device-item">
                    <div className="device-info">
                      <FaSun />
                      <span>Sistem Pencahayaan</span>
                    </div>
                    <div className="device-controls">
                      <ToggleSwitch 
                        checked={deviceSettings.lighting.enabled}
                        onChange={() => toggleDeviceSetting('lighting', 'enabled')}
                        label="Aktif"
                      />
                      <ToggleSwitch 
                        checked={deviceSettings.lighting.autoMode}
                        onChange={() => toggleDeviceSetting('lighting', 'autoMode')}
                        label="Mode Otomatis"
                      />
                    </div>
                  </div>
                  
                  <div className="device-item">
                    <div className="device-info">
                      <FaThermometerHalf />
                      <span>Kontrol Iklim</span>
                    </div>
                    <div className="device-controls">
                      <ToggleSwitch 
                        checked={deviceSettings.climateControl.enabled}
                        onChange={() => toggleDeviceSetting('climateControl', 'enabled')}
                        label="Aktif"
                      />
                      <ToggleSwitch 
                        checked={deviceSettings.climateControl.autoMode}
                        onChange={() => toggleDeviceSetting('climateControl', 'autoMode')}
                        label="Mode Otomatis"
                      />
                    </div>
                  </div>
                  
                  <div className="device-item">
                    <div className="device-info">
                      <FaCog />
                      <span>Sensor</span>
                    </div>
                    <div className="device-controls">
                      <ToggleSwitch 
                        checked={deviceSettings.sensors.enabled}
                        onChange={() => toggleDeviceSetting('sensors', 'enabled')}
                        label="Aktif"
                      />
                      <div className="form-group">
                        <label>Kalibrasi:</label>
                        <select 
                          value={deviceSettings.sensors.calibration}
                          onChange={(e) => setDeviceSettings(prev => ({
                            ...prev,
                            sensors: { ...prev.sensors, calibration: e.target.value }
                          }))}
                        >
                          <option value="auto">Otomatis</option>
                          <option value="manual">Manual</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </SettingCard>
            </div>
          )}
        </div>

        {/* Global Actions */}
        <div className="global-actions">
          <button className="btn btn-primary" onClick={saveAllSettings}>
            <FaSave />
            <span>Simpan Semua Pengaturan</span>
          </button>
          <button className="btn btn-secondary" onClick={exportSettings}>
            <FaDownload />
            <span>Ekspor Pengaturan</span>
          </button>
          <button className="btn btn-warning" onClick={resetSettings}>
            <FaSync />
            <span>Reset ke Default</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 