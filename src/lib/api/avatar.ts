import { apiClient, getAuthHeaders } from "./apiClient";

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