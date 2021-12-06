import axios from "axios";
import { getToken, logout } from "./auth-service";

const prod = process.env.NODE_ENV === 'production';

const api = axios.create({
    baseURL: prod ? '' : 'http://localhost:3001/api'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// api.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     if (error.response.data.title && error.response.data.title.search('Token') > -1) {
//         logout();
//     }
//     return error;
// });

export default api;