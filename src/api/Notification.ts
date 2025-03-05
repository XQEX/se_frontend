import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./globalvariable";

interface Notification {
  id: string;
  status: "all" | "READ" | "UNREAD";
  title: string;
  description: string;
  userType: string;
  jobSeekerId?: string;
  oauthJobSeekerId?: string;
  employerId?: string;
  oauthEmployerId?: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

interface NotificationResponse {
  success: boolean;
  data: Notification[];
}

export const fetchNotifications = async (
  status: "all" | "READ" | "UNREAD" = "all"
): Promise<Notification[]> => {
  try {
    const response = await axios.get<NotificationResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.NOTIFICATION.LIST}`,
      {
        params: { status },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const markNotificationAsRead = async (
  id: string
): Promise<Notification> => {
  try {
    const response = await axios.put<{ data: Notification }>(
      `${API_BASE_URL}${API_ENDPOINTS.NOTIFICATION.READ}/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const markAllNotificationsAsRead = async (): Promise<Notification[]> => {
  try {
    const response = await axios.put<NotificationResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.NOTIFICATION.READ_ALL}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
