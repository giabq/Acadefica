// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // URL confirmada pelo seu log
  timeout: 90000, // Aumentei um pouco pois a predição levou 16s no seu log
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;