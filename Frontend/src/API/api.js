const BASE_URL = 'http://localhost:5000/api'; // change this to your deployed backend later

export const saveTypingHistory = async (data) => {
  const res = await fetch(`${BASE_URL}/history`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getTypingHistory = async () => {
  const res = await fetch(`${BASE_URL}/history`);
  return res.json();
};

export const getLeaderboard = async () => {
  const res = await fetch(`${BASE_URL}/leaderboard`);
  return res.json();
};

export const saveToLeaderboard = async (data) => {
  const res = await fetch(`${BASE_URL}/leaderboard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};
// src/API/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure your backend is running on this
  withCredentials: true, // Important if your server uses cookies
});

export default api;
