import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';

const RewardsPage = () => {
  const { user } = useContext(AuthContext);

  const [availableRewards] = useState([
    { id: 1, name: 'Local Coffee Shop Discount', cost: 100 },
    { id: 2, name: 'Grocery Store Voucher', cost: 250 },
    { id: 3, name: 'Eco-friendly Water Bottle', cost: 500 },
  ]);

  const handleRedeem = (reward) => {
    if (user.credits >= reward.cost) {
      alert(`You have redeemed: ${reward.name}`);
      // Deduct reward cost from user credits (would normally involve an API call here)
    } else {
      alert('Insufficient credits to redeem this reward.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Community Rewards</h2>

      {/* User Credits */}
      <div className="mt-4 bg-blue-100 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span>Your Total Credits</span>
          <span className="font-bold text-2xl">{user.credits}</span>
        </div>
      </div>

      {/* Rewards List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Redeem Rewards</h3>
        {availableRewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white p-4 rounded-lg mb-3 flex justify-between items-center shadow-sm"
          >
            <div>
              <h4 className="font-medium">{reward.name}</h4>
              <p className="text-sm text-gray-600">{reward.cost} credits</p>
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => handleRedeem(reward)}
            >
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;
