import React, { useState, useEffect } from 'react';
import {
  Users, Truck, Calendar, ClipboardList, Bell, Settings,
  ChevronRight, Search, Filter, MapPin, PhoneCall, Clock
} from 'lucide-react';

// Employee Context
const EmployeeContext = React.createContext(null);

// Mock employee data
const MOCK_EMPLOYEE = {
  id: 'EMP001',
  name: 'John Smith',
  role: 'Route Manager',
  assignedArea: 'Downtown District',
  contactNumber: '555-0123'
};

// Employee Provider Component
const EmployeeProvider = ({ children }) => {
  const [employee] = useState(MOCK_EMPLOYEE);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo, assume always authenticated

  return (
    <EmployeeContext.Provider value={{ employee, isAuthenticated }}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Placeholder Employee Login Component
const EmployeeLogin = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6 text-center">Employee Login</h1>
    <p>This is a placeholder login. In a real app, add a login form and logic here.</p>
  </div>
);

// Placeholder Reports Section Component
const ReportsSection = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Reports</h2>
    <p>Reports coming soon...</p>
  </div>
);

// Placeholder Recent Activity List
const RecentActivityList = () => (
  <div className="space-y-3">
    {[1, 2, 3].map(i => (
      <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
        <div className="font-medium">Customer #{i} made a request</div>
        <span className="text-sm text-gray-600">A few minutes ago</span>
      </div>
    ))}
  </div>
);

// Placeholder Upcoming Pickups List
const UpcomingPickupsList = () => (
  <div className="space-y-3">
    {[1, 2, 3].map(i => (
      <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
        <div className="flex items-center space-x-3">
          <Clock className="text-gray-400" />
          <div>
            <div className="font-medium">Pickup #{i}</div>
            <div className="text-sm text-gray-600">123 Main St</div>
          </div>
        </div>
        <span className="text-sm text-gray-600">In 2 hours</span>
      </div>
    ))}
  </div>
);

// Main Employee Dashboard Component
const EmployeeDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const { employee, isAuthenticated } = React.useContext(EmployeeContext);

  if (!isAuthenticated) {
    return <EmployeeLogin />;
  }

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'routes':
        return <RoutesSection />;
      case 'schedule':
        return <ScheduleSection />;
      case 'customers':
        return <CustomerSection />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Employee Portal</h1>
            <span className="text-sm bg-blue-700 px-2 py-1 rounded">
              {employee.role}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5" />
            <Settings className="w-5 h-5" />
            <div className="flex items-center">
              <span className="mr-2">{employee.name}</span>
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                {employee.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white h-screen shadow-lg p-4">
          <SidebarButton
            icon={<Users />}
            label="Overview"
            active={activeSection === 'overview'}
            onClick={() => setActiveSection('overview')}
          />
          <SidebarButton
            icon={<Truck />}
            label="Routes"
            active={activeSection === 'routes'}
            onClick={() => setActiveSection('routes')}
          />
          <SidebarButton
            icon={<Calendar />}
            label="Schedule"
            active={activeSection === 'schedule'}
            onClick={() => setActiveSection('schedule')}
          />
          <SidebarButton
            icon={<ClipboardList />}
            label="Customers"
            active={activeSection === 'customers'}
            onClick={() => setActiveSection('customers')}
          />
          <SidebarButton
            icon={<Bell />}
            label="Reports"
            active={activeSection === 'reports'}
            onClick={() => setActiveSection('reports')}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Overview Section Component
const OverviewSection = () => {
  const { employee } = React.useContext(EmployeeContext);
  const [todayStats] = useState({
    pendingPickups: 12,
    completedPickups: 8,
    activeCustomers: 45,
    reportedIssues: 2
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Daily Overview</h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Pending Pickups"
          value={todayStats.pendingPickups}
          icon={<Truck className="text-blue-500" />}
        />
        <StatCard
          title="Completed Today"
          value={todayStats.completedPickups}
          icon={<Clock className="text-green-500" />}
        />
        <StatCard
          title="Active Customers"
          value={todayStats.activeCustomers}
          icon={<Users className="text-purple-500" />}
        />
        <StatCard
          title="Reported Issues"
          value={todayStats.reportedIssues}
          icon={<Bell className="text-red-500" />}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Upcoming Pickups</h3>
          <UpcomingPickupsList />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Recent Customer Activity</h3>
          <RecentActivityList />
        </div>
      </div>
    </div>
  );
};

// Routes Section Component
const RoutesSection = () => {
  const [routes] = useState([
    {
      id: 1,
      area: 'North District',
      stops: 8,
      estimatedTime: '2.5 hours',
      status: 'In Progress'
    },
    {
      id: 2,
      area: 'Downtown Core',
      stops: 12,
      estimatedTime: '3 hours',
      status: 'Pending'
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Route Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create New Route
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Search className="text-gray-400" />
            <input
              type="text"
              placeholder="Search routes..."
              className="flex-1 p-2 border rounded"
            />
            <Filter className="text-gray-400" />
          </div>
        </div>

        <div className="border-t">
          {routes.map(route => (
            <div key={route.id} className="p-4 border-b hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{route.area}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    {route.stops} stops • {route.estimatedTime}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      route.status === 'In Progress' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {route.status}
                  </span>
                  <button className="text-blue-500 hover:bg-blue-50 p-2 rounded">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Schedule Section Component
const ScheduleSection = () => {
  const [schedule] = useState([
    {
      id: 1,
      time: '9:00 AM',
      customer: 'Alice Johnson',
      address: '123 Main St',
      type: 'Regular Pickup'
    },
    {
      id: 2,
      time: '10:30 AM',
      customer: 'Bob Smith',
      address: '456 Oak Ave',
      type: 'Special Request'
    }
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Daily Schedule</h2>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Today</button>
            <button className="text-gray-600 px-4 py-2">Tomorrow</button>
            <button className="text-gray-600 px-4 py-2">Next Week</button>
          </div>
        </div>

        <div>
          {schedule.map(appointment => (
            <div key={appointment.id} className="p-4 border-b hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-semibold">
                    {appointment.time}
                  </div>
                  <div>
                    <div className="font-medium">{appointment.customer}</div>
                    <div className="text-sm text-gray-600">
                      {appointment.address}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {appointment.type}
                  </span>
                  <button className="text-blue-500 hover:bg-blue-50 p-2 rounded">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Customer Section Component
const CustomerSection = () => {
  const [customers] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      status: 'Active',
      pickupFrequency: 'Weekly',
      lastPickup: '2024-12-15'
    },
    {
      id: 2,
      name: 'Bob Smith',
      status: 'Pending',
      pickupFrequency: 'Bi-weekly',
      lastPickup: '2024-12-10'
    }
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Customer
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded">
            Export List
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <Search className="text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="flex-1 p-2 border rounded"
            />
            <Filter className="text-gray-400" />
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Pickup Frequency</th>
              <th className="px-4 py-2 text-left">Last Pickup</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    customer.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-4 py-3">{customer.pickupFrequency}</td>
                <td className="px-4 py-3">{customer.lastPickup}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-500 hover:bg-blue-50 p-2 rounded">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Utility Components
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-gray-600">{title}</h3>
      {icon}
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const SidebarButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 p-3 rounded mb-2 ${
      active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

// The main EmployeeOnlyPage component that you can integrate into your app
const EmployeeOnlyPage = () => (
  <EmployeeProvider>
    <EmployeeDashboard />
  </EmployeeProvider>
);

export default EmployeeOnlyPage;
