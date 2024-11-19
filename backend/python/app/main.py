""" main """
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from app.models.glucose_reading import GlucoseReading


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", status_code=status.HTTP_200_OK)
async def welcome():
    """ Defines the home page """
    return { "message": "Hello and welcome to Glucose Champion!" }

# Sample data store (replace with actual database integration later)
glucose_readings = [{"id": 1, "timestamp": "2024-10-30 10:25.30", "value": 189.0}]

@app.get("/api/glucose", status_code=status.HTTP_200_OK)
def get_glucose_readings():
    """ Gets glucose readings """
    return glucose_readings

@app.post("/api/glucose", status_code=status.HTTP_201_CREATED)
def create_glucose_reading(reading: GlucoseReading):
    """ Creates a glucose reading """
    glucose_readings.append(reading.dict())
    return reading
