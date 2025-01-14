import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/rewards/';

export const getRewards = async (headers = {}) => {
  const response = await axios.get(API_URL, { headers });
  return response.data;
};

export const getReward = async (id, headers = {}) => {
  const response = await axios.get(`${API_URL}${id}/`, { headers });
  return response.data;
};

export const createReward = async (reward, headers = {}) => {
  const response = await axios.post(API_URL, reward, { headers });
  return response.data;
};

export const updateReward = async (id, reward, headers = {}) => {
  const response = await axios.put(`${API_URL}${id}/`, reward, { headers });
  return response.data;
};

export const deleteReward = async (id, headers = {}) => {
  const response = await axios.delete(`${API_URL}${id}/`, { headers });
  return response.data;
};