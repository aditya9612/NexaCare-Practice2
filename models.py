from sqlalchemy import Column, Integer, String
from app.database import Base

class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String)
    phone_number = Column(String)
    appointment_time = Column(String)
    doctor_name = Column(String)