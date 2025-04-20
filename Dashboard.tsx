import React from 'react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import { Plane as Plant, Bug, Droplet, Zap, Satellite, ChevronRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cropHealthData, pestAlerts, soilCondition, pesticideStatus } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Format the last login time
  const lastLogin = user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A';

  // Get status color for crop health
  const getCropHealthColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-green-400';
      case 'moderate': return 'text-yellow-500';
      case 'poor': return 'text-orange-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  // Get a simple weather forecast (simulated)
  const weatherForecast = {
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg")',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="container mx-auto py-6">
        <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-lg p-4">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name}</h1>
          <p className="text-gray-600">Last login: {lastLogin}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Crop Health Card */}
          <Card 
            title="Crop Health Index" 
            icon={<Plant />}
            hover
            className="bg-gradient-to-br from-green-50 to-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg")'
                }}
            />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold mb-2">{cropHealthData.index}%</p>
                <p className={`capitalize font-medium ${getCropHealthColor(cropHealthData.status)}`}>
                  {cropHealthData.status}
                </p>
              </div>
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Plant size={32} className="text-green-500" />
              </div>
            </div>
          </Card>

          {/* Pest Alerts Card */}
          <Card 
            title="Pest Infestation Alerts" 
            icon={<Bug />}
            hover
            className="relative overflow-hidden"
            footer={
              <Link to="/monitoring" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                View all alerts <ChevronRight size={16} />
              </Link>
            }
          >
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/6249/hands-agriculture-plant-grow.jpg")'
                }}
            />
            <div className="relative z-10">
              {pestAlerts.length > 0 ? (
                <div className="space-y-3">
                  {pestAlerts.slice(0, 2).map((alert) => (
                    <div key={alert.id} className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${
                        alert.severity === 'high' ? 'bg-red-500' : 
                        alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{alert.type}</p>
                        <p className="text-xs text-gray-500">{alert.location} • {new Date(alert.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">No active pest alerts</p>
              )}
            </div>
          </Card>

          {/* Soil Condition Card */}
          <Card 
            title="Soil Condition" 
            icon={<Droplet />}
            hover
            className="relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/4149529/pexels-photo-4149529.jpeg")'
                }}
            />
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Moisture</p>
                <p className="text-lg font-semibold">{soilCondition.moisture}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Temperature</p>
                <p className="text-lg font-semibold">{soilCondition.temperature}°C</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">pH Level</p>
                <p className="text-lg font-semibold">{soilCondition.ph}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nitrogen</p>
                <p className="text-lg font-semibold">{soilCondition.nutrients.nitrogen}%</p>
              </div>
            </div>
          </Card>

          {/* Pesticide Effectiveness */}
          <Card 
            title="Pesticide Effectiveness" 
            icon={<Zap />}
            hover
            className="bg-gradient-to-br from-blue-50 to-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg")'
                }}
            />
            <div className="relative z-10">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Current Effectiveness</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${pesticideStatus.effectiveness}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm mt-1">{pesticideStatus.effectiveness}%</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p className="text-gray-500">Last Applied</p>
                  <p className="font-medium">{new Date(pesticideStatus.lastApplied).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Coverage</p>
                  <p className="font-medium">{pesticideStatus.coverage}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Type</p>
                  <p className="font-medium">{pesticideStatus.name}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Satellite Signal Status */}
          <Card 
            title="Satellite Signal" 
            icon={<Satellite />}
            hover
            className="relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg")'
                }}
            />
            <div className="relative z-10">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <Satellite size={24} className="text-green-500" />
                </div>
                <div>
                  <p className="text-lg font-medium text-green-500">Connected</p>
                  <p className="text-sm text-gray-600">Signal strength: Excellent</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Last data update:</p>
                <p className="text-sm">{new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </Card>

          {/* Weather Forecast */}
          <Card 
            title="Weather Forecast" 
            icon={<Cloud />}
            hover
            className="relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg")'
                }}
            />
            <div className="relative z-10">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Sun size={32} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{weatherForecast.temperature}°C</p>
                  <p className="text-gray-600">{weatherForecast.condition}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Humidity</p>
                  <p className="text-lg font-medium">{weatherForecast.humidity}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Wind</p>
                  <p className="text-lg font-medium">{weatherForecast.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Alerts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center bg-white/80 backdrop-blur-sm rounded-lg p-4">
            <AlertTriangle size={20} className="mr-2 text-amber-500" />
            Recent Alerts
          </h2>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-medium">System Notifications</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Droplet size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Irrigation system automated start</p>
                    <p className="text-sm text-gray-500">The irrigation system was automatically activated due to low soil moisture levels.</p>
                    <p className="text-xs text-gray-400 mt-1">Today, 9:32 AM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <AlertTriangle size={16} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Potential pest issue detected</p>
                    <p className="text-sm text-gray-500">AI analysis indicates early signs of aphid infestation in the eastern quadrant.</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday, 4:15 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Check size={16} className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Drone maintenance completed</p>
                    <p className="text-sm text-gray-500">Scheduled maintenance for monitoring drone #3 has been completed successfully.</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday, 10:22 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import at the top of the file
import { Sun, Cloud, Check } from 'lucide-react';

export default Dashboard;