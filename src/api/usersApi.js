import axios from 'axios';

// If REACT_APP_API_URL is set, use it; otherwise fallback to local dev
const BASE_API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://127.0.0.1:8000/api/';

export const getUsers = async (headers = {}) => {
  console.log("Fetching users from:", `${BASE_API_URL}users/`);
  const response = await axios.get(`${BASE_API_URL}users/`, { headers });
  return response.data;
};

export const getUser = async (id, headers = {}) => {
  const response = await axios.get(`${BASE_API_URL}users/${id}/`, { headers });
  return response.data;
};

export const createUser = async (user, headers = {}) => {
  const response = await axios.post(`${BASE_API_URL}users/`, user, { headers });
  return response.data;
};

export const updateUser = async (id, user, headers = {}) => {
  const response = await axios.put(`${BASE_API_URL}users/${id}/`, user, { headers });
  return response.data;
};

export const deleteUser = async (id, headers = {}) => {
  const response = await axios.delete(`${BASE_API_URL}users/${id}/`, { headers });
  return response.data;
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_API_URL}login/`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response);
    throw error.response ? error.response.data : { detail: 'An error occurred' };
  }
};
