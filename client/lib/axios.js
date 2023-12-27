import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://bookverse-uas-api.vercel.app',
});
