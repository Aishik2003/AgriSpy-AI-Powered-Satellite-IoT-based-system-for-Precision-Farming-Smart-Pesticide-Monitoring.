import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  MapPin, 
  Video, 
  Thermometer, 
  Droplet, 
  Wind, 
  Battery, 
  RefreshCw 
} from 'lucide-react';
import { droneStatus, sensorReadings } from '../data/mockData';

const LiveMonitoring: React.FC = () => {
  const [currentReadings, setCurrentReadings] = useState(sensorReadings[sensorReadings.length - 1]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Simulate refreshing data
  const refreshData = () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const temperatureVariation = Math.random() * 2 - 1; // -1 to 1
      const humidityVariation = Math.random() * 5 - 2.5; // -2.5 to 2.5
      const soilMoistureVariation = Math.random() * 3 - 1.5; // -1.5 to 1.5
      const gasLevelVariation = Math.random() * 10 - 5; // -5 to 5
      
      setCurrentReadings({
        temperature: Math.round((currentReadings.temperature + temperatureVariation) * 10) / 10,
        humidity: Math.round((currentReadings.humidity + humidityVariation) * 10) / 10,
        soilMoisture: Math.round((currentReadings.soilMoisture + soilMoistureVariation) * 10) / 10,
        gasLevel: Math.round((currentReadings.gasLevel + gasLevelVariation) * 10) / 10,
        timestamp: new Date()
      });
      
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      refreshData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [currentReadings]);

  // Format battery level indicator
  const getBatteryLevelColor = (level: number) => {
    if (level > 70) return 'text-green-500';
    if (level > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg")',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto py-6">
        <div className="flex flex-wrap items-center justify-between mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Live Monitoring</h1>
            <p className="text-gray-600">Real-time data from field sensors and drones</p>
          </div>
          <Button 
            variant="outline" 
            onClick={refreshData}
            disabled={isRefreshing}
            icon={<RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card title="Drone Location Map" icon={<MapPin />}>
              <div 
                className="h-[400px] bg-cover bg-center rounded-lg flex items-center justify-center relative"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg")',
                  backgroundSize: 'cover'
                }}
              >
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                <div className="relative z-10 text-center p-6 bg-white/90 backdrop-blur-sm rounded-lg">
                  <MapPin size={32} className="mx-auto mb-2 text-blue-500" />
                  <p className="font-medium">Interactive map will be displayed here</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Current coordinates: {droneStatus.latitude}, {droneStatus.longitude}
                  </p>
                  <p className="text-xs text-gray-400">
                    For a production environment, we would integrate with Leaflet or Google Maps API
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card title="Drone Status" icon={<Video />} className="mb-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Battery size={18} className={getBatteryLevelColor(droneStatus.batteryLevel)} />
                    <span className="ml-2 text-sm font-medium">Battery Level</span>
                  </div>
                  <span className={`font-medium ${getBatteryLevelColor(droneStatus.batteryLevel)}`}>
                    {droneStatus.batteryLevel}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Video size={18} className="text-blue-500" />
                    <span className="ml-2 text-sm font-medium">Camera Status</span>
                  </div>
                  <span className="font-medium text-green-500">Active</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Wind size={18} className="text-gray-500" />
                    <span className="ml-2 text-sm font-medium">Speed</span>
                  </div>
                  <span className="font-medium">{droneStatus.speed} m/s</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <MapPin size={18} className="text-red-500" />
                    <span className="ml-2 text-sm font-medium">Altitude</span>
                  </div>
                  <span className="font-medium">{droneStatus.altitude} m</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Signal Strength</span>
                  <span className="font-medium text-green-500">{droneStatus.signalStrength}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${droneStatus.signalStrength}%` }}
                  ></div>
                </div>
              </div>
            </Card>
            
            <Card title="Live Camera Feed" icon={<Video />}>
              <div 
                className="h-[200px] bg-cover bg-center rounded-lg flex items-center justify-center relative"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg")',
                  backgroundSize: 'cover'
                }}
              >
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                <div className="relative z-10 text-center bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <Video size={32} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Live feed preview</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 bg-white/80 backdrop-blur-sm rounded-lg p-4">Sensor Readings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card hover className="bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg")'
                }}
            />
            <div className="relative z-10 flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Thermometer size={24} className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Temperature</p>
                <p className="text-2xl font-bold">{currentReadings.temperature}°C</p>
              </div>
            </div>
          </Card>

          <Card hover className="bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/4149529/pexels-photo-4149529.jpeg")'
                }}
            />
            <div className="relative z-10 flex items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <Droplet size={24} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="text-2xl font-bold">{currentReadings.humidity}%</p>
              </div>
            </div>
          </Card>

          <Card hover className="bg-gradient-to-br from-amber-50 to-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg")'
                }}
            />
            <div className="relative z-10 flex items-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                <Droplet size={24} className="text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Soil Moisture</p>
                <p className="text-2xl font-bold">{currentReadings.soilMoisture}%</p>
              </div>
            </div>
          </Card>

          <Card hover className="bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg")'
                }}
            />
            <div className="relative z-10 flex items-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <Wind size={24} className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Gas Level</p>
                <p className="text-2xl font-bold">{currentReadings.gasLevel} ppm</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-sm text-gray-500 text-right bg-white/80 backdrop-blur-sm rounded-lg p-4">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;