import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/AuthProvider';
import LoginPage from './components/LoginPage';
import EmployeeLoginPage from './components/EmployeeLoginPage';
import HomePage from './components/HomePage';
import RewardsPage from './components/RewardsPage';
import LocationsPage from './components/LocationsPage';
import ImpactPage from './components/ImpactPage';
import ProfilePage from './components/ProfilePage';
import SchedulePickupPage from './components/SchedulePickupPage';
import CommunityPage from './components/CommunityPage';
import EmployeeOnlyPage from './components/EmployeeOnlyPage';
import AdminPanel from './components/admin/AdminPanel'; 
import './index.css';

const DogGoneTrashApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { user, logout } = useContext(AuthContext);

  const renderContent = () => {
    if (!user && activeTab === 'employee') {
      return <EmployeeLoginPage />;
    }

    if (!user) {
      return <LoginPage />;
    }

    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={setActiveTab} />;
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
      case 'employee':
        return <EmployeeOnlyPage />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto">{renderContent()}</div>
      <nav className="bg-gray-100 py-2 flex justify-around">
        <button onClick={() => setActiveTab('home')}>Home</button>
        <button onClick={() => setActiveTab('rewards')}>Rewards</button>
        <button onClick={() => setActiveTab('locations')}>Locations</button>
        <button onClick={() => setActiveTab('employee')}>Employee</button>
        {user && (
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        )}
      </nav>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<DogGoneTrashApp />} />
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
