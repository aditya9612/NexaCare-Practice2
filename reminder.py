from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Reminder
from app.schemas import ReminderCreate

router = APIRouter(prefix="/reminder", tags=["Reminder"])

# DB connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_reminder(reminder: ReminderCreate, db: Session = Depends(get_db)):
    db_reminder = Reminder(**reminder.dict())

    db.add(db_reminder)
    db.commit()
    db.refresh(db_reminder)

    message = f"Hello {reminder.patient_name}, your appointment with Dr. {reminder.doctor_name} is at {reminder.appointment_time}"

    print("📞 CALL MESSAGE:", message)

    return {
        "status": "success",
        "message": message
    }