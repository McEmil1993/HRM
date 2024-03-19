import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.1.135:90"
});

export default api;