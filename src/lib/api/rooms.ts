import { apiClient, getAuthHeaders } from "./apiClient";

export const fetchRooms = async () => {
  try {
    const response = await apiClient.get("/rooms", {
      headers: getAuthHeaders(),
    });
    console.log(response);
    return response.data.map((room: any) => room.attributes);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const fetchParticipants = async (roomId: number) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}/participants`, { headers: getAuthHeaders() });
    return response.data.participants;
  } catch (error) {
    console.error(`Error fetching participants for room ${roomId}:`, error);
    throw error;
  }
};

