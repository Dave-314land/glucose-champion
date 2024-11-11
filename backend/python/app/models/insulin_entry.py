""" Insulin Entry """
import datetime
from pydantic import BaseModel

class InsulinEntry(BaseModel):
    """ Defines insulin entries """
    timestamp: datetime.datetime
    amount: float
