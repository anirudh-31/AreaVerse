import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true
});
let isRefreshing = false;

// interceptor to automatically fetch the token from local storage when making requests.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token && !config.url.includes("/auth/login") && !config.url.includes("/auth/register")){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
);



export default api;