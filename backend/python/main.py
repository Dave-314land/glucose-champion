""" main """
from fastapi import FastAPI
from models.glucose_reading import GlucoseReading
from models.insulin_entry import InsulinEntry


app = FastAPI()

@app.get("/")
def welcome():
    """ Defines the home page """
    return { "Hello and welcome to Glucose Champion!" }

# Sample data store (replace with actual database integration later)
glucose_readings = []
insulin_entries = []

@app.get("/api/glucose")
def get_glucose_readings():
    """ Gets glucose readings """
    return glucose_readings

@app.post("/api/glucose")
def create_glucose_reading(reading: GlucoseReading):
    """ Creates a glucose reading """
    glucose_readings.append(reading.dict())
    return reading

@app.get("/api/insulin")
def get_insulin_entries():
    """ Gets insulin entries """
    return insulin_entries

@app.post("/api/insulin")
def create_insulin_entry(entry: InsulinEntry):
    """ Creates an insulin entry """
    insulin_entries.append(entry.dict())
    return entry
