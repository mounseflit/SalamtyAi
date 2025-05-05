import React from "react";
import { useState, useEffect } from 'react';
import EventCard from "./EventCard";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import SafetyCard from "./SafetyCard";
import GestureCard from "./GestureCard";
import SensorCard from "./SensorCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase";
import { useParams } from 'react-router-dom';
import { useUser } from "./UserContext";
import GIF from './output.gif';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';


export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [safetyData, setSafetyData] = useState([]);
  const [gestureData, setGestureData] = useState([]);
  const [fireData, setFireData] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const { loginType } = useParams();
  const { setUserId, setUserType } = useUser();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
        setUserId(uid);
        setUserType(loginType);

        const fetchEvents = async () => {
          try {
            // Replace with random data generation
            const randomData = {
              camera_data: [
                { image_link: '', location: 'Location A', video_link: 'video1.mp4' },
                { image_link: '', location: 'Location B', video_link: 'video2.mp4' },
              ],
              safety_gear_data: [
                { location: 'Location A', data: { 'no-1': 1, 'no-2': 0 }, timestamp: '2024-07-26T10:00:00Z' },
                { location: 'Location B', data: { 'no-1': 2, 'no-2': 1 }, timestamp: '2024-07-26T11:00:00Z' },
              ],
              hand_gesture_data: [
                { location: 'Location A', timestamp: '2024-07-26T12:00:00Z', video_link: 'gesture1.mp4' },
              ],
              fire_detection_data: [
                { location: 'Location B', timestamp: '2024-07-26T13:00:00Z', video_link: 'fire1.mp4' },
              ],
              sensor_data: [
                { location: 'Location A', status: true },
                { location: 'Location B', status: false },
              ],
            };

            const processedSafetyData = randomData.safety_gear_data.map((safetyItem) => {
              const text = Object.keys(safetyItem.data)
                .filter((key) => key.startsWith('no-'))
                .map((key) => `${safetyItem.data[key]} No ${key.replace('no-', '')}`)
                .join(', ');

              return {
                ...safetyItem,
                text,
              };
            });

            setEvents(randomData.camera_data);
            setSafetyData(processedSafetyData);
            setGestureData(randomData.hand_gesture_data);
            setFireData(randomData.fire_detection_data);
            setSensorData(randomData.sensor_data);
          } catch (error) {
            console.error("Error fetching events:", error);
          }
        };

        fetchEvents(); // Call the fetchEvents function here

      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  console.log("events", events);
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      margin: '0px',
      width: '100%',
    }}>
      <h1>Dashboard</h1>
      <h2 style={{
        marginTop: "5px",
        marginBottom: "5px",
        marginLeft: "10px",
      }}>Live Stream</h2>
      <div style={{
        display: "flex",
        flexDirection: "row",
        marginTop: "2px",
      }}>
        <Card sx={{ maxWidth: 250, backgroundColor: 'transparent', boxShadow: '0', margin: '5px' }}>
          <a href="" target="_blank" rel="noopener noreferrer">
            <div style={{ position: 'relative' }}>
              <img
                height="150"
                width="250"
                src={GIF} // Corrected image path handling
                style={{
                  objectFit: 'cover',
                  borderRadius: '20px',
                }}
                alt="Event Image"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <PlayCircleFilledWhiteIcon
                  style={{
                    fontSize: '3rem',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          </a>
          <CardContent style={{
            margin: '0',
            paddingTop: '0',
            paddingBottom: '0',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            textAlign: 'left',
          }}>
            <Typography variant="body2" style={{
              fontSize: '1rem',
            }}>
              Location A
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Grid container spacing={2} style={{
        paddingRight: '30px',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        textAlign: 'start',
      }}>
        <Grid item xs={12} sm={6}>

          <Card>
            <CardContent>
              <Typography variant="h5" sx={{
                fontWeight: 'bold',
              }}>
                Safety Gear
              </Typography>
              <div
                style={{
                  height: '300px',
                  overflowY: 'auto',
                }}
              >
                {safetyData.map((safetyItem, index) => (
                  <SafetyCard
                    key={index}
                    location={safetyItem.location}
                    text={safetyItem.text}
                    timestamp={safetyItem.timestamp}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>

          <Card>
            <CardContent>
              <Typography variant="h5" sx={{
                fontWeight: 'bold',
              }}>
                Hand Gesture
              </Typography>
              <div
                style={{
                  height: '300px',
                  overflowY: 'auto',
                }}
              >
                {gestureData.map((gestureItem, index) => (
                  <GestureCard
                    key={index}
                    location={gestureItem.location}
                    timestamp={gestureItem.timestamp}
                    video_link={gestureItem.video_link}
                    type="gesture"
                  />
                ))}
              </div>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{
        paddingRight: '30px',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        textAlign: 'start',
      }}>
        <Grid item xs={12} sm={6}>
          <div
            style={{
              height: '400px',
              overflowY: 'auto',
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{
                  fontWeight: 'bold',
                }}>
                  Fire Detection
                </Typography>
                <div
                  style={{
                    height: '300px',
                    overflowY: 'auto',
                  }}
                >
                  {fireData.map((fireItem, index) => (
                    <GestureCard
                      key={index}
                      location={fireItem.location}
                      timestamp={fireItem.timestamp}
                      video_link={fireItem.video_link}
                      type="fire"
                    />
                  ))}
                </div>

              </CardContent>
            </Card>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div
            style={{
              height: '400px',
              overflowY: 'auto',
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{
                  fontWeight: 'bold',
                }}>
                  Sensors
                </Typography>
                <div
                  style={{
                    height: '300px',
                    overflowY: 'auto',
                  }}
                >
                  {sensorData.map((sensorItem, index) => (
                    <SensorCard
                      key={index}
                      location={sensorItem.location}
                      status={sensorItem.status}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>

    </div>
  );
}