import axios from 'axios';
import {BASE_URL} from '../utils/env';

const client = axios.create({
  baseURL: BASE_URL.API_BASE_URL_V2,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default client;
