import axios from "axios";
import { backendPort } from "./globalvariable";

export interface CurrentUserResponse {
  success: boolean;
  status: number;
  msg: string;
  data?: {
    role: 'jobseeker' | 'employer' | 'company';
    type: 'normal' | 'oauth';
    isOauth: boolean;
    userData: {
      id: string;
      username?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      officialName?: string;
      about?: string;
      address?: string;
      provinceAddress?: string;
      contact?: string;
      profileImageUrl?: string;
      approvalStatus?: string;
    }
  }
}

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  try {
    const { data } = await axios.get<CurrentUserResponse>(
      `http://localhost:${backendPort}/api/user/current`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    throw error;
  }
}; 