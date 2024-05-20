import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("DYXTtoken");
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});
