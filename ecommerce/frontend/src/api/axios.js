import axios from "axios";

//  Create instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

//  Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

//  Optional: Handle errors globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log("Unauthorized - please login again");
    }
    return Promise.reject(err);
  }
);

export default API;