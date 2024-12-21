import React, { useState } from 'react';
import {
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

const EmployeeOnlyPage = () => {
  const [activeView, setActiveView] = useState('today');
 
  // Mock data for pickups
  const [pickups] = useState({
    pending: [
      {
        id: 1,
        customer: "Sarah Johnson",
        address: "123 Main St",
        time: "10:00 AM",
        phone: "555-0123",
        email: "sarah@example.com",
        notes: "Please use side gate"
      },
      {
        id: 2,
        customer: "Mike Smith",
        address: "456 Oak Ave",
        time: "2:30 PM",
        phone: "555-0124",
        email: "mike@example.com",
        notes: "Large items"
      }
    ],
    completed: [
      {
        id: 3,
        customer: "Emma Davis",
        address: "789 Pine Rd",
        time: "9:00 AM",
        phone: "555-0125",
        email: "emma@example.com",
        notes: "Completed at 9:45 AM"
      }
    ]
  });

  // Stats for the day
  const stats = {
    completed: 5,
    pending: 3,
    totalTime: "6.5 hrs",
    efficiency: "92%"
  };

  const renderPickupCard = (pickup, status) => (
    <div key={pickup.id} className="bg-white rounded-lg shadow mb-4 p-4">
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
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center">
            <CheckCircle size={16} className="mr-1" />
            Mark Complete
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center">
            <AlertCircle size={16} className="mr-1" />
            Report Issue
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
          <Truck size={16} className="mr-1" />
          Start Route
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="text-green-800 text-sm">Completed Today</div>
          <div className="text-2xl font-bold">{stats.completed}</div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <div className="text-yellow-800 text-sm">Pending</div>
          <div className="text-2xl font-bold">{stats.pending}</div>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="text-blue-800 text-sm">Total Time</div>
          <div className="text-2xl font-bold">{stats.totalTime}</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <div className="text-purple-800 text-sm">Efficiency</div>
          <div className="text-2xl font-bold">{stats.efficiency}</div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          className={`flex-1 py-2 rounded-lg text-center ${
            activeView === 'today' ? 'bg-white shadow' : ''
          }`}
          onClick={() => setActiveView('today')}
        >
          Today's Pickups
        </button>
        <button
          className={`flex-1 py-2 rounded-lg text-center ${
            activeView === 'completed' ? 'bg-white shadow' : ''
          }`}
          onClick={() => setActiveView('completed')}
        >
          Completed
        </button>
      </div>

      {/* Pickup Lists */}
      <div>
        {activeView === 'today' ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Pending Pickups</h2>
            {pickups.pending.map(pickup => renderPickupCard(pickup, 'pending'))}
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4">Completed Pickups</h2>
            {pickups.completed.map(pickup => renderPickupCard(pickup, 'completed'))}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeOnlyPage;