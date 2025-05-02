import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api', // backend çalıştığı port
});

export default API;

