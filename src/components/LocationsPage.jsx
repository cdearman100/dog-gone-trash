import React, { useState } from 'react';

const LocationsPage = () => {
  const [locations] = useState([
    { id: 1, name: 'Downtown Cleanup', date: 'Next Saturday', volunteers: 24 },
    { id: 2, name: 'Riverside Park', date: 'Next Month', volunteers: 12 },
    { id: 3, name: 'Community Center', date: 'This Weekend', volunteers: 36 },
  ]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Cleanup Locations</h2>
      <div className="mt-4 space-y-3">
        {locations.map((location) => (
          <div
            key={location.id}
            className="bg-gray-100 p-4 rounded-lg flex flex-col"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">{location.name}</h3>
              <span className="text-sm text-gray-600">{location.date}</span>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-gray-700">{location.volunteers} Volunteers</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;