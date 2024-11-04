import axios from 'axios';
const API_KEY = import.meta.env.VITE_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

const getAll = (capital) => {
  const request = axios
    .get(`${baseUrl}q=${capital}&units=metric&APPID=${API_KEY}`)
    .then((response) => response.data)
    .then((response) => response);
  return request;
};

export default { getAll };
