import axios from 'axios';
import {URL_API} from '@env';

const baseURL = URL_API;

const APISorteos = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default APISorteos;
