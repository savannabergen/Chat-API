import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://chat.savannagrace.dev",
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found");
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

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

export const fetchMessages = async (roomId: number) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}/messages`, {
      headers: getAuthHeaders(),
    });
    return response.data.map((message: any) => message.attributes);
  } catch (error) {
    console.error(`Error fetching messages for room ${roomId}:`, error);
    throw error;
  }
};

export const fetchParticipants = async (roomId: number) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}/participants`, {
      headers: getAuthHeaders(),
    });
    console.log(response);
    return response.data; // Just return response.data for now
  } catch (error) {
    console.error(`Error fetching participants for room ${roomId}:`, error);
    throw error;
  }
};

export const sendMessage = async (roomId: number, text: string) => {
  try {
    const response = await apiClient.post(
      `/rooms/${roomId}/messages`,
      {
        message: {
          body: text,
        },
      },
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data.data.attributes;
  } catch (error) {
    console.error(`Error sending message to room ${roomId}:`, error);
    throw error;
  }
};
