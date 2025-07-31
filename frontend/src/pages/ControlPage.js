import React, { useState, useEffect } from 'react';
import { 
  FaTachometerAlt, 
  FaCog, 
  FaCalendarAlt, 
  FaUser,
  FaThermometerHalf,
  FaTint,
  FaSun,
  FaWater,
  FaCheck,
  FaExclamationTriangle,
  FaCogs,
  FaLightbulb,
  FaMicrochip,
  FaWifi,
  FaSignOutAlt,
  FaPowerOff,
  FaPlay,
  FaClock,
  FaSlidersH,
  FaPause,
  FaStop,
  FaHistory,
  FaChartLine,
  FaInfoCircle,
  FaToggleOn,
  FaToggleOff,
  FaFan
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/ControlPage.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ControlPage = ({ setCurrentPage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('watering');
  
  // Control states
  const [wateringSystem, setWateringSystem] = useState({
    isActive: true,
    mode: 'auto', // auto, manual, schedule
    schedule: {
      startTime: '06:00',
      endTime: '18:00',
      interval: 30, // minutes
      duration: 5 // minutes
    },
    currentStatus: 'running',
    lastRun: '2 jam lalu',
    nextRun: '30 menit lagi'
  });

  const [nutrientSystem, setNutrientSystem] = useState({
    isActive: true,
    mode: 'auto',
    concentration: 1200, // ppm
    phLevel: 6.0,
    lastRefill: '3 hari lalu',
    tankLevel: 75 // percentage
  });

  const [lightingSystem, setLightingSystem] = useState({
    isActive: true,
    mode: 'auto',
    intensity: 80, // percentage
    schedule: {
      startTime: '06:00',
      endTime: '22:00'
    },
    uvMode: false,
    currentStatus: 'on'
  });

  const [climateControl, setClimateControl] = useState({
    isActive: true,
    temperature: {
      target: 25,
      current: 28,
      min: 20,
      max: 30
    },
    humidity: {
      target: 65,
      current: 70,
      min: 50,
      max: 80
    },
    fanSpeed: 60 // percentage
  });

  const [sensors, setSensors] = useState({
    ph: { value: 6.2, status: 'normal' },
    temperature: { value: 28, status: 'warning' },
    humidity: { value: 70, status: 'normal' },
    light: { value: 850, status: 'warning' },
    waterLevel: { value: 80, status: 'normal' },
    tds: { value: 1200, status: 'normal' }
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

  // Control functions
  const toggleSystem = (system, setSystem) => {
    setSystem(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  const updateWateringSchedule = (field, value) => {
    setWateringSystem(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value
      }
    }));
  };

  const updateNutrientSettings = (field, value) => {
    setNutrientSystem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateLightingSettings = (field, value) => {
    setLightingSystem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateClimateSettings = (field, value) => {
    setClimateControl(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Chart data for system monitoring
  const systemChartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Suhu (°C)',
        data: [22, 24, 28, 32, 30, 26],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Kelembapan (%)',
        data: [70, 68, 65, 60, 65, 68],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monitoring Sistem Kontrol',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Control Card Component
  const ControlCard = ({ title, icon, isActive, onToggle, children }) => (
    <div className="control-card">
      <div className="control-header">
        <div className="control-title">
          {icon}
          <h3>{title}</h3>
        </div>
        <div className="control-toggle">
          <button 
            className={`toggle-btn ${isActive ? 'active' : 'inactive'}`}
            onClick={onToggle}
          >
            {isActive ? <FaToggleOn /> : <FaToggleOff />}
          </button>
        </div>
      </div>
      <div className="control-content">
        {children}
      </div>
    </div>
  );

  // Status Indicator Component
  const StatusIndicator = ({ status, text }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'running': return '#28a745';
        case 'stopped': return '#dc3545';
        case 'warning': return '#ffc107';
        case 'normal': return '#28a745';
        default: return '#6c757d';
      }
    };

    return (
      <div className="status-indicator">
        <div className="status-dot" style={{ backgroundColor: getStatusColor() }}></div>
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className="control-container">
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
          <div className="nav-item active">
            <FaCog />
            <span>Kontrol</span>
          </div>
          <div className="nav-item">
            <FaCalendarAlt />
            <span>Jadwal</span>
          </div>
          <div className="nav-item">
            <FaUser />
            <span>Pengaturan</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Kontrol Peralatan IoT</h1>
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

        {/* Control Tabs */}
        <div className="control-tabs">
          <button 
            className={`tab-btn ${activeTab === 'watering' ? 'active' : ''}`}
            onClick={() => setActiveTab('watering')}
          >
            <FaWater />
            <span>Penyiraman</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'nutrient' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrient')}
          >
            <FaTint />
            <span>Nutrisi</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'lighting' ? 'active' : ''}`}
            onClick={() => setActiveTab('lighting')}
          >
            <FaSun />
            <span>Pencahayaan</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'climate' ? 'active' : ''}`}
            onClick={() => setActiveTab('climate')}
          >
            <FaThermometerHalf />
            <span>Iklim</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'monitoring' ? 'active' : ''}`}
            onClick={() => setActiveTab('monitoring')}
          >
            <FaChartLine />
            <span>Monitoring</span>
          </button>
        </div>

        {/* Control Content */}
        <div className="control-content-area">
          {activeTab === 'watering' && (
            <div className="tab-content">
              <ControlCard
                title="Sistem Penyiraman Otomatis"
                icon={<FaWater />}
                isActive={wateringSystem.isActive}
                onToggle={() => toggleSystem(wateringSystem, setWateringSystem)}
              >
                <div className="control-grid">
                  <div className="control-info">
                    <h4>Status Sistem</h4>
                    <StatusIndicator status={wateringSystem.currentStatus} text={wateringSystem.currentStatus === 'running' ? 'Berjalan' : 'Berhenti'} />
                    <p>Terakhir berjalan: {wateringSystem.lastRun}</p>
                    <p>Berikutnya: {wateringSystem.nextRun}</p>
                  </div>
                  
                  <div className="control-settings">
                    <h4>Pengaturan Jadwal</h4>
                    <div className="setting-group">
                      <label>Mode:</label>
                      <select 
                        value={wateringSystem.mode}
                        onChange={(e) => setWateringSystem(prev => ({ ...prev, mode: e.target.value }))}
                      >
                        <option value="auto">Otomatis</option>
                        <option value="manual">Manual</option>
                        <option value="schedule">Jadwal</option>
                      </select>
                    </div>
                    
                    <div className="setting-group">
                      <label>Waktu Mulai:</label>
                      <input 
                        type="time" 
                        value={wateringSystem.schedule.startTime}
                        onChange={(e) => updateWateringSchedule('startTime', e.target.value)}
                      />
                    </div>
                    
                    <div className="setting-group">
                      <label>Waktu Selesai:</label>
                      <input 
                        type="time" 
                        value={wateringSystem.schedule.endTime}
                        onChange={(e) => updateWateringSchedule('endTime', e.target.value)}
                      />
                    </div>
                    
                    <div className="setting-group">
                      <label>Interval (menit):</label>
                      <input 
                        type="number" 
                        value={wateringSystem.schedule.interval}
                        onChange={(e) => updateWateringSchedule('interval', parseInt(e.target.value))}
                        min="5"
                        max="120"
                      />
                    </div>
                    
                    <div className="setting-group">
                      <label>Durasi (menit):</label>
                      <input 
                        type="number" 
                        value={wateringSystem.schedule.duration}
                        onChange={(e) => updateWateringSchedule('duration', parseInt(e.target.value))}
                        min="1"
                        max="30"
                      />
                    </div>
                  </div>
                  
                  <div className="control-actions">
                    <h4>Aksi Manual</h4>
                    <div className="action-buttons">
                      <button className="btn btn-primary">
                        <FaPlay />
                        <span>Mulai</span>
                      </button>
                      <button className="btn btn-warning">
                        <FaPause />
                        <span>Jeda</span>
                      </button>
                      <button className="btn btn-danger">
                        <FaStop />
                        <span>Stop</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ControlCard>
            </div>
          )}

          {activeTab === 'nutrient' && (
            <div className="tab-content">
              <ControlCard
                title="Sistem Nutrisi"
                icon={<FaTint />}
                isActive={nutrientSystem.isActive}
                onToggle={() => toggleSystem(nutrientSystem, setNutrientSystem)}
              >
                <div className="control-grid">
                  <div className="control-info">
                    <h4>Status Tangki</h4>
                    <div className="tank-level">
                      <div className="tank-indicator">
                        <div className="tank-fill" style={{ height: `${nutrientSystem.tankLevel}%` }}></div>
                      </div>
                      <span>{nutrientSystem.tankLevel}%</span>
                    </div>
                    <p>Terakhir isi: {nutrientSystem.lastRefill}</p>
                  </div>
                  
                  <div className="control-settings">
                    <h4>Pengaturan Nutrisi</h4>
                    <div className="setting-group">
                      <label>Konsentrasi TDS (ppm):</label>
                      <input 
                        type="number" 
                        value={nutrientSystem.concentration}
                        onChange={(e) => updateNutrientSettings('concentration', parseInt(e.target.value))}
                        min="800"
                        max="2000"
                      />
                    </div>
                    
                    <div className="setting-group">
                      <label>pH Level:</label>
                      <input 
                        type="number" 
                        value={nutrientSystem.phLevel}
                        onChange={(e) => updateNutrientSettings('phLevel', parseFloat(e.target.value))}
                        min="5.0"
                        max="7.0"
                        step="0.1"
                      />
                    </div>
                    
                    <div className="setting-group">
                      <label>Mode:</label>
                      <select 
                        value={nutrientSystem.mode}
                        onChange={(e) => updateNutrientSettings('mode', e.target.value)}
                      >
                        <option value="auto">Otomatis</option>
                        <option value="manual">Manual</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="control-actions">
                    <h4>Aksi Manual</h4>
                    <div className="action-buttons">
                      <button className="btn btn-primary">
                        <FaCogs />
                        <span>Pompa Nutrisi</span>
                      </button>
                      <button className="btn btn-info">
                        <FaInfoCircle />
                        <span>Kalibrasi pH</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ControlCard>
            </div>
          )}

          {activeTab === 'lighting' && (
            <div className="tab-content">
              <ControlCard
                title="Sistem Pencahayaan"
                icon={<FaSun />}
                isActive={lightingSystem.isActive}
                onToggle={() => toggleSystem(lightingSystem, setLightingSystem)}
              >
                <div className="control-grid">
                  <div className="control-info">
                    <h4>Status Lampu</h4>
                    <StatusIndicator status={lightingSystem.currentStatus} text={lightingSystem.currentStatus === 'on' ? 'Menyala' : 'Mati'} />
                    <p>Intensitas: {lightingSystem.intensity}%</p>
                    <p>UV Mode: {lightingSystem.uvMode ? 'Aktif' : 'Nonaktif'}</p>
                  </div>
                  
                  <div className="control-settings">
                    <h4>Pengaturan Pencahayaan</h4>
                    <div className="setting-group">
                      <label>Mode:</label>
                      <select 
                        value={lightingSystem.mode}
                        onChange={(e) => updateLightingSettings('mode', e.target.value)}
                      >
                        <option value="auto">Otomatis</option>
                        <option value="manual">Manual</option>
                        <option value="schedule">Jadwal</option>
                      </select>
                    </div>
                    
                    <div className="setting-group">
                      <label>Intensitas (%):</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={lightingSystem.intensity}
                        onChange={(e) => updateLightingSettings('intensity', parseInt(e.target.value))}
                        className="slider"
                      />
                      <span>{lightingSystem.intensity}%</span>
                    </div>
                    
                    <div className="setting-group">
                      <label>Waktu Mulai:</label>
                      <input 
                        type="time" 
                        value={lightingSystem.schedule.startTime}
                        onChange={(e) => updateLightingSettings('schedule', { ...lightingSystem.schedule, startTime: e.target.value })}
                      />
                    </div>
                    
                    <div className="setting-group">
                      <label>Waktu Selesai:</label>
                      <input 
                        type="time" 
                        value={lightingSystem.schedule.endTime}
                        onChange={(e) => updateLightingSettings('schedule', { ...lightingSystem.schedule, endTime: e.target.value })}
                      />
                    </div>
                    
                    <div className="setting-group">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={lightingSystem.uvMode}
                          onChange={(e) => updateLightingSettings('uvMode', e.target.checked)}
                        />
                        UV Mode
                      </label>
                    </div>
                  </div>
                  
                  <div className="control-actions">
                    <h4>Aksi Manual</h4>
                    <div className="action-buttons">
                      <button className="btn btn-primary">
                        <FaPlay />
                        <span>Nyalakan</span>
                      </button>
                      <button className="btn btn-danger">
                        <FaPowerOff />
                        <span>Matikan</span>
                      </button>
                      <button className="btn btn-warning">
                        <FaLightbulb />
                        <span>UV Mode</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ControlCard>
            </div>
          )}

          {activeTab === 'climate' && (
            <div className="tab-content">
              <ControlCard
                title="Kontrol Iklim"
                icon={<FaThermometerHalf />}
                isActive={climateControl.isActive}
                onToggle={() => toggleSystem(climateControl, setClimateControl)}
              >
                <div className="control-grid">
                  <div className="control-info">
                    <h4>Kondisi Saat Ini</h4>
                    <div className="climate-status">
                      <div className="climate-item">
                        <FaThermometerHalf />
                        <span>Suhu: {climateControl.temperature.current}°C</span>
                      </div>
                      <div className="climate-item">
                        <FaTint />
                        <span>Kelembapan: {climateControl.humidity.current}%</span>
                      </div>
                      <div className="climate-item">
                        <FaFan />
                        <span>Kipas: {climateControl.fanSpeed}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="control-settings">
                    <h4>Pengaturan Target</h4>
                    <div className="setting-group">
                      <label>Suhu Target (°C):</label>
                      <input 
                        type="number" 
                        value={climateControl.temperature.target}
                        onChange={(e) => updateClimateSettings('temperature', { ...climateControl.temperature, target: parseInt(e.target.value) })}
                        min="15"
                        max="35"
                      />
                    </div>
                    
                    <div className="setting-group">
                      <label>Kelembapan Target (%):</label>
                      <input 
                        type="number" 
                        value={climateControl.humidity.target}
                        onChange={(e) => updateClimateSettings('humidity', { ...climateControl.humidity, target: parseInt(e.target.value) })}
                        min="40"
                        max="90"
                      />
                    </div>
                    
                    <div className="setting-group">
                      <label>Kecepatan Kipas (%):</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={climateControl.fanSpeed}
                        onChange={(e) => updateClimateSettings('fanSpeed', parseInt(e.target.value))}
                        className="slider"
                      />
                      <span>{climateControl.fanSpeed}%</span>
                    </div>
                  </div>
                  
                  <div className="control-actions">
                    <h4>Aksi Manual</h4>
                    <div className="action-buttons">
                      <button className="btn btn-primary">
                        <FaFan />
                        <span>Kipas On</span>
                      </button>
                      <button className="btn btn-danger">
                        <FaPowerOff />
                        <span>Kipas Off</span>
                      </button>
                      <button className="btn btn-info">
                        <FaSlidersH />
                        <span>Auto Mode</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ControlCard>
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div className="tab-content">
              <div className="monitoring-grid">
                <div className="monitoring-card">
                  <h3>Status Sensor</h3>
                  <div className="sensor-grid">
                    {Object.entries(sensors).map(([key, sensor]) => (
                      <div key={key} className="sensor-item">
                        <div className="sensor-icon">
                          {key === 'ph' && <FaTint />}
                          {key === 'temperature' && <FaThermometerHalf />}
                          {key === 'humidity' && <FaTint />}
                          {key === 'light' && <FaSun />}
                          {key === 'waterLevel' && <FaWater />}
                          {key === 'tds' && <FaMicrochip />}
                        </div>
                        <div className="sensor-info">
                          <span className="sensor-name">{key.toUpperCase()}</span>
                          <span className="sensor-value">{sensor.value}</span>
                          <StatusIndicator status={sensor.status} text={sensor.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="monitoring-card">
                  <h3>Grafik Monitoring</h3>
                  <Line data={systemChartData} options={chartOptions} />
                </div>
                
                <div className="monitoring-card">
                  <h3>Riwayat Aktivitas</h3>
                  <div className="activity-log">
                    <div className="activity-item">
                      <FaClock />
                      <span>Penyiraman selesai - 2 jam lalu</span>
                    </div>
                    <div className="activity-item">
                      <FaCogs />
                      <span>Pompa nutrisi aktif - 3 jam lalu</span>
                    </div>
                    <div className="activity-item">
                      <FaLightbulb />
                      <span>Lampu UV dimatikan - 4 jam lalu</span>
                    </div>
                    <div className="activity-item">
                      <FaFan />
                      <span>Kipas kecepatan tinggi - 5 jam lalu</span>
                    </div>
                    <div className="activity-item">
                      <FaExclamationTriangle />
                      <span>Peringatan suhu tinggi - 6 jam lalu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPage; 