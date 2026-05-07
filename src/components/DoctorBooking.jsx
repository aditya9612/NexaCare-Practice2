import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Search, 
  Target, 
  Stethoscope, 
  ArrowRight 
} from 'lucide-react';
import { MOCK_DOCTORS } from '../constraints';

export const DoctorBooking = ({ onBack, onAppointmentCreated }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleBook = () => {
    if (!selectedDoctor || !selectedSlot) return;
    
    const slot = selectedDoctor.availability[0].slots.find(s => s.id === selectedSlot);
    if (!slot) return;

    const newApt = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      patientId: 'P-1024',
      patientName: 'John Doe',
      date: new Date().toISOString().split('T')[0],
      time: slot.time,
      status: 'SCHEDULED',
      token: Math.floor(Math.random() * 50) + 1,
      type: 'CONSULTATION'
    };

    onAppointmentCreated(newApt);
    onBack();
  };

  return (
    <div className="booking-container">
      <header className="booking-header">
        <button 
          onClick={onBack}
          className="btn-back"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h2 className="header-title">Book Appointment</h2>
          <p className="header-subtitle">Select a specialist and preferred time slot.</p>
        </div>
      </header>

      <div className="grid grid-booking">
        <div className="col-doctors">
          <div className="search-bar">
            <Search className="search-icon" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, specialty, or clinic..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="doctor-grid">
            {filteredDoctors.map((doc) => (
              <motion.div
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className={`doctor-card ${selectedDoctor?.id === doc.id ? 'active' : ''}`}
              >
                <div className="doctor-info-row">
                  <img src={doc.avatar} alt={doc.name} className="doctor-avatar" />
                  <div className="doctor-details">
                    <h4 className="doctor-name">{doc.name}</h4>
                    <p className="doctor-specialty">{doc.specialty}</p>
                    <div className="doctor-stats">
                       <span className="stat-pill"><Target size={12} /> {doc.rating}</span>
                       <span className="divider" />
                       <span>{doc.experience} exp</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="col-details">
          <AnimatePresence mode="wait">
            {selectedDoctor ? (
              <motion.div
                key={selectedDoctor.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="booking-card"
              >
                <div className="card-header">
                  <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="large-avatar" />
                  <div className="header-text">
                    <h3 className="doctor-name-lg">{selectedDoctor.name}</h3>
                    <p className="education-text">{selectedDoctor.education}</p>
                  </div>
                </div>

                <div className="card-body">
                  <div className="slots-section">
                    <h5 className="section-title">Available Slots</h5>
                    <div className="slots-grid">
                      {selectedDoctor.availability[0].slots.map(slot => (
                        <button
                          key={slot.id}
                          disabled={slot.isBooked}
                          onClick={() => setSelectedSlot(slot.id)}
                          className={`slot-btn ${selectedSlot === slot.id ? 'active' : ''} ${slot.isBooked ? 'booked' : ''}`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleBook}
                    disabled={!selectedSlot}
                    className="btn-confirm"
                  >
                    Confirm Booking
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="empty-booking">
                <div className="icon-wrapper">
                  <Stethoscope size={24} />
                </div>
                <h4>Please select a doctor</h4>
                <p>Pick a specialist to view their schedule</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
