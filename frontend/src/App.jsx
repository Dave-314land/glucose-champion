import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import dayjs from 'dayjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css'

function App() {
  const [glucoseReadings, setGlucoseReadings] = useState([]);
  const [insulinEntries, setInsulinEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const glucoseResponse = await fetch('/api/glucose');
      setGlucoseReadings(await glucoseResponse.json());

      const insulinEntries = await fetch('/api/insulin');
      setInsulinEntries(await insulinEntries.json());
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

        <div>
          <h2 className="text-xl font-medium mb-4">Insulin Entries</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border text-left">Timestamp</th>
                <th className="p-2 border text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {insulinEntries.map((entry, index) => {
                <tr key={index}>
                  <td className="p-2 border">{formatTimestamp(entry.timestamp)}</td>
                  <td className="p-2 border text-right">{entry.amount} units</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default App
