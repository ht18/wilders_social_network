import axios from "axios";

export default function JwtToken() {
  let token = localStorage.getItem("token");
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}
