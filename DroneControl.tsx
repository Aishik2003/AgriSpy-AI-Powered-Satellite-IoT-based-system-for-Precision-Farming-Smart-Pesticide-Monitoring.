import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Cpu, 
  Power, 
  Camera, 
  Upload, 
  AlertTriangle, 
  Zap,
  Droplets,
  Clipboard,
  RotateCcw
} from 'lucide-react';
import { droneStatus } from '../data/mockData';

const DroneControl: React.FC = () => {
  const [spraying, setSpraying] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const [sensorsActive, setSensorsActive] = useState(true);
  const [uploadedPath, setUploadedPath] = useState<File | null>(null);
  const [batterySimulation, setBatterySimulation] = useState(droneStatus.batteryLevel);

  // Simulate battery drain when spraying
  React.useEffect(() => {
    if (spraying) {
      const interval = setInterval(() => {
        setBatterySimulation((prev) => {
          if (prev <= 1) {
            setSpraying(false);
            return 0;
          }
          return prev - 0.5;
        });
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [spraying]);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedPath(files[0]);
    }
  };

  // Reset controls
  const handleReset = () => {
    setSpraying(false);
    setCameraActive(true);
    setSensorsActive(true);
    setUploadedPath(null);
  };

  // Get battery level color based on percentage
  const getBatteryLevelColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Drone Control Panel</h1>
        <p className="text-gray-600">Manual override and drone operation controls</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card title="Manual Override Controls" icon={<Cpu />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <Button
                  variant={spraying ? 'danger' : 'primary'}
                  size="lg"
                  fullWidth
                  icon={<Droplets size={20} />}
                  onClick={() => setSpraying(!spraying)}
                  className="mb-3"
                >
                  {spraying ? 'Stop Spraying' : 'Start Spraying'}
                </Button>
                <p className="text-sm text-gray-500">
                  {spraying ? 'Pesticide spray active' : 'Pesticide spray inactive'}
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <Button
                  variant={cameraActive ? 'success' : 'secondary'}
                  size="lg"
                  fullWidth
                  icon={<Camera size={20} />}
                  onClick={() => setCameraActive(!cameraActive)}
                  className="mb-3"
                >
                  {cameraActive ? 'Camera On' : 'Camera Off'}
                </Button>
                <p className="text-sm text-gray-500">
                  {cameraActive ? 'Live feed active' : 'Live feed inactive'}
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <Button
                  variant={sensorsActive ? 'success' : 'secondary'}
                  size="lg"
                  fullWidth
                  icon={<Zap size={20} />}
                  onClick={() => setSensorsActive(!sensorsActive)}
                  className="mb-3"
                >
                  {sensorsActive ? 'Sensors On' : 'Sensors Off'}
                </Button>
                <p className="text-sm text-gray-500">
                  {sensorsActive ? 'Data collection active' : 'Data collection inactive'}
                </p>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6 my-6">
              <h3 className="text-lg font-medium mb-4">Path Planning Upload</h3>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload flight path (.json, .csv)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept=".json,.csv"
                      onChange={handleFileUpload}
                      className="sr-only"
                      id="path-upload"
                    />
                    <label
                      htmlFor="path-upload"
                      className="cursor-pointer flex-grow bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm flex items-center justify-center hover:bg-gray-50"
                    >
                      <Upload size={16} className="mr-2" />
                      {uploadedPath ? uploadedPath.name : 'Choose file'}
                    </label>
                  </div>
                  {uploadedPath && (
                    <p className="text-xs text-gray-500 mt-1">
                      File size: {(uploadedPath.size / 1024).toFixed(2)} KB
                    </p>
                  )}
                </div>
                <Button 
                  variant="primary" 
                  disabled={!uploadedPath}
                >
                  Upload & Apply
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between">
              <Button
                variant="danger"
                size="lg"
                icon={<Power size={20} />}
                className="font-bold"
              >
                EMERGENCY STOP
              </Button>
              
              <Button
                variant="outline"
                icon={<RotateCcw size={16} />}
                onClick={handleReset}
              >
                Reset Controls
              </Button>
            </div>
          </Card>
        </div>
        
        <div>
          <Card 
            title="Drone Status" 
            icon={<Cpu />} 
            className="mb-6"
          >
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Battery Level</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    batterySimulation > 50 ? 'bg-green-500' : 
                    batterySimulation > 20 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${batterySimulation}%` }}
                ></div>
              </div>
              <p className={`text-right text-sm mt-1 ${getBatteryLevelColor(batterySimulation)}`}>
                {batterySimulation.toFixed(1)}%
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Location:</span>
                <span className="text-sm font-medium">
                  {droneStatus.latitude.toFixed(4)}, {droneStatus.longitude.toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Altitude:</span>
                <span className="text-sm font-medium">{droneStatus.altitude} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Speed:</span>
                <span className="text-sm font-medium">{droneStatus.speed} m/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Signal:</span>
                <span className="text-sm font-medium text-green-500">
                  {droneStatus.signalStrength}% (Strong)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="text-sm font-medium text-green-500">
                  {droneStatus.isActive ? 'Active' : 'Standby'}
                </span>
              </div>
            </div>
          </Card>
          
          <Card title="Safety Guidelines" icon={<AlertTriangle />}>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <AlertTriangle size={16} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Always maintain visual line of sight with the drone</p>
              </li>
              <li className="flex items-start">
                <AlertTriangle size={16} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Avoid flying in high winds or rain</p>
              </li>
              <li className="flex items-start">
                <AlertTriangle size={16} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Keep away from people and animals</p>
              </li>
              <li className="flex items-start">
                <AlertTriangle size={16} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <p>Use Emergency Stop only in critical situations</p>
              </li>
            </ul>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                icon={<Clipboard size={14} />}
              >
                Download safety manual
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <div className="mr-3 mt-1">
            <AlertTriangle size={20} className="text-amber-500" />
          </div>
          <div>
            <h3 className="font-medium text-amber-800 mb-1">Important Safety Notice</h3>
            <p className="text-sm text-amber-700">
              Manual override should only be used by trained operators. Improper use of drone controls may result in crop damage or equipment failure. Always follow local regulations regarding drone usage and pesticide application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneControl;