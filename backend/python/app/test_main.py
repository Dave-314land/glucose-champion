"""Testing file for main.py"""
from fastapi.testclient import TestClient
from .main import app

client = TestClient(app)

def test_read_main():
    """ Tests reading root page """
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == { "message": "Hello and welcome to Glucose Champion!" }

def test_get_glucose_readings():
    """ Tests getting the glucose readings from the correct route """
    response = client.get("/api/glucose")
    assert response.status_code == 200

def test_get_insulin_entries():
    """ Tests getting the insulin entries from the correct route """
    response = client.get("/api/insulin")
    assert response.status_code == 200
