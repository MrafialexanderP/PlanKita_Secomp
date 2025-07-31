import React, { useState, useEffect } from 'react';
import { 
  FaTachometerAlt, 
  FaCog, 
  FaCalendarAlt, 
  FaUser,
  FaWater,
  FaTint,
  FaSun,
  FaThermometerHalf,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaClock,
  FaCalendar,
  FaSignOutAlt,
  FaBell,
  FaBellSlash,
  FaRepeat,
  FaPlay,
  FaPause,
  FaStop,
  FaInfoCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import '../styles/SchedulePage.css';

const SchedulePage = ({ setCurrentPage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('daily');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  // Schedule states
  const [schedules, setSchedules] = useState({
    daily: [
      {
        id: 1,
        name: 'Penyiraman Pagi',
        type: 'watering',
        time: '06:00',
        duration: 5,
        days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
        isActive: true,
        lastRun: '2 jam lalu',
        nextRun: 'Besok 06:00'
      },
      {
        id: 2,
        name: 'Penyiraman Sore',
        type: 'watering',
        time: '18:00',
        duration: 5,
        days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
        isActive: true,
        lastRun: '6 jam lalu',
        nextRun: 'Hari ini 18:00'
      },
      {
        id: 3,
        name: 'Lampu Hidroponik',
        type: 'lighting',
        time: '06:00',
        duration: 16,
        days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
        isActive: true,
        lastRun: '2 jam lalu',
        nextRun: 'Hari ini 22:00'
      }
    ],
    weekly: [
      {
        id: 4,
        name: 'Pemupukan Nutrisi',
        type: 'nutrient',
        time: '08:00',
        duration: 10,
        days: ['Senin', 'Rabu', 'Jumat'],
        isActive: true,
        lastRun: '3 hari lalu',
        nextRun: 'Senin 08:00'
      },
      {
        id: 5,
        name: 'Kalibrasi Sensor pH',
        type: 'maintenance',
        time: '10:00',
        duration: 15,
        days: ['Minggu'],
        isActive: false,
        lastRun: '1 minggu lalu',
        nextRun: 'Minggu 10:00'
      }
    ],
    monthly: [
      {
        id: 6,
        name: 'Pembersihan Sistem',
        type: 'maintenance',
        time: '09:00',
        duration: 60,
        days: ['Minggu pertama'],
        isActive: true,
        lastRun: '3 minggu lalu',
        nextRun: 'Minggu depan'
      }
    ]
  });

  // New schedule form
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    type: 'watering',
    time: '08:00',
    duration: 5,
    days: [],
    isActive: true
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

  // Schedule functions
  const toggleSchedule = (scheduleId) => {
    setSchedules(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(schedule =>
        schedule.id === scheduleId
          ? { ...schedule, isActive: !schedule.isActive }
          : schedule
      )
    }));
  };

  const deleteSchedule = (scheduleId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      setSchedules(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(schedule => schedule.id !== scheduleId)
      }));
    }
  };

  const editSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setNewSchedule({
      name: schedule.name,
      type: schedule.type,
      time: schedule.time,
      duration: schedule.duration,
      days: schedule.days,
      isActive: schedule.isActive
    });
    setShowAddModal(true);
  };

  const addSchedule = () => {
    setEditingSchedule(null);
    setNewSchedule({
      name: '',
      type: 'watering',
      time: '08:00',
      duration: 5,
      days: [],
      isActive: true
    });
    setShowAddModal(true);
  };

  const saveSchedule = () => {
    if (!newSchedule.name.trim()) {
      alert('Nama jadwal harus diisi!');
      return;
    }

    if (newSchedule.days.length === 0) {
      alert('Pilih minimal satu hari!');
      return;
    }

    if (editingSchedule) {
      // Update existing schedule
      setSchedules(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(schedule =>
          schedule.id === editingSchedule.id
            ? { ...schedule, ...newSchedule }
            : schedule
        )
      }));
    } else {
      // Add new schedule
      const newId = Math.max(...schedules[activeTab].map(s => s.id), 0) + 1;
      const scheduleToAdd = {
        id: newId,
        ...newSchedule,
        lastRun: 'Belum pernah',
        nextRun: 'Segera'
      };

      setSchedules(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], scheduleToAdd]
      }));
    }

    setShowAddModal(false);
    setEditingSchedule(null);
  };

  const toggleDay = (day) => {
    setNewSchedule(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  // Get schedule type icon
  const getScheduleIcon = (type) => {
    switch (type) {
      case 'watering': return <FaWater />;
      case 'nutrient': return <FaTint />;
      case 'lighting': return <FaSun />;
      case 'climate': return <FaThermometerHalf />;
      case 'maintenance': return <FaCog />;
      default: return <FaClock />;
    }
  };

  // Get schedule type color
  const getScheduleColor = (type) => {
    switch (type) {
      case 'watering': return '#007bff';
      case 'nutrient': return '#28a745';
      case 'lighting': return '#ffc107';
      case 'climate': return '#17a2b8';
      case 'maintenance': return '#6c757d';
      default: return '#6c757d';
    }
  };

  // Schedule Card Component
  const ScheduleCard = ({ schedule }) => (
    <div className="schedule-card">
      <div className="schedule-header">
        <div className="schedule-icon" style={{ color: getScheduleColor(schedule.type) }}>
          {getScheduleIcon(schedule.type)}
        </div>
        <div className="schedule-info">
          <h4>{schedule.name}</h4>
          <p className="schedule-time">
            <FaClock />
            {schedule.time} ({schedule.duration} menit)
          </p>
          <p className="schedule-days">
            <FaCalendar />
            {schedule.days.join(', ')}
          </p>
        </div>
        <div className="schedule-status">
          <button 
            className={`status-btn ${schedule.isActive ? 'active' : 'inactive'}`}
            onClick={() => toggleSchedule(schedule.id)}
          >
            {schedule.isActive ? <FaCheck /> : <FaPause />}
          </button>
        </div>
      </div>
      
      <div className="schedule-details">
        <div className="detail-item">
          <span>Terakhir:</span>
          <span>{schedule.lastRun}</span>
        </div>
        <div className="detail-item">
          <span>Berikutnya:</span>
          <span>{schedule.nextRun}</span>
        </div>
      </div>
      
      <div className="schedule-actions">
        <button 
          className="action-btn edit-btn"
          onClick={() => editSchedule(schedule)}
        >
          <FaEdit />
          <span>Edit</span>
        </button>
        <button 
          className="action-btn delete-btn"
          onClick={() => deleteSchedule(schedule.id)}
        >
          <FaTrash />
          <span>Hapus</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="schedule-container">
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
          <div className="nav-item active">
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
          <h1>Jadwal Perawatan</h1>
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

        {/* Schedule Tabs */}
        <div className="schedule-tabs">
          <button 
            className={`tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            <FaCalendar />
            <span>Harian</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            <FaRepeat />
            <span>Mingguan</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            <FaCalendarAlt />
            <span>Bulanan</span>
          </button>
        </div>

        {/* Add Schedule Button */}
        <div className="add-schedule-section">
          <button className="add-btn" onClick={addSchedule}>
            <FaPlus />
            <span>Tambah Jadwal Baru</span>
          </button>
        </div>

        {/* Schedule Content */}
        <div className="schedule-content">
          <div className="schedule-grid">
            {schedules[activeTab].map(schedule => (
              <ScheduleCard key={schedule.id} schedule={schedule} />
            ))}
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>{editingSchedule ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="form-group">
                  <label>Nama Jadwal:</label>
                  <input 
                    type="text"
                    value={newSchedule.name}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Contoh: Penyiraman Pagi"
                  />
                </div>
                
                <div className="form-group">
                  <label>Tipe Jadwal:</label>
                  <select 
                    value={newSchedule.type}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="watering">Penyiraman</option>
                    <option value="nutrient">Nutrisi</option>
                    <option value="lighting">Pencahayaan</option>
                    <option value="climate">Iklim</option>
                    <option value="maintenance">Pemeliharaan</option>
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Waktu:</label>
                    <input 
                      type="time"
                      value={newSchedule.time}
                      onChange={(e) => setNewSchedule(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Durasi (menit):</label>
                    <input 
                      type="number"
                      value={newSchedule.duration}
                      onChange={(e) => setNewSchedule(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      min="1"
                      max="120"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Hari:</label>
                  <div className="days-selector">
                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(day => (
                      <button
                        key={day}
                        type="button"
                        className={`day-btn ${newSchedule.days.includes(day) ? 'selected' : ''}`}
                        onClick={() => toggleDay(day)}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>
                    <input 
                      type="checkbox"
                      checked={newSchedule.isActive}
                      onChange={(e) => setNewSchedule(prev => ({ ...prev, isActive: e.target.checked }))}
                    />
                    Aktifkan jadwal
                  </label>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Batal
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={saveSchedule}
                >
                  {editingSchedule ? 'Update' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage; 