import axios from 'axios';
const baseURL = process.env.URL_API;
console.log('BaseURL: ' + baseURL);
const APISorteos = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});
export default APISorteos;
