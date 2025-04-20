export type UserRole = 'farmer' | 'admin' | 'researcher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastLogin: Date;
}

export interface CropHealth {
  index: number;
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical';
}

export interface PestAlert {
  id: string;
  severity: 'low' | 'medium' | 'high';
  type: string;
  location: string;
  timestamp: Date;
}

export interface SoilCondition {
  moisture: number;
  temperature: number;
  ph: number;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
}

export interface PesticideStatus {
  name: string;
  effectiveness: number;
  lastApplied: Date;
  coverage: number;
}

export interface DroneStatus {
  batteryLevel: number;
  signalStrength: number;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  isActive: boolean;
}

export interface SensorReading {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  gasLevel: number;
  timestamp: Date;
}

export interface PesticidePerformance {
  id: string;
  name: string;
  effectiveness: number[];
  timePoints: string[];
  recommendation: string;
}

export interface FlightPath {
  points: Array<{lat: number; lng: number}>;
  altitude: number;
  speed: number;
}

export interface ReportFilter {
  dateFrom: Date;
  dateTo: Date;
  cropType: string;
  location: string;
}

export interface AppSettings {
  language: 'english' | 'bengali' | 'hindi';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  darkMode: boolean;
}