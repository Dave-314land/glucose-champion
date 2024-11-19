import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import dayjs from 'dayjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css'

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
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Glucose Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Glucose Readings</h2>
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
  );
};

export default App
