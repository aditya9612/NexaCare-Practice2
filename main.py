from fastapi import FastAPI
from app.routes import reminder
from app.database import engine
from app import models

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Voice Reminder API")

app.include_router(reminder.router)

@app.get("/")
def root():
    return {"message": "API Running Successfully"}