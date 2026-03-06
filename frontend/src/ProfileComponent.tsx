import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Mail, 
  LogOut, 
  Settings
} from 'lucide-react';
import './ProfileComponent.css';
interface ProfileProps {
  onBack: () => void;
}

const ProfileComponent: React.FC<ProfileProps> = ({ onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  // Mock Data
  const [userData, setUserData] = useState({
    name: "Elara Valentino",
    email: "elara.valention@example.com",
    role: "Premium Member",
    joined: "Jan 2024",
    status: "Verified"
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      console.log("Saving data...", userData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-container">
      {/* 3. Hubungkan tombol kembali dengan prop onBack */}
      <button className="profile-back-btn" onClick={onBack}>
        <ArrowLeft size={18} />
        Kembali ke Dashboard
      </button>

      <div className="profile-grid">
        {/* Sidebar Left */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-accent"></div>
            
            <div className="profile-avatar-wrapper">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="Profile" 
                className="profile-avatar-img"
              />
              <button className="profile-camera-btn">
                <Camera size={16} />
              </button>
            </div>

            <h2 className="profile-user-name">{userData.name}</h2>
            <div className="profile-role-tag">{userData.role}</div>

            <div className="profile-meta-info">
              <div className="meta-item">
                <p className="meta-label">Bergabung</p>
                <p className="meta-value">{userData.joined}</p>
              </div>
              <div className="meta-item">
                <p className="meta-label">Status</p>
                <p className="meta-value status-verified">
                  <CheckCircle2 size={12} /> {userData.status}
                </p>
              </div>
            </div>
          </div>

          <div className="security-info-box">
            <h4 className="security-title">
              <ShieldCheck size={16} /> Keamanan Akun
            </h4>
            <p className="security-desc">
              Akun Anda dilindungi dengan enkripsi end-to-end.
            </p>
          </div>
        </div>

        {/* Main Settings Right */}
        <div className="profile-main-settings">
          <div className="profile-card">
            <div className="card-header">
              <h3 className="card-title">
                <User size={20} /> Informasi Pribadi
              </h3>
              <button 
                className={`edit-toggle-btn ${isEditing ? 'btn-save' : ''}`}
                onClick={handleToggleEdit}
              >
                {isEditing ? 'SIMPAN PERUBAHAN' : 'EDIT PROFIL'}
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <div className="input-with-icon">
                <User className="input-icon" size={18} />
                <input 
                  type="text" 
                  className="form-input icon-padding" 
                  value={userData.name}
                  disabled={!isEditing}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Alamat Email</label>
              <div className="input-with-icon">
                <Mail className="input-icon" size={18} />
                <input 
                  type="email" 
                  className="form-input icon-padding" 
                  value={userData.email}
                  disabled={!isEditing}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h3 className="card-title title-margin">
              <Settings size={20} /> Pengaturan Notifikasi
            </h3>
            
            <div className="profile-main-settings">
              <div className="preference-item">
                <div>
                  <p className="pref-title">Notifikasi Email</p>
                  <p className="pref-subtitle">Terima update aktivitas melalui email</p>
                </div>
                <div 
                  className={`toggle-switch ${notifications ? 'toggle-active' : ''}`}
                  onClick={() => setNotifications(!notifications)}
                >
                  <div className="toggle-circle"></div>
                </div>
              </div>
            </div>

            <button className="profile-logout-btn">
              <LogOut size={18} />
              Keluar dari Sesi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;