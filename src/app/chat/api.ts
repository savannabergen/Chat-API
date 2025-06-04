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
    return response.data.participants;
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

export const updateUserAvatar = async (avatar: File) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const response = await apiClient.patch("/users/update_avatar", formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data.attributes;
  } catch (error) {
    console.error("Error updating user avatar:", error);
    throw error;
  }
};

export const fetchUserAvatar = async (userId: number) => {
  try {
    const response = await apiClient.get(`/users/${userId}/avatar`, {
      headers: getAuthHeaders(),
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error(`Error fetching avatar for user ${userId}:`, error);
    throw error;
  }
};