import axios from "axios"

const axiosInstance =  axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
    withCredentials :true
});


// axiosInstance.interceptors.request.use((config)=>{
//     config.withCredentials=true
//     return  config;

// },(error)=>{
//     return Promise.reject(error)
// });

export default axiosInstance;