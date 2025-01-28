import type { WeatherData, AirQualityData, TrafficData } from '../types';

const WEATHER_API_KEY = 'YOUR_API_KEY'; // OpenWeatherMap API key
const CITY_ID = '2643743'; // London

export async function fetchWeatherData(): Promise<WeatherData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${WEATHER_API_KEY}&units=metric`
  );
  const data = await response.json();
  
  return {
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].main,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6) // Convert m/s to km/h
  };
}

export async function fetchAirQualityData(): Promise<AirQualityData> {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=51.5074&lon=-0.1278&appid=${WEATHER_API_KEY}`
  );
  const data = await response.json();
  
  return {
    aqi: data.list[0].main.aqi,
    pollutants: {
      pm25: data.list[0].components.pm2_5,
      pm10: data.list[0].components.pm10,
      no2: data.list[0].components.no2
    }
  };
}

export async function fetchTrafficData(): Promise<TrafficData> {
  // In a real application, this would connect to a traffic API
  // For demonstration, we'll simulate real-time data
  const congestionLevel = Math.floor(Math.random() * (100 - 20) + 20);
  
  return {
    congestionLevel,
    incidents: [
      {
        id: '1',
        type: 'accident',
        location: [51.505, -0.09],
        description: 'Minor collision on Main Street'
      }
    ]
  };
}