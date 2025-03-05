import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./globalvariable";

interface Skill {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface SkillResponse {
  success: boolean;
  status: number;
  msg: string;
  data: Skill[];
}

export const getAllSkills = async (): Promise<SkillResponse> => {
  try {
    const response = await axios.get<SkillResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.SKILLS.LIST}`,
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

export const createSkill = async (skill: {
  name: string;
  description: string;
}): Promise<SkillResponse> => {
  try {
    const response = await axios.post<SkillResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.SKILLS.CREATE}`,
      skill,
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

export const getSkillById = async (id: string): Promise<SkillResponse> => {
  try {
    const response = await axios.get<SkillResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.SKILLS.GET}/${id}`,
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

export const updateSkill = async (
  id: string,
  skill: { name: string; description: string }
): Promise<SkillResponse> => {
  try {
    const response = await axios.put<SkillResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.SKILLS.UPDATE}/${id}`,
      skill,
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

export const deleteSkill = async (id: string): Promise<SkillResponse> => {
  try {
    const response = await axios.delete<SkillResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.SKILLS.DELETE}/${id}`,
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
