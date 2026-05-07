import { motion } from 'motion/react';
import { NAV_ITEMS } from '../constraints';

export const Sidebar = ({ activeTab, setActiveTab, setView }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">M</div>
          <span className="logo-text">MediSync</span>
        </div>
      </div>

      <nav className="sidebar-nav custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setView('HOME');
              }}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&auto=format&fit=crop" 
            alt="User" 
            className="avatar"
          />
          <div className="user-info">
            <div className="user-name">Dr. Aris Thorne</div>
            <div className="user-role">Senior Surgeon</div>
          </div>
        </div>
      </div>
    </aside>
  );
};