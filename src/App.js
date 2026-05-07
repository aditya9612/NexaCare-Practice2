import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Bell, 
  Search, 
  ArrowRight
} from 'lucide-react';
import { 
  NAV_ITEMS, 
  MOCK_APPOINTMENTS 
} from './constraints';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { DoctorBooking } from './components/DoctorBooking';
import { AppointmentsList } from './components/AppointmentsList';

const PlaceholderView = ({ title }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="placeholder-view"
  >
    <div className="placeholder-icon-wrapper">
      <Search size={40} className="placeholder-icon" />
    </div>
    <h2 className="placeholder-title">{title}</h2>
    <p className="placeholder-text">This module is currently being synchronized with the hospital server.</p>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [view, setView] = useState('HOME');

  const addAppointment = (newApt) => {
    setAppointments(prev => [newApt, ...prev]);
  };

  const renderContent = () => {
    if (view === 'BOOKING' || activeTab === 'doctors') {
      return (
        <DoctorBooking 
          key="booking"
          onBack={() => {
            setView('HOME');
            setActiveTab('dashboard');
          }} 
          onAppointmentCreated={addAppointment} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            key="dashboard"
            appointments={appointments} 
            onBookClick={() => setView('BOOKING')} 
          />
        );
      case 'appointments':
        return <AppointmentsList appointments={appointments} />;
      case 'queue':
        return <PlaceholderView title="Live Hospital Queue" />;
      case 'records':
        return <PlaceholderView title="Medical Records" />;
      case 'settings':
        return <PlaceholderView title="Settings & Profile" />;
      default:
        return <Dashboard appointments={appointments} onBookClick={() => setView('BOOKING')} />;
    }
  };

  return (
    <div className="app-container font-sans selection-highlight">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(id) => {
          setActiveTab(id);
          setView('HOME');
        }} 
        setView={setView} 
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header Bar */}
        <header className="top-header">
          <h1 className="header-title capitalize">
            {view === 'BOOKING' ? 'Find Specialist' : activeTab.replace('-', ' ')}
          </h1>
          <div className="header-actions md-visible">
            <div className="search-box">
              <Search className="search-icon" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-control"
              />
            </div>
            <button className="notification-btn">
              <Bell size={20} />
              <span className="dot" />
            </button>
          </div>
        </header>

        <div className="content-wrapper scroll-container">
          <div className="container-inner">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Floating Notification Box */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="floating-box"
      >
        <div className="notification-icon">
          <Bell size={20} color="#0f172a" />
        </div>
        <div className="notification-details">
          <p className="notif-label">Reminder</p>
          <p className="notif-body">3 Reschedule requests pending review.</p>
        </div>
        <div className="notif-action md-visible">
           <ArrowRight size={16} color="#64748b" />
        </div>
      </motion.div>

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        {NAV_ITEMS.slice(0, 4).map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setView('HOME');
              }}
              className={`mobile-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          )
        })}
      </nav>
    </div>
  );
}
