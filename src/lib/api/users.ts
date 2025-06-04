import { apiClient, getAuthHeaders } from "./apiClient";

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/users", { headers: getAuthHeaders() });
    return response.data.data.map((user: any) => user.attributes);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await apiClient.get("/users/me", { headers: getAuthHeaders() });
    return response.data.data.attributes;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};