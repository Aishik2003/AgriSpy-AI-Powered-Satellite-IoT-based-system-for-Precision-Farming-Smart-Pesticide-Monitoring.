import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { 
  User, 
  Bell, 
  Languages, 
  Moon, 
  Shield, 
  Save
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [language, setLanguage] = useState<'english' | 'bengali' | 'hindi'>('english');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });
  
  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  const handleSaveProfile = () => {
    // Would normally update the user profile here
    console.log('Profile saved');
  };
  
  const handleSavePreferences = () => {
    // Would normally update the user preferences here
    console.log('Preferences saved');
  };
  
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card 
            title="Profile Information" 
            icon={<User />}
            className="mb-6"
          >
            <div className="space-y-4">
              <Input
                id="fullName"
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                icon={<User size={18} />}
              />
              
              <Input
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
              
              <Select
                id="role"
                label="Role"
                value={user?.role || 'farmer'}
                options={[
                  { value: 'farmer', label: 'Farmer' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'researcher', label: 'Researcher' }
                ]}
                disabled
              />
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                variant="primary"
                onClick={handleSaveProfile}
                icon={<Save size={18} />}
              >
                Save Changes
              </Button>
            </div>
          </Card>
          
          <Card 
            title="Security" 
            icon={<Shield />}
          >
            <div className="space-y-4">
              <Input
                id="currentPassword"
                label="Current Password"
                type="password"
                placeholder="Enter your current password"
              />
              
              <Input
                id="newPassword"
                label="New Password"
                type="password"
                placeholder="Enter a new password"
              />
              
              <Input
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                placeholder="Confirm your new password"
              />
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="primary">Update Password</Button>
            </div>
          </Card>
        </div>
        
        <div>
          <Card 
            title="Preferences" 
            icon={<Bell />}
            className="mb-6"
          >
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Notification Settings
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="emailNotifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                    Email Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="pushNotifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-700">
                    Push Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="smsNotifications"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                  />
                  <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-700">
                    SMS Notifications
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Language
              </h3>
              <Select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'english' | 'bengali' | 'hindi')}
                options={[
                  { value: 'english', label: 'English' },
                  { value: 'bengali', label: 'Bengali' },
                  { value: 'hindi', label: 'Hindi' }
                ]}
                icon={<Languages size={18} />}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Theme
              </h3>
              <div className="flex items-center">
                <input
                  id="darkMode"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <label htmlFor="darkMode" className="ml-2 flex items-center text-sm text-gray-700">
                  <Moon size={16} className="mr-1" />
                  Dark Mode
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                variant="primary" 
                fullWidth
                onClick={handleSavePreferences}
              >
                Save Preferences
              </Button>
            </div>
          </Card>
          
          <Card title="System Information">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">App Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Update</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Server Status</span>
                <span className="font-medium text-green-500">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data Storage</span>
                <span className="font-medium">1.2 GB / 5 GB</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
              >
                Check for Updates
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;