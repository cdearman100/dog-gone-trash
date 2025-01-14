import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/trash-locations/';

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const storedToken = localStorage.getItem('token'); // Retrieve token directly
    try {
      console.log('Token from localStorage:', storedToken); // Debug
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Token ${storedToken}`, // Use token in headers
        },
      });
      setLocations(response.data);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  const joinLocation = async (locationId) => {
    const storedToken = localStorage.getItem('token'); // Retrieve token directly
    try {
      await axios.post(
        `${API_URL}${locationId}/join/`,
        {},
        {
          headers: {
            Authorization: `Token ${storedToken}`, // Use token in headers
          },
        }
      );
      fetchLocations(); // Refresh locations to update volunteer counts
    } catch (error) {
      console.error('Failed to join location:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Cleanup Locations</h2>
      <div className="mt-4 space-y-3">
        {locations.map((location) => (
          <div key={location.id} className="bg-gray-100 p-4 rounded-lg flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">{location.name}</h3>
              <span className="text-sm text-gray-600">{location.description}</span>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-gray-700">{location.users_joined.length} Volunteers</span>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => joinLocation(location.id)}
              >
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
