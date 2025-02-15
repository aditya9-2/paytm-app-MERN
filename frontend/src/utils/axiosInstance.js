import axios from "axios";
import https from "https";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,  // Ignore SSL certificate issues
    }),
});

export default axiosInstance;
