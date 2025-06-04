import { apiClient, getAuthHeaders } from "./apiClient";

export const fetchParticipants = async (roomId: number) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}/participants`, { headers: getAuthHeaders() });
    return response.data.participants;
  } catch (error) {
    console.error(`Error fetching participants for room ${roomId}:`, error);
    throw error;
  }
};