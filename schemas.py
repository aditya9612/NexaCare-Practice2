from pydantic import BaseModel

class ReminderCreate(BaseModel):
    patient_name: str
    phone_number: str
    appointment_time: str
    doctor_name: str