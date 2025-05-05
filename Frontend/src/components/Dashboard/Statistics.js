import React, { useEffect, useState } from 'react';
import LineChart from './Statistics/LineChart';
import BarChart from './Statistics/BarChart';
import SingleBarChart from './Statistics/SingleBarChart';
import { useUser } from "./UserContext";
import { Grid, Card } from '@mui/material';

const AccidentCharts = () => {
  const { userId, userType } = useUser();
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomData = {
          'safety_gear_data': [
            { location: 'Location A', safety_score: Math.floor(Math.random() * 100) },
            { location: 'Location B', safety_score: Math.floor(Math.random() * 100) },
            { location: 'Location C', safety_score: Math.floor(Math.random() * 100) },
          ],
          'safety_avg_data': Math.floor(Math.random() * 100),
          'sensor_fire_data': {
            1: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            2: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            3: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            4: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            5: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            6: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            7: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            8: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            9: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            10: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            11: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
            12: { sensor_accidents: Math.floor(Math.random() * 20), fire_accidents: Math.floor(Math.random() * 20) },
          }
        };
        setApiData(randomData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, [userId, userType]);

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
    }}>
      <h1>Accident Statistics</h1>
      <Grid container spacing={5}>
        <Grid item xs={5}>
          <h2>Safety Scores of each Location</h2>
          {apiData && <SingleBarChart safetyData={apiData['safety_gear_data']} />}
        </Grid>
        <Grid item xs={6} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Card style={{
            padding: '20px',
            margin: '20px',
            backgroundColor: '#EAEFFF',
          }}>
            <h2>Safety Score</h2>
            <p>Indicates the score according to the compliances followed by company.</p>
            <h1>{apiData && apiData['safety_avg_data']}</h1>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{
        marginTop: '40px',
      }}>
        <Grid item xs={6}>
          <h2>Total Accidents Per Month</h2>
          {apiData && <LineChart data={apiData['sensor_fire_data']} />}
        </Grid>
        <Grid item xs={6}>
          <h2>Sensor vs. Fire Accidents Per Month</h2>
          {apiData && <BarChart data={apiData['sensor_fire_data']} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default AccidentCharts;
