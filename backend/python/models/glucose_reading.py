""" Glucose Readings """
import datetime
from pydantic import BaseModel

class GlucoseReading(BaseModel):
    """ Defines glucose readings """
    timestamp: datetime.datetime
    value: float
