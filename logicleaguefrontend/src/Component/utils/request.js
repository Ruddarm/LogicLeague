import axios from "axios"

const axiosInstance =  axios.create({
    baseURL:process.env.REACT_APP_BASE_URL
});


axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("jwttoken");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return  config;

},(error)=>{
    return Promise.reject(error)
});

export default axiosInstance;