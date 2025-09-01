import axios from "axios";
import { logoutUser, refreshToken } from "../features/auth/authSlice";

const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true
});

let isRefreshing = false;
let failedQueue  = [];
let store;

export const injectStore = (_store) => {
    store = _store
}
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


const processQueue = (error, token = null) => {
    failedQueue.forEach( prom => {
        if(error) {
            prom.reject(error)
        }else{
            prom.resolve(token)
        }
    });
    failedQueue = [];
}

// interceptor to automatically fetch the new auth token with it is expired.
api.interceptors.response.use(
    // if response was received, then return it normally.
    res => res,
    async (err) => {
        const originalRequest = err.config
        
        // if access token has expired, retreive a new access token
        if(err.response?.status == 403 && !originalRequest._retry){
            originalRequest._retry = true;
            if(isRefreshing){
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                }).then( token => {
                    originalRequest.headers["Authorization"] = "Bearer " + token;
                    return api(originalRequest)
                });
            }

            originalRequest._retry = true;
            isRefreshing           = true;
            try{
                const { token } = await store.dispatch(refreshToken()).unwrap();
                api.defaults.headers.common["Authorization"] = "Bearer " + token;

                processQueue(null, token)

                originalRequest.headers["Authorization"] = "Bearer " + token;
                return api(originalRequest)
            } catch (error){
                processQueue(error, null);
                store.dispatch(logoutUser());
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(err);
    }
)

export default api;