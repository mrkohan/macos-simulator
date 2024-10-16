import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchWeatherApi } from 'openmeteo';
import Clock from './Clock';

const WidgetPanelContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Widget = styled.div`
  width: 200px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  padding: 10px;
  color: black;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Widgets() {
  const [weatherData, setWeatherData] = useState(null);
  const [date, setDate] = useState('');

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      const params = {
        latitude: 41.0138,
        longitude: 28.9497,
        hourly: "temperature_2m",
        timezone: "Europe/Berlin",
      };
      const url = "https://api.open-meteo.com/v1/forecast";

      try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const hourly = response.hourly();

        // Prepare weather data
        const weatherData = {
          hourly: {
            time: Array.from(
              { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
              (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
          },
        };

        // Set the weather data in state
        setWeatherData(weatherData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();

    // Set today's date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setDate(formattedDate);
  }, []);

  return (
    <WidgetPanelContainer>
    
      {/* Calendar Widget */}
      <Widget>
        <div>Today's Date</div>
        <div>{date || 'Loading...'}</div>
      </Widget>

      {/* Weather Widget */}
      <Widget>
        <div>Weather: Istanbul</div>
        {weatherData ? (
          <div>
            <div>Temperature at {weatherData.hourly.time[0].toLocaleTimeString()}:</div>
            <div>{weatherData.hourly.temperature2m[0]}°C</div>
          </div>
        ) : (
          <div>Loading weather...</div>
        )}
      </Widget>

      <Widget>
        <Clock />
      </Widget>
    </WidgetPanelContainer>
  );
}

export default Widgets;
