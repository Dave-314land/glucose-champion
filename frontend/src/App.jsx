import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import dayjs from 'dayjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css'
import GlucoseEntryForm from './components/forms/GlucoseEntryForm';

function App() {
  const [glucoseReadings, setGlucoseReadings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const glucoseResponse = await fetch('http://localhost:8000/api/glucose');
        if (!glucoseResponse.ok) {
          throw new Error(`Error fetching glucose data: ${glucoseResponse.status}`);
        }
        const glucoseData = await glucoseResponse.json();
        setGlucoseReadings(glucoseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => dayjs(timestamp).format('YYYY-MM-DD HH:mm')

  return (
    <div>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Glucose Readings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <LineChart width={600} height={400} data={glucoseReadings}>
              <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
        </CardContent>
      </Card>

      <div className="my-5">
      <Card className="text-left">
        <CardHeader>
          <CardTitle className="text-center">Glucose Entry</CardTitle>
          <CardDescription>Enter your Glucose reading below, along with the date and time of the reading.</CardDescription>
        </CardHeader>
        <CardContent>
        <GlucoseEntryForm />
        </CardContent>
      </Card>
      </div>      
    </div>
  );
};

export default App
