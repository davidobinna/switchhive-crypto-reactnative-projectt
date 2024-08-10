import axios from "axios"
import { deleteToken, getToken } from "./securedToken";




const axiosClient = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        'Accept': 'application/json'
    }, 
    withCredentials: true
});

axiosClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  });
  
  axiosClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {
  console.log(error)
    if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        if (status === 403 || status === 401) {
            await deleteToken();
        }

        if ([404, 500, 422].includes(status)) {
            throw data;
        }  else {
            throw error;
        }
    } else {
        // Handle errors without a response (e.g., network errors)
        console.error('Network error:', error.message);
        throw error.message;
    }
});
  
  export default axiosClient;