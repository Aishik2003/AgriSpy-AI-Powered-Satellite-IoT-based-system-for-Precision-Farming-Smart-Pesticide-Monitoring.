import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import Input from '../components/ui/Input';
import { 
  BarChart as BarChartIcon, 
  DownloadCloud, 
  FileText,
  Calendar,
  Share2,
  Filter
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cropTypes, generateHistoricalData } from '../data/mockData';

const Reports: React.FC = () => {
  const [dateFrom, setDateFrom] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  
  const [dateTo, setDateTo] = useState(() => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  });
  
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  
  // Generate mock data for charts
  const historicalData = generateHistoricalData(30);
  
  // Pie chart data
  const pieData = [
    { name: 'Excellent', value: 45 },
    { name: 'Good', value: 30 },
    { name: 'Moderate', value: 15 },
    { name: 'Poor', value: 10 }
  ];
  
  const COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF5722'];
  
  // Get crop options for filter
  const cropOptions = [
    { value: 'All', label: 'All Crops' },
    ...cropTypes.map(crop => ({ value: crop, label: crop }))
  ];
  
  // Location options
  const locationOptions = [
    { value: 'All', label: 'All Locations' },
    { value: 'North', label: 'North Field' },
    { value: 'South', label: 'South Field' },
    { value: 'East', label: 'East Field' },
    { value: 'West', label: 'West Field' }
  ];
  
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-600">Data analysis and downloadable reports</p>
      </div>
      
      <Card className="mb-8">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <Input
              id="dateFrom"
              label="Date From"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              icon={<Calendar size={16} />}
            />
          </div>
          <div>
            <Input
              id="dateTo"
              label="Date To"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              icon={<Calendar size={16} />}
            />
          </div>
          <div>
            <Select
              id="crop"
              label="Crop Type"
              options={cropOptions}
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
            />
          </div>
          <div>
            <Select
              id="location"
              label="Location"
              options={locationOptions}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>
          <div className="flex-shrink-0">
            <Button 
              variant="primary"
              icon={<Filter size={16} />}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card title="Crop Health Trends" icon={<BarChartIcon />}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cropHealthIndex" 
                  stroke="#4CAF50" 
                  activeDot={{ r: 8 }} 
                  name="Crop Health Index"
                />
                <Line 
                  type="monotone" 
                  dataKey="soilMoisture" 
                  stroke="#2196F3" 
                  name="Soil Moisture %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card title="Pest Alert Distribution" icon={<BarChartIcon />}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="pestAlerts" 
                  fill="#FF5722" 
                  name="Pest Alerts"
                />
                <Bar 
                  dataKey="pesticidesApplied" 
                  fill="#8BC34A" 
                  name="Pesticides Applied"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card title="Summary Statistics" icon={<FileText />}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Average Crop Health
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      78%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                      +3.5%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Good
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Pesticide Effectiveness
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      85%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                      +5.2%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Excellent
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Pest Infestation
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      12%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                      +2.1%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Monitor
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Soil Quality
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      76%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                      -1.8%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Monitor
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Water Usage
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      1243 L
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                      -8.5%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Optimal
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        <Card title="Crop Health Distribution" icon={<BarChartIcon />}>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-end mb-8">
        <Button
          variant="outline"
          icon={<DownloadCloud size={18} />}
        >
          Export as CSV
        </Button>
        <Button
          variant="outline"
          icon={<DownloadCloud size={18} />}
        >
          Export as PDF
        </Button>
        <Button
          variant="outline"
          icon={<Share2 size={18} />}
        >
          Share Report
        </Button>
      </div>
      
      <Card title="Report Generation Options" icon={<FileText />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-2">Weekly Summary</h3>
            <p className="text-sm text-gray-600 mb-4">
              Overview of key metrics from the past week with trend analysis.
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Generate
            </Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-2">Monthly Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">
              Comprehensive monthly report with detailed statistics and recommendations.
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Generate
            </Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium mb-2">Custom Report</h3>
            <p className="text-sm text-gray-600 mb-4">
              Create a tailored report with specific metrics and date ranges.
            </p>
            <Button variant="primary" size="sm" fullWidth>
              Create Custom
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reports;