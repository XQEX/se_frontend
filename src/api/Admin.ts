import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./globalvariable";

interface AdminInfo {
  id: string;
  username: string;
}

interface ApprovalRequest {
  id: string;
  userId: string;
  userType: string;
  status: string;
  adminId: string;
}

export const fetchAdminInfo = async (): Promise<AdminInfo> => {
  try {
    const response = await axios.get<{ data: AdminInfo }>(
      `${API_BASE_URL}${API_ENDPOINTS.ADMIN.INFO}`,
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

export const fetchApprovalRequests = async (): Promise<ApprovalRequest[]> => {
  try {
    const response = await axios.get<{ data: ApprovalRequest[] }>(
      `${API_BASE_URL}${API_ENDPOINTS.ADMIN.APPROVALS}`,
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

export const generateAdmin = async (): Promise<AdminInfo> => {
  try {
    const response = await axios.post<{ data: AdminInfo }>(
      `${API_BASE_URL}${API_ENDPOINTS.ADMIN.GENERATE}`,
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

export const loginAdmin = async (
  name: string,
  password: string
): Promise<AdminInfo> => {
  try {
    const response = await axios.post<{ data: AdminInfo }>(
      `${API_BASE_URL}${API_ENDPOINTS.ADMIN.LOGIN}`,
      { name, password },
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

export const logoutAdmin = async (): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.ADMIN.LOGOUT}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const approveUser = async (
  userId: string,
  status: string
): Promise<ApprovalRequest> => {
  try {
    const response = await axios.put<{ data: ApprovalRequest }>(
      `${API_BASE_URL}${API_ENDPOINTS.ADMIN.APPROVE}/${userId}`,
      { status },
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
