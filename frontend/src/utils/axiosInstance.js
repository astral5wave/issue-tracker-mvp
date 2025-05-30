import axios from 'axios';

const axiosInstance= axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL || "http://localhost:8000",
    timeout:10000, //10s timeout
    headers:{
        "Content-Type":"application/json"
    },
});
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        } 
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);
export default axiosInstance;
