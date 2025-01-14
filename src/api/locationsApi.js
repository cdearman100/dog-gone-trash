import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/trash-locations/';

// Helper to get headers with token
const getAuthHeaders = () => {
 
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("No token found in localStorage.");
  }
  return token ? { Authorization: `Token ${token}` } : {};
};

export const getLocations = async () => {
  try {
    
    const response = await axios.get(API_URL, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const getLocation = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error fetching location:", error);
    throw error;
  }
};

export const createLocation = async (location) => {
  try {
    const response = await axios.post(API_URL, location, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
};

export const updateLocation = async (id, location) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, location, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error updating location:", error);
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error("Error deleting location:", error);
    throw error;
  }
};
