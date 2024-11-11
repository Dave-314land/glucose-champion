""" main """
from fastapi import FastAPI, status
from app.models.glucose_reading import GlucoseReading
from app.models.insulin_entry import InsulinEntry


app = FastAPI()

@app.get("/", status_code=status.HTTP_200_OK)
async def welcome():
    """ Defines the home page """
    return { "message": "Hello and welcome to Glucose Champion!" }

# Sample data store (replace with actual database integration later)
glucose_readings = []
insulin_entries = []

@app.get("/api/glucose", status_code=status.HTTP_200_OK)
def get_glucose_readings():
    """ Gets glucose readings """
    return glucose_readings

@app.post("/api/glucose", status_code=status.HTTP_201_CREATED)
def create_glucose_reading(reading: GlucoseReading):
    """ Creates a glucose reading """
    glucose_readings.append(reading.dict())
    return reading

@app.get("/api/insulin", status_code=status.HTTP_200_OK)
def get_insulin_entries():
    """ Gets insulin entries """
    return insulin_entries

@app.post("/api/insulin", status_code=status.HTTP_201_CREATED)
def create_insulin_entry(entry: InsulinEntry):
    """ Creates an insulin entry """
    insulin_entries.append(entry.dict())
    return entry
