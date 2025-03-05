import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./globalvariable";

interface JobCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface JobCategoryResponse {
  success: boolean;
  status: number;
  msg: string;
  data: JobCategory[];
}

export const getAllCategories = async (): Promise<JobCategoryResponse> => {
  try {
    const response = await axios.get<JobCategoryResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_CATEGORIES.LIST}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (category: {
  name: string;
  description: string;
}): Promise<JobCategoryResponse> => {
  try {
    const response = await axios.post<JobCategoryResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_CATEGORIES.CREATE}`,
      category,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (
  id: string
): Promise<JobCategoryResponse> => {
  try {
    const response = await axios.get<JobCategoryResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_CATEGORIES.GET}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (
  id: string,
  category: { name: string; description: string }
): Promise<JobCategoryResponse> => {
  try {
    const response = await axios.put<JobCategoryResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_CATEGORIES.UPDATE}/${id}`,
      category,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (
  id: string
): Promise<JobCategoryResponse> => {
  try {
    const response = await axios.delete<JobCategoryResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_CATEGORIES.DELETE}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
