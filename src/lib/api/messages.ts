import { apiClient, getAuthHeaders } from "./apiClient";

export const fetchMessages = async (roomId: number) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}/messages`, { headers: getAuthHeaders() });
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages for room", roomId, ":", error);
    throw error;
  }
};

export const sendMessage = async (roomId: number, text: string) => {
  try {
    const response = await apiClient.post(`/rooms/${roomId}/messages`, { message: { body: text } }, { headers: getAuthHeaders() });
    return response.data.data.attributes;
  } catch (error) {
    console.error(`Error sending message to room ${roomId}:`, error);
    throw error;
  }
};