import { FaMapPin, FaHome, FaAward, FaUser } from 'react-icons/fa';
import { RiBarChart2Fill } from "react-icons/ri";
import React, { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './components/AuthProvider';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RewardsPage from './components/RewardsPage';
import LocationsPage from './components/LocationsPage';
import ImpactPage from './components/ImpactPage';
import ProfilePage from './components/ProfilePage';
import SchedulePickupPage from './components/SchedulePickupPage';
import CommunityPage from './components/CommunityPage';
import './index.css';


// Main App Component
const DogGoneTrashApp = () => {
    const [activeTab, setActiveTab] = useState('home');
    const { user, logout } = React.useContext(AuthContext);
  
    const renderContent = () => {
      if (!user) return <LoginPage />;
  
      switch (activeTab) {
        case 'home':
          return <HomePage />;
        case 'rewards':
          return <RewardsPage />;
        case 'locations':
          return <LocationsPage />;
        case 'impact':
          return <ImpactPage />;
        case 'profile':
          return <ProfilePage />;
        case 'schedule':
          return <SchedulePickupPage />;
        case 'community':
          return <CommunityPage />;
        default:
          return null;
      }
    };
  
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg h-screen flex flex-col">
        <div className="flex-grow overflow-y-auto">
          {renderContent()}
        </div>
        <nav className="bg-gray-100 py-2 flex justify-around items-center">
          <NavButton
            icon={<FaHome />}
            label="Home"
            isActive={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <NavButton
            icon={<FaAward />}
            label="Rewards"
            isActive={activeTab === 'rewards'}
            onClick={() => setActiveTab('rewards')}
          />
          <NavButton
            icon={<FaMapPin />}
            label="Locations"
            isActive={activeTab === 'locations'}
            onClick={() => setActiveTab('locations')}
          />
          <NavButton
            icon={<RiBarChart2Fill />}
            label="Impact"
            isActive={activeTab === 'impact'}
            onClick={() => setActiveTab('impact')}
          />
          <NavButton
            icon={<FaUser />}
            label="Profile"
            isActive={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
          {/* Sign Out Button */}
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-700 text-sm font-semibold"
          >
            Sign Out
          </button>
        </nav>
      </div>
    );
  };
  
  // NavButton Component
  const NavButton = ({ icon, label, isActive, onClick }) => (
    <button
      className={`flex flex-col items-center ${isActive ? 'text-blue-500' : 'text-gray-500'}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );


  const App = () => (
    <AuthProvider>
      <DogGoneTrashApp />
    </AuthProvider>
  );
  
  export default App;