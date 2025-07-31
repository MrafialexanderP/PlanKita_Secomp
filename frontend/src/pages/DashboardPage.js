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
  FaSignOutAlt
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
import '../styles/DashboardPage.css';

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

const DashboardPage = ({ setCurrentPage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sensorData, setSensorData] = useState({
    ph: 7.0,
    temperature: 30,
    humidity: 65,
    lightIntensity: 850,
    waterLevel: 80
  });
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  // Chart data for temperature over time
  const temperatureChartData = {
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
    ],
  };

  // Chart data for humidity over time
  const humidityChartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Kelembapan (%)',
        data: [70, 68, 65, 60, 65, 68],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monitoring Hidroponik',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Logout function
  const handleLogout = () => {
    // Clear any stored user data (if using localStorage)
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    
    // Show confirmation message
    alert('Anda telah berhasil logout dari dashboard');
    
    // Navigate back to home page
    setCurrentPage('home');
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  // Sensor card component
  const SensorCard = ({ title, value, unit, icon, idealRange, status }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'normal': return 'green';
        case 'warning': return 'orange';
        case 'danger': return 'red';
        default: return 'green';
      }
    };

    return (
      <div className="sensor-card">
        <div className="sensor-header">
          {icon}
          <h3>{title}</h3>
        </div>
        <div className="sensor-value" style={{ color: getStatusColor() }}>
          {value}{unit}
        </div>
        <div className="sensor-range">
          Ideal: {idealRange}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">🌱</div>
            <span>PlantKita</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item active">
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
          <div className="nav-item" onClick={() => setCurrentPage('settings')}>
            <FaUser />
            <span>Pengaturan</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Dasbor Pemantauan Hidroponik</h1>
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

        {/* Time and Date Section */}
        <div className="time-section">
          <div className="time-display">
            <div className="time">{formatTime(currentTime)}</div>
            <div className="date">{formatDate(currentTime)}</div>
          </div>
        </div>

        {/* Alert Section */}
        <div className="alert-section">
          <div className="alert-banner">
            <FaExclamationTriangle />
            <span>Perhatian diperlukan</span>
          </div>
          <div className="last-update">
            Update terakhir: 2 menit lalu
          </div>
        </div>

        {/* Sensor Readings */}
        <div className="sensor-grid">
          <SensorCard
            title="pH Air"
            value={sensorData.ph}
            unit=""
            icon={<FaTint />}
            idealRange="5.5 - 6.5"
            status="danger"
          />
          <SensorCard
            title="Suhu"
            value={sensorData.temperature}
            unit="°C"
            icon={<FaThermometerHalf />}
            idealRange="20°C - 28°C"
            status="warning"
          />
          <SensorCard
            title="Kelembapan"
            value={sensorData.humidity}
            unit="%"
            icon={<FaTint />}
            idealRange="50% - 70%"
            status="normal"
          />
          <SensorCard
            title="Intensitas Cahaya"
            value={sensorData.lightIntensity}
            unit=" lux"
            icon={<FaSun />}
            idealRange="1000 lux - 15000 lux"
            status="warning"
          />
          <SensorCard
            title="Level Air"
            value={sensorData.waterLevel}
            unit="%"
            icon={<FaWater />}
            idealRange="50% - 100%"
            status="normal"
          />
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-container">
            <h3>Grafik Suhu Harian</h3>
            <Line data={temperatureChartData} options={chartOptions} />
          </div>
          <div className="chart-container">
            <h3>Grafik Kelembapan Harian</h3>
            <Line data={humidityChartData} options={chartOptions} />
          </div>
        </div>

        {/* Info Sections */}
        <div className="info-sections">
          <div className="info-card">
            <h3>Info Kontrol</h3>
            <div className="control-list">
              <div className="control-item">
                <FaCogs />
                <span>Pompa Nutrisi</span>
                <FaCheck className="status-icon" />
              </div>
              <div className="control-item">
                <FaCogs />
                <span>Pompa Air</span>
                <FaCheck className="status-icon" />
              </div>
              <div className="control-item">
                <FaLightbulb />
                <span>Lampu UV</span>
                <FaCheck className="status-icon" />
              </div>
              <div className="control-item">
                <FaMicrochip />
                <span>Sensor pH</span>
                <FaCheck className="status-icon" />
              </div>
              <div className="control-item">
                <FaMicrochip />
                <span>Sensor BME280</span>
                <FaCheck className="status-icon" />
              </div>
              <div className="control-item">
                <FaMicrochip />
                <span>Sensor Ultrasonic</span>
                <FaCheck className="status-icon" />
              </div>
              <div className="control-item">
                <FaMicrochip />
                <span>Sensor TDS Meter</span>
                <FaCheck className="status-icon" />
              </div>
              <div className="control-item">
                <FaMicrochip />
                <span>Sensor LDR</span>
                <FaCheck className="status-icon" />
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Info Sistem</h3>
            <div className="system-info">
              <div className="system-item">
                <span>Waktu Operasi:</span>
                <span>12 Jam 34 Menit</span>
              </div>
              <div className="system-item">
                <span>Tanaman Aktif:</span>
                <span>24 Unit</span>
              </div>
              <div className="system-item">
                <span>Update Terakhir:</span>
                <span>20 Jul 2025 14:42</span>
              </div>
              <div className="system-item">
                <span>Status Koneksi:</span>
                <span className="connected">
                  <FaWifi />
                  Terhubung
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 