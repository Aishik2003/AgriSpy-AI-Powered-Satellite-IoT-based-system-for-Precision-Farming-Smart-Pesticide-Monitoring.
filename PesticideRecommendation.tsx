import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Droplets, Lightbulb, Plane as Plant, ChevronRight, ThumbsUp, Clipboard } from 'lucide-react';
import { cropTypes, pesticidePerformance } from '../data/mockData';

const PesticideRecommendation: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [selectedPesticide, setSelectedPesticide] = useState(pesticidePerformance[0].id);

  // Get the selected pesticide data
  const selectedPesticideData = pesticidePerformance.find(p => p.id === selectedPesticide);

  // Create chart data
  const chartData = selectedPesticideData?.timePoints.map((time, index) => ({
    time,
    effectiveness: selectedPesticideData.effectiveness[index]
  }));

  // Convert crop types for the select component
  const cropOptions = cropTypes.map(crop => ({ value: crop, label: crop }));

  // Convert pesticide types for the select component
  const pesticideOptions = pesticidePerformance.map(p => ({ value: p.id, label: p.name }));

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Pesticide Recommendations</h1>
        <p className="text-gray-600">AI-powered pesticide performance analysis and recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card 
            title="Pesticide Performance" 
            icon={<LineChart width={20} height={20} />}
          >
            <div className="mb-4 flex flex-wrap gap-3">
              <Select
                id="crop"
                label="Crop Type"
                options={cropOptions}
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="max-w-xs"
              />
              <Select
                id="pesticide"
                label="Pesticide Type"
                options={pesticideOptions}
                value={selectedPesticide}
                onChange={(e) => setSelectedPesticide(e.target.value)}
                className="max-w-xs"
              />
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="effectiveness" 
                    stroke="#2196F3" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                    name="Effectiveness (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div>
          <Card 
            title="AI Recommendation" 
            icon={<Lightbulb />}
            className="mb-6 bg-gradient-to-br from-blue-50 to-white"
          >
            <div className="mb-4">
              <p className="text-sm text-gray-500">For {selectedCrop}</p>
              <h3 className="text-lg font-medium">{selectedPesticideData?.name}</h3>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">
              {selectedPesticideData?.recommendation}
            </p>
            
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-center text-sm">
                <ThumbsUp size={16} className="text-green-500 mr-2" />
                <span className="font-medium">AI Confidence: 87%</span>
              </div>
            </div>
          </Card>
          
          <Card title="Application Guidelines" icon={<Droplets />}>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-blue-500 text-xs font-bold">1</span>
                </div>
                <p>Apply during early morning or late evening for best results</p>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-blue-500 text-xs font-bold">2</span>
                </div>
                <p>Ensure even coverage across affected areas</p>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-blue-500 text-xs font-bold">3</span>
                </div>
                <p>Do not apply if rain is expected within 24 hours</p>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-blue-500 text-xs font-bold">4</span>
                </div>
                <p>Use protective equipment during application</p>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-blue-500 text-xs font-bold">5</span>
                </div>
                <p>Monitor effectiveness after 7 days</p>
              </li>
            </ul>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button 
                variant="outline" 
                size="sm" 
                icon={<Clipboard size={14} />}
                fullWidth
              >
                Download detailed guide
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Alternative Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pesticidePerformance.filter(p => p.id !== selectedPesticide).map(pesticide => (
          <Card 
            key={pesticide.id} 
            hover
            title={pesticide.name}
            icon={<Droplets size={18} />}
          >
            <p className="text-sm text-gray-700 mb-4">
              {pesticide.recommendation}
            </p>
            
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Effectiveness</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${pesticide.effectiveness[2]}%` }}
                ></div>
              </div>
              <p className="text-right text-xs mt-1">{pesticide.effectiveness[2]}%</p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              fullWidth
              onClick={() => setSelectedPesticide(pesticide.id)}
            >
              View details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PesticideRecommendation;