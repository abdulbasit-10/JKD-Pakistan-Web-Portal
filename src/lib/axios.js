import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  // timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("client error")
      } else if (error.response.status === 500) {
        console.log("Server Error (500)");
      }
    } else if (error.code === "ECONNABORTED") {
      console.log("Request Timed Out");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
