import React, { useState } from 'react';
import {
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  User,
  Phone,
  Mail,
  Loader2
} from 'lucide-react';
import { Card } from '@/components/ui/card';

// Mock Data
const initialMockPickups = {
  pending: [
    {
      id: 1,
      customer: "Sarah Johnson",
      address: "123 Main St, Suite 100",
      time: "10:00 AM",
      phone: "555-0123",
      email: "sarah@example.com",
      notes: "Please knock loudly - doorbell not working"
    },
    {
      id: 2,
      customer: "Mike Smith",
      address: "456 Oak Ave",
      time: "11:30 AM",
      phone: "555-0124",
      email: "mike@example.com",
      notes: "Large items in garage"
    },
    {
      id: 3,
      customer: "Lisa Brown",
      address: "789 Pine St",
      time: "2:00 PM",
      phone: "555-0125",
      email: "lisa@example.com",
      notes: "Access code: 4321"
    }
  ],
  completed: [
    {
      id: 4,
      customer: "Emma Davis",
      address: "321 Maple Rd",
      time: "9:00 AM",
      phone: "555-0126",
      email: "emma@example.com",
      notes: "Completed at 9:15 AM"
    },
    {
      id: 5,
      customer: "Tom Wilson",
      address: "654 Cedar Ln",
      time: "9:30 AM",
      phone: "555-0127",
      email: "tom@example.com",
      notes: "Completed at 9:45 AM"
    }
  ]
};

const initialMockStats = {
  completed: 2,
  pending: 3,
  totalTime: "2.5 hrs",
  efficiency: "94%"
};

const StatCard = ({ title, value, bgColor, textColor }) => (
  <div className={`${bgColor} p-4 rounded-lg`}>
    <div className={`${textColor} text-sm`}>{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const PickupCard = ({ pickup, status, onComplete, onReportIssue }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await onComplete(pickup.id);
    } catch (error) {
      console.error('Failed to complete pickup:', error);
    }
    setIsLoading(false);
  };

  return (
    <Card className="bg-white rounded-lg shadow mb-4 p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{pickup.customer}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin size={16} className="mr-1" />
            <span>{pickup.address}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
        }`}>
          {status === 'pending' ? 'Pending' : 'Completed'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center text-gray-600">
          <Clock size={16} className="mr-1" />
          <span>{pickup.time}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone size={16} className="mr-1" />
          <span>{pickup.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Mail size={16} className="mr-1" />
          <span>{pickup.email}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <User size={16} className="mr-1" />
          <span>Regular pickup</span>
        </div>
      </div>

      {pickup.notes && (
        <div className="mt-3 text-sm bg-gray-50 p-2 rounded">
          <span className="font-medium">Notes: </span>
          {pickup.notes}
        </div>
      )}

      {status === 'pending' && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className={`px-4 py-2 bg-green-500 text-white rounded-lg flex items-center ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
            }`}
            onClick={handleComplete}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 size={16} className="mr-1 animate-spin" />
            ) : (
              <CheckCircle size={16} className="mr-1" />
            )}
            {isLoading ? 'Processing...' : 'Mark Complete'}
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center hover:bg-red-600"
            onClick={() => onReportIssue(pickup.id)}
          >
            <AlertCircle size={16} className="mr-1" />
            Report Issue
          </button>
        </div>
      )}
    </Card>
  );
};

const EmployeeOnlyPage = () => {
  const [activeView, setActiveView] = useState('today');
  const [pickups, setPickups] = useState(initialMockPickups);
  const [stats, setStats] = useState(initialMockStats);
  const [isStartingRoute, setIsStartingRoute] = useState(false);

  const handleComplete = async (pickupId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
   
    setPickups(prev => {
      const completedPickup = prev.pending.find(p => p.id === pickupId);
      const updatedPickup = {
        ...completedPickup,
        notes: `${completedPickup.notes}\nCompleted at ${new Date().toLocaleTimeString()}`
      };

      return {
        pending: prev.pending.filter(p => p.id !== pickupId),
        completed: [updatedPickup, ...prev.completed]
      };
    });

    setStats(prev => ({
      ...prev,
      completed: prev.completed + 1,
      pending: prev.pending - 1
    }));
  };

  const handleReportIssue = (pickupId) => {
    // Implement issue reporting logic
    console.log('Reporting issue for pickup:', pickupId);
  };

  const handleStartRoute = async () => {
    setIsStartingRoute(true);
    // Simulate route initialization
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsStartingRoute(false);
  };

  const PickupList = ({ pickups, status }) => (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {status === 'pending' ? 'Pending Pickups' : 'Completed Pickups'}
      </h2>
      {pickups.map(pickup => (
        <PickupCard
          key={pickup.id}
          pickup={pickup}
          status={status}
          onComplete={handleComplete}
          onReportIssue={handleReportIssue}
        />
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center ${
            isStartingRoute ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
          onClick={handleStartRoute}
          disabled={isStartingRoute}
        >
          {isStartingRoute ? (
            <Loader2 size={16} className="mr-1 animate-spin" />
          ) : (
            <Truck size={16} className="mr-1" />
          )}
          {isStartingRoute ? 'Starting...' : 'Start Route'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          title="Completed Today"
          value={stats.completed}
          bgColor="bg-green-100"
          textColor="text-green-800"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          bgColor="bg-yellow-100"
          textColor="text-yellow-800"
        />
        <StatCard
          title="Total Time"
          value={stats.totalTime}
          bgColor="bg-blue-100"
          textColor="text-blue-800"
        />
        <StatCard
          title="Efficiency"
          value={stats.efficiency}
          bgColor="bg-purple-100"
          textColor="text-purple-800"
        />
      </div>

      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          className={`flex-1 py-2 rounded-lg text-center transition-all ${
            activeView === 'today' ? 'bg-white shadow' : 'hover:bg-gray-200'
          }`}
          onClick={() => setActiveView('today')}
        >
          Today's Pickups
        </button>
        <button
          className={`flex-1 py-2 rounded-lg text-center transition-all ${
            activeView === 'completed' ? 'bg-white shadow' : 'hover:bg-gray-200'
          }`}
          onClick={() => setActiveView('completed')}
        >
          Completed
        </button>
      </div>

      <div>
        {activeView === 'today' ? (
          <PickupList pickups={pickups.pending} status="pending" />
        ) : (
          <PickupList pickups={pickups.completed} status="completed" />
        )}
      </div>
    </div>
  );
};


export default EmployeeOnlyPage;