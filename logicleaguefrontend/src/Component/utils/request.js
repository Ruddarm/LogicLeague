import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    console.log(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response)

    if (response) {
      return response;
    }
  },
  (error) => {
    console.log(error);
  }
);

export default axiosInstance;
