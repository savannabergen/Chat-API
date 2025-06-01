import axios from "axios";
import { API_DOMAIN } from "./constants";

const apiClient = axios.create({
  baseURL: API_DOMAIN,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/users/sign_in", {
    "user[email]": email,
    "user[password]": password,
  });
  const token = response.data.token;
  localStorage.setItem("authToken", token);
  return response;
};

export const checkAuth = async () => {
  try {
    const response = await apiClient.get("/users/edit");
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log("Not authenticated");
      return null;
    }
    throw error;
  }
};

export const getRooms = async () => {
  const response = await apiClient.get("/rooms");
  return response.data;
};

export const getUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const getMessages = async (roomId: number) => {
  const response = await apiClient.get(`/rooms/${roomId}/messages`);
  try {
    return response.data; // Assuming response.data is already JSON
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getParticipants = async (roomId: number) => {
  const response = await apiClient.get(`/rooms/${roomId}/participants`);
  return response.data;
};

export const sendMessage = async (roomId: number, text: string) => {
  const response = await apiClient.post(`/rooms/${roomId}/messages`, {
    message: {
      body: text,
    },
  });
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("authToken");
  const response = await apiClient.delete("/users/sign_out");
  return response.data;
};

export { apiClient };
