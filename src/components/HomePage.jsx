import React from 'react';
import { Trash2, Award, Check, DollarSign } from 'lucide-react';
import { AuthContext } from './AuthProvider';

const QuickActionButton = ({ icon, label, onClick }) => (
  <button
    className="flex flex-col items-center justify-center p-4 bg-blue-500 text-white rounded-lg shadow-md"
    onClick={onClick}
  >
    <div className="text-2xl mb-2">{icon}</div>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const HomePage = ({ setActiveTab}) => {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="mt-2">Changing communities one bag at a time</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <QuickActionButton
          icon={<Trash2 />}
          label="Schedule Pickup"
          onClick={() => {
            setActiveTab('schedule')
            
            // Navigate to pickup scheduling
            
          }}
        />
        <QuickActionButton
          icon={<Award />}
          label="Community Rewards"
          onClick={() => {
            setActiveTab('rewards')
            // Navigate to rewards
          }}
        />
      </div>

      <div className="mt-6 bg-green-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="mt-2">
          <div className="flex justify-between items-center mb-2">
            <span>Pickup Scheduled</span>
            <Check className="text-green-600" />
          </div>
          <div className="flex justify-between items-center">
            <span>Rewards Earned</span>
            <DollarSign className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
