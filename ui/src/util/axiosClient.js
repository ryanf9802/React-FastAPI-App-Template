import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err.response?.data || err);
    return Promise.reject(err);
  }
);

export default axiosClient;
