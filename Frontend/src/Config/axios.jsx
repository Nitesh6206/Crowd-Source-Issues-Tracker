// src/Config/axios.js
import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Update as per your backend
});

// Set token in headers
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Clear token
export const clearAuthToken = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// Set token if already stored
const storedUserString = sessionStorage.getItem("user");
const storedUser = JSON.parse(storedUserString);
if (storedUser?.token) {
  setAuthToken(storedUser.token);
}

export default axiosInstance;
