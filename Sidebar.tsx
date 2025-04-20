import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Video, 
  Droplets, 
  Cpu, 
  BarChart3, 
  Settings,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // If we're on the login page, don't show the sidebar
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Live Monitoring', path: '/monitoring', icon: <Video size={20} /> },
    { name: 'Pesticide Recommendations', path: '/pesticides', icon: <Droplets size={20} /> },
    { name: 'Drone Control', path: '/drone', icon: <Cpu size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  // Only admins and researchers can see the reports page
  const filteredNavItems = navItems.filter(item => {
    if (item.path === '/reports' && user?.role === 'farmer') {
      return false;
    }
    return true;
  });

  return (
    <div className="hidden md:block h-screen bg-white border-r border-gray-200 w-64 fixed left-0 top-0 pt-16">
      <div className="p-4">
        <div className="flex items-center px-3 py-2 mb-4">
          <Shield className="text-green-600 mr-2" size={22} />
          <h2 className="text-xl font-bold text-green-600">AgriSpy</h2>
        </div>
        
        <nav className="space-y-1">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs font-medium text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;