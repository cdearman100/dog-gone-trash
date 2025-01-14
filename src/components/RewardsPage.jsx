import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { getRewards } from '../api/rewardsApi'; // Import the API utility function

const RewardsPage = () => {
  const { user } = useContext(AuthContext); // Get user context
  const [availableRewards, setAvailableRewards] = useState([]); // Rewards from API
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch rewards from API on component mount
  useEffect(() => {
    const fetchRewards = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        console.error('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const rewards = await getRewards({ Authorization: `Token ${token}` }); // Fetch rewards with token
        setAvailableRewards(rewards);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch rewards:', error);
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  const handleRedeem = (reward) => {
    if (user.credits >= reward.points) {
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
        {loading ? (
          <p>Loading rewards...</p>
        ) : availableRewards.length > 0 ? (
          availableRewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-white p-4 rounded-lg mb-3 flex justify-between items-center shadow-sm"
            >
              <div>
                <h4 className="font-medium">{reward.name}</h4>
                <p className="text-sm text-gray-600">{reward.points} credits</p>
              </div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleRedeem(reward)}
              >
                Redeem
              </button>
            </div>
          ))
        ) : (
          <p>No rewards available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default RewardsPage;
