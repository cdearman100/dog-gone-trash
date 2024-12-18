import React from 'react';
import { AuthContext } from './AuthProvider';

const ImpactPage = () => {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Your Community Impact</h2>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium">Bags Collected</h3>
          <p className="text-2xl font-bold">{user.pickupsCompleted * 3}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium">Areas Cleaned</h3>
          <p className="text-2xl font-bold">{user.communityImpact}</p>
        </div>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Your Progress</h3>
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(user.pickupsCompleted / 50) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2">
          {user.pickupsCompleted} / 50 Pickups to Gold Status
        </p>
      </div>
    </div>
  );
};

export default ImpactPage;
