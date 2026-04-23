import axios from 'axios';

const API_KEY = import.meta.env.VITE_AGRO_API_KEY;
const BASE_URL = 'https://api.agromonitoring.com/agro/1.0';

const agroApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
  },
});

export const fetchSoilData = async (polyid) => {
  try {
    // This endpoint gets moisture and surface temperature
    const response = await agroApi.get('/soil', {
      params: { polyid },
    });
    return response.data;
  } catch (error) {
    console.error("API Fetch Error:", error.response?.data || error.message);
    throw error;
  }
};