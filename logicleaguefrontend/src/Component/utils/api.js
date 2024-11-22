import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const resfreshResponse = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: refreshToken,
          }
        );
        localStorage.setItem("accessToken", resfreshResponse.data.token.access);
        error.config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
        return api.request(error.config);
      } catch (refreshError) {
        console.log(refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
