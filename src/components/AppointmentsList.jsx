import { motion } from 'motion/react';
import { Calendar, Clock, User, Stethoscope, Tag, CheckCircle2, ChevronRight } from 'lucide-react';

export const AppointmentsList = ({ appointments }) => {
  return (
    <div className="appointments-view">
      <div className="view-header">
        <div>
          <h2 className="header-title">My Appointments</h2>
          <p className="header-subtitle">Manage and track your scheduled hospital visits.</p>
        </div>
      </div>

      <div className="appointments-grid">
        {appointments.length > 0 ? (
          appointments.map((apt, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              key={apt.id}
              className="appointment-row-card"
            >
              <div className="card-inner">
                <div className={`status-strip ${apt.status}`} />

                <div className="card-content">
                  <div className="doctor-section">
                    <div className="doctor-icon">
                      <Stethoscope size={24} />
                    </div>
                    <div className="doctor-info">
                      <h4 className="doctor-name">{apt.doctorName}</h4>
                      <p className="specialty-label">
                        {apt.doctorSpecialty || 'General Practitioner'}
                      </p>
                    </div>
                  </div>

                  <div className="details-section">
                    <div className="detail-item">
                      <Calendar size={14} className="detail-icon" />
                      <div className="detail-text">
                        <p className="label">Date</p>
                        <p className="value">{apt.date}</p>
                      </div>
                    </div>
                    
                    <div className="detail-item">
                      <Clock size={14} className="detail-icon" />
                      <div className="detail-text">
                        <p className="label">Time</p>
                        <p className="value">{apt.time}</p>
                      </div>
                    </div>

                    <div className="detail-item">
                      <User size={14} className="detail-icon" />
                      <div className="detail-text">
                        <p className="label">Patient ID</p>
                        <p className="value-bold">{apt.patientId}</p>
                      </div>
                    </div>

                    <div className="detail-item">
                      <Tag size={14} className="detail-icon" />
                      <div className="detail-text">
                        <p className="label">Type</p>
                        <p className="value">{apt.type}</p>
                      </div>
                    </div>
                  </div>

                  <div className="actions-section">
                    <div className={`status-badge ${apt.status}`}>
                      {apt.status === 'COMPLETED' && <CheckCircle2 size={12} />}
                      {apt.status}
                    </div>
                    <div className="arrow-icon">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="empty-appointments">
             <Calendar size={48} className="empty-icon" />
             <h3 className="empty-title">No appointments found</h3>
             <p className="empty-subtitle">You don't have any appointments scheduled yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
