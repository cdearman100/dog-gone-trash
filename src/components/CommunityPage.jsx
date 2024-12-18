import React, { useState } from 'react';

const CommunityPage = () => {
  const [challenges] = useState([
    {
      id: 1,
      title: 'Summer Cleanup Challenge',
      description: 'Collect 500 bags this summer',
      reward: '1000 Credits',
      progress: 65
    },
    {
      id: 2,
      title: 'Neighborhood Challenge',
      description: 'Get 50 volunteers in your area',
      reward: '500 Credits',
      progress: 40
    }
  ]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Community Challenges</h2>
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="bg-green-100 p-4 rounded-lg mb-3"
        >
          <h3 className="font-medium">{challenge.title}</h3>
          <p className="text-sm mb-2">{challenge.description}</p>
          <div className="flex justify-between items-center">
            <span>Reward: {challenge.reward}</span>
            <div className="w-full bg-gray-300 rounded-full h-2.5 ml-4">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${challenge.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;