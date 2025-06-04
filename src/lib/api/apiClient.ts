import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://chat.savannagrace.dev",
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found");
  }
  return { Authorization: `Bearer ${token}` };
};

export { apiClient, getAuthHeaders };