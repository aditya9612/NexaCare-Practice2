import { motion } from 'motion/react';
import { 
  Calendar, 
  ListOrdered, 
  Activity, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  HeartPulse,
  Bell,
  ArrowRight
} from 'lucide-react';

export const Dashboard = ({ appointments, onBookClick }) => {
  const stats = [
    { label: 'Upcoming', value: appointments.filter(a => a.status === 'SCHEDULED').length.toString(), icon: Calendar, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Active Queue', value: '08', icon: ListOrdered, color: 'text-slate-600', bg: 'bg-slate-100' },
    { label: 'Now Calling', value: 'T-042', icon: Activity, color: 'text-white', bg: 'bg-sky-600', isSpecial: true },
    { label: 'Cancellations', value: '02', icon: HeartPulse, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h2 className="header-title">Appointment Dashboard</h2>
          <p className="header-subtitle">Healthy morning, John! You have {appointments.length} appointments today.</p>
        </div>
        <button 
          onClick={onBookClick}
          className="btn-primary"
        >
          <Plus size={16} />
          Book New Appointment
        </button>
      </header>

      <div className="grid grid-4">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className={`card stat-card ${stat.isSpecial ? 'special' : ''}`}
          >
            <p className="stat-label">
              {stat.label}
            </p>
            <h3 className="stat-value">
              {stat.value}
            </h3>
            <p className="stat-sub">
              {i === 0 ? "+2 since morning" : i === 1 ? "Estimated wait: 45m" : i === 2 ? "Patient: Martha S." : "-5% vs yesterday"}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-main">
        <div className="col-8">
          <div className="card schedule-container">
            <div className="schedule-header">
              <h2 className="card-title">Doctor Schedule</h2>
              <div className="pagination">
                <button className="btn-icon">
                  <ChevronLeft size={20} />
                </button>
                <span className="pagination-text">Oct 12 - Oct 18, 2023</span>
                <button className="btn-icon">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div className="schedule-body">
              {appointments.length > 0 ? (
                <div className="appointment-list">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="appointment-item">
                      <div className="appointment-time">
                        <p className="time-text">{apt.time}</p>
                      </div>
                      <div className="appointment-card">
                        <h4 className="doctor-name">{apt.doctorName}</h4>
                        <p className="reason-text">{apt.reason || 'General Consultation'}</p>
                        <div className="card-footer">
                          <span className="token-text">Token #{apt.token}</span>
                          <span className="type-text">{apt.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Calendar size={48} className="empty-icon" />
                  <p>No scheduled tasks for today</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card queue-container">
            <div className="schedule-header">
              <h2 className="card-title">Today's Queue</h2>
            </div>
            <div className="queue-body">
              {[
                { name: 'Sarah Jenkins', type: 'General Checkup', status: 'Waiting' },
                { name: 'Robert Pattinson', type: 'Post-op Review', status: 'Calling', active: true },
                { name: 'James Moriarty', type: 'Consultation', status: 'Delayed', delayed: true },
                { name: 'Emily Blunt', type: 'Routine Lab Work', status: 'Waiting' }
              ].map((patient, i) => (
                <div key={i} className={`queue-item ${patient.active ? 'active' : ''}`}>
                  <div className="patient-info">
                    <span className={`queue-number ${patient.active ? 'active' : ''}`}>
                      0{i+5}
                    </span>
                    <div className="info-text">
                      <p className="patient-name">{patient.name}</p>
                      <p className="visit-type">{patient.type}</p>
                    </div>
                  </div>
                  <span className={`badge ${patient.active ? 'badge-primary' : patient.delayed ? 'badge-muted' : 'badge-success'}`}>
                    {patient.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="queue-footer">
              <button className="btn-full-queue">
                Manage Full Queue
              </button>
            </div>
          </div>

          <div className="floating-card-alt">
            <div className="notification-content">
              <div className="notification-icon">
                <Bell size={20} color="#0f172a" />
              </div>
              <div className="notification-text">
                <p className="notif-label">Reminder</p>
                <p className="notif-body">3 Reschedule requests pending review.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
