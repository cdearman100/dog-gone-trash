import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">My Profile</h2>
      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h3 className="font-medium text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
