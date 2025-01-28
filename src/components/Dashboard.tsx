import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Line } from 'react-chartjs-2';
import { useQuery } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { AlertTriangle, Calendar, MapPin, Loader2, ThumbsUp, ThumbsDown, BookmarkPlus } from 'lucide-react';
import type { WeatherData, AirQualityData, TrafficData, Event } from '../types';
import { fetchWeatherData, fetchAirQualityData, fetchTrafficData } from '../api';
import { MapControls } from './MapControls';
import { GamificationWidget } from './GamificationWidget';
import { useAppStore } from '../store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'City Festival',
    description: 'Annual cultural festival',
    date: '2024-03-15',
    location: {
      name: 'Central Park',
      coordinates: [51.505, -0.09]
    },
    category: 'culture',
    attendees: 1200
  }
];

function LoadingWidget() {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
    </div>
  );
}

function ErrorWidget({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-full text-red-500">
      <p>{message}</p>
    </div>
  );
}

export function Dashboard() {
  const { user, toggleEventBookmark, updateRSVP } = useAppStore();

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
    refetchInterval: 300000 // Refetch every 5 minutes
  });

  const { data: airQualityData, isLoading: aqLoading, error: aqError } = useQuery({
    queryKey: ['airQuality'],
    queryFn: fetchAirQualityData,
    refetchInterval: 300000
  });

  const { data: trafficData, isLoading: trafficLoading, error: trafficError } = useQuery({
    queryKey: ['traffic'],
    queryFn: fetchTrafficData,
    refetchInterval: 60000 // Refetch every minute
  });

  const trafficChartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Traffic Congestion',
        data: [30, 25, 65, 55, 70, 45],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Weather Widget */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Weather</h2>
        {weatherLoading ? (
          <LoadingWidget />
        ) : weatherError ? (
          <ErrorWidget message="Failed to load weather data" />
        ) : weatherData && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold dark:text-white">{weatherData.temperature}°C</p>
              <p className="text-gray-500 dark:text-gray-400">{weatherData.condition}</p>
            </div>
            <div className="text-right">
              <p className="dark:text-white">Humidity: {weatherData.humidity}%</p>
              <p className="dark:text-white">Wind: {weatherData.windSpeed} km/h</p>
            </div>
          </div>
        )}
      </div>

      {/* Air Quality Widget */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Air Quality</h2>
        {aqLoading ? (
          <LoadingWidget />
        ) : aqError ? (
          <ErrorWidget message="Failed to load air quality data" />
        ) : airQualityData && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold dark:text-white">AQI: {airQualityData.aqi}</p>
              <p className={airQualityData.aqi <= 50 ? "text-green-500" : "text-yellow-500"}>
                {airQualityData.aqi <= 50 ? "Good" : "Moderate"}
              </p>
            </div>
            <div className="text-right">
              <p className="dark:text-white">PM2.5: {airQualityData.pollutants.pm25}</p>
              <p className="dark:text-white">PM10: {airQualityData.pollutants.pm10}</p>
            </div>
          </div>
        )}
      </div>

      {/* Traffic Widget */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Traffic</h2>
        {trafficLoading ? (
          <LoadingWidget />
        ) : trafficError ? (
          <ErrorWidget message="Failed to load traffic data" />
        ) : (
          <Line data={trafficChartData} />
        )}
      </div>

      {/* Map Widget with Controls */}
      <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">City Map</h2>
        <div className="h-[400px] relative">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            className="h-full rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {trafficData?.incidents.map((incident) => (
              <Marker key={incident.id} position={incident.location}>
                <Popup>{incident.description}</Popup>
              </Marker>
            ))}
          </MapContainer>
          <MapControls />
        </div>
      </div>

      {/* Events Widget with RSVP */}
      <div className="col-span-full md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Upcoming Events</h2>
        <div className="space-y-4">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <Calendar className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold dark:text-white">{event.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.location.name}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleEventBookmark(event.id)}
                      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 ${
                        event.isBookmarked ? 'text-blue-500' : 'text-gray-400'
                      }`}
                    >
                      <BookmarkPlus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {user && (
                  <div className="mt-4 flex items-center space-x-2">
                    <button
                      onClick={() => updateRSVP(event.id, 'going')}
                      className={`flex items-center px-3 py-1 rounded-full text-sm ${
                        event.rsvpStatus === 'going'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                      }`}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Going
                    </button>
                    <button
                      onClick={() => updateRSVP(event.id, 'not-going')}
                      className={`flex items-center px-3 py-1 rounded-full text-sm ${
                        event.rsvpStatus === 'not-going'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                      }`}
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Not Going
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gamification Widget */}
      <GamificationWidget />

      {/* Emergency Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Emergency Alerts</h2>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            <p className="text-red-700 dark:text-red-400">Flash flood warning in downtown area</p>
          </div>
        </div>
      </div>
    </div>
  );
}