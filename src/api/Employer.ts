import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./globalvariable";

interface EmployerInfo {
  id: string;
  username: string;
}

interface EmployerAuthResponse {
  id: string;
  type: string;
  isOauth: boolean;
}

interface JobPost {
  title: string;
  description: string;
  jobLocation: string;
  salary: number;
  workDates: string;
  workHoursRange: string;
  jobPostType: "FULLTIME" | "PARTTIME" | "FREELANCE";
  hiredAmount: number;
  skills: string;
  jobCategories: string;
}

interface JobPostResponse {
  success: boolean;
  data: {
    id: string;
    title: string;
    description: string;
    jobLocation: string;
    salary: number;
    workDates: string;
    workHoursRange: string;
    status: string;
    hiredAmount: number;
    jobHirerType: string;
    employerId: string;
    oauthEmployerId: string | null;
    companyId: string | null;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

interface EmployerJobPostsResponse {
  success: boolean;
  status: number;
  msg: string;
  data: {
    jobPosts: {
      id: string;
      title: string;
      description: string;
      jobLocation: string;
      salary: number;
      workDates: string;
      workHoursRange: string;
      hiredAmount: number;
      status: string;
      jobHirerType: string;
      jobPostType: string;
      employerId: string;
      oauthEmployerId: string | null;
      companyId: string | null;
      createdAt: string;
      updatedAt: string;
      companyName: string | null;
      skills: {
        id: string;
        name: string;
        description: string;
      }[];
      jobCategories: {
        id: string;
        name: string;
        description: string;
      }[];
    }[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export const registerEmployer = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<{ id: string }> => {
  try {
    const response = await axios.post<{ data: { id: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.REGISTRATION}`,
      {
        username,
        email,
        password,
        confirmPassword,
      },
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

export const loginEmployer = async (
  usernameEmail: string,
  password: string
): Promise<EmployerAuthResponse> => {
  try {
    const response = await axios.post<{ data: EmployerAuthResponse }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.LOGIN}`,
      {
        usernameEmail,
        password,
      },
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

export const fetchEmployerInfo = async (): Promise<EmployerInfo> => {
  try {
    const response = await axios.get<{ data: EmployerInfo }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.INFO}`,
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

export const logoutEmployer = async (): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.LOGOUT}`,
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

export const createJobPost = async (
  jobPost: JobPost
): Promise<JobPostResponse> => {
  try {
    const response = await axios.post<JobPostResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.JOB_POSTS}`,
      jobPost,
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

export const getEmployerJobPosts = async (): Promise<EmployerJobPostsResponse> => {
  try {
    const response = await axios.get<EmployerJobPostsResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.JOB_POSTS}`,
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

export const updateJobPost = async (
  jobPostId: string,
  jobPost: JobPost
): Promise<JobPostResponse> => {
  try {
    const response = await axios.put<JobPostResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.JOB_POSTS}/${jobPostId}`,
      jobPost,
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

export const deleteJobPost = async (jobPostId: string): Promise<void> => {
  try {
    await axios.delete(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.JOB_POSTS}/${jobPostId}`,
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

export const getJobPostById = async (jobPostId: string): Promise<JobPostResponse> => {
  try {
    const response = await axios.get<JobPostResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.JOB_POSTS}/${jobPostId}`,
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

export const updateEmployerProfile = async (
  employerInfo: EmployerInfo
): Promise<EmployerInfo> => {
  try {
    const response = await axios.put<{ data: EmployerInfo }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.PROFILE}`,
      employerInfo,
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

export const updateEmployerUsername = async (
  username: string,
  password: string
): Promise<{ userId: string; username: string }> => {
  try {
    const response = await axios.put<{ data: { userId: string; username: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.USERNAME}`,
      { username, password },
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

export const updateEmployerPassword = async (
  password: string,
  oldPassword: string
): Promise<{ userId: string }> => {
  try {
    const response = await axios.put<{ data: { userId: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.PASSWORD}`,
      { password, oldPassword },
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

export const uploadEmployerProfileImage = async (
  formData: FormData
): Promise<{ approvalId: string; url: string }> => {
  try {
    const response = await axios.post<{ data: { approvalId: string; url: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.PROFILE_IMAGE}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
