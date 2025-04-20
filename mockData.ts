import { 
  CropHealth, 
  PestAlert, 
  SoilCondition, 
  PesticideStatus, 
  DroneStatus,
  SensorReading,
  PesticidePerformance
} from '../types';

// Crop health data
export const cropHealthData: CropHealth = {
  index: 78,
  status: 'good'
};

// Pest alerts
export const pestAlerts: PestAlert[] = [
  {
    id: '1',
    severity: 'high',
    type: 'Aphids',
    location: 'North Field',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    severity: 'medium',
    type: 'Locusts',
    location: 'East Field',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  },
  {
    id: '3',
    severity: 'low',
    type: 'Thrips',
    location: 'South Field',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000) // 8 hours ago
  }
];

// Soil condition
export const soilCondition: SoilCondition = {
  moisture: 42,
  temperature: 24,
  ph: 6.8,
  nutrients: {
    nitrogen: 45,
    phosphorus: 35,
    potassium: 50
  }
};

// Pesticide status
export const pesticideStatus: PesticideStatus = {
  name: 'Eco-Guard Plus',
  effectiveness: 85,
  lastApplied: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  coverage: 92
};

// Drone status
export const droneStatus: DroneStatus = {
  batteryLevel: 78,
  signalStrength: 92,
  latitude: 23.8103,
  longitude: 90.4125,
  altitude: 45,
  speed: 5.2,
  isActive: true
};

// Sensor readings
export const sensorReadings: SensorReading[] = Array(24).fill(0).map((_, i) => ({
  temperature: 22 + Math.sin(i / 3) * 4,
  humidity: 60 + Math.sin(i / 4) * 10,
  soilMoisture: 40 + Math.sin(i / 2) * 8,
  gasLevel: 120 + Math.sin(i / 5) * 30,
  timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000)
}));

// Pesticide performance
export const pesticidePerformance: PesticidePerformance[] = [
  {
    id: '1',
    name: 'Eco-Guard Plus',
    effectiveness: [65, 78, 85, 82, 80, 75, 72],
    timePoints: ['Day 1', 'Day 3', 'Day 7', 'Day 10', 'Day 14', 'Day 21', 'Day 28'],
    recommendation: 'Effective for current conditions. Consider reapplication after 21 days.'
  },
  {
    id: '2',
    name: 'BioShield',
    effectiveness: [78, 85, 90, 88, 85, 80, 72],
    timePoints: ['Day 1', 'Day 3', 'Day 7', 'Day 10', 'Day 14', 'Day 21', 'Day 28'],
    recommendation: 'Highly effective but more costly. Best for severe infestations.'
  },
  {
    id: '3',
    name: 'NatureSafe',
    effectiveness: [60, 65, 70, 72, 70, 65, 60],
    timePoints: ['Day 1', 'Day 3', 'Day 7', 'Day 10', 'Day 14', 'Day 21', 'Day 28'],
    recommendation: 'Eco-friendly option with moderate effectiveness. Requires more frequent application.'
  }
];

// Crop types
export const cropTypes = [
  'Rice',
  'Wheat',
  'Corn',
  'Potatoes',
  'Tomatoes',
  'Soybeans',
  'Sunflower',
  'Cotton',
  'Sugarcane'
];

// Historical data for reports
export const generateHistoricalData = (days: number) => {
  return Array(days).fill(0).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      pestAlerts: Math.floor(Math.random() * 5),
      pesticidesApplied: Math.random() < 0.5 ? 1 : 0,
      cropHealthIndex: 60 + Math.floor(Math.random() * 30),
      soilMoisture: 30 + Math.floor(Math.random() * 40)
    };
  }).reverse();
};