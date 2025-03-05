import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./globalvariable";

interface CompanyInfo {
  id: string;
  username: string;
}

interface CompanyAuthResponse {
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
  hiredAmount: number;
  skills: string[];
  jobCategories: string[];
  jobPostType: string;
  companyName: string | null;
}

interface JobPostPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface CompanyJobPostsResponse {
  success: boolean;
  data: {
    jobPosts: Array<{
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
      employerId: string | null;
      oauthEmployerId: string | null;
      companyId: string;
      createdAt: string;
      updatedAt: string;
      companyName: string;
      skills: Array<{
        id: string;
        name: string;
        description: string;
      }>;
      jobCategories: Array<{
        id: string;
        name: string;
        description: string;
      }>;
    }>;
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
  message: string;
}

interface JobPostResponse {
  success: boolean;
  msg: string;
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
    employerId: string | null;
    oauthEmployerId: string | null;
    companyId: string;
    skills: { id: string; name: string }[];
    jobCategories: { id: string; name: string }[];
    createdAt: string;
    updatedAt: string;
  };
  status: number;
}

export const registerCompany = async (
  officialName: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<{ id: string }> => {
  try {
    const response = await axios.post<{ data: { id: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}`,
      {
        officialName,
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

export const loginCompany = async (
  nameEmail: string,
  password: string
): Promise<CompanyAuthResponse> => {
  try {
    const response = await axios.post<{ data: CompanyAuthResponse }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/login`,
      {
        nameEmail,
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

export const fetchCompanyInfo = async (): Promise<CompanyInfo> => {
  try {
    const response = await axios.get<{ data: CompanyInfo }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/info`,
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

export const logoutCompany = async (): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/logout`,
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

export const createJobPostCom = async (
  jobPost: JobPost
): Promise<JobPostResponse> => {
  try {
    const response = await axios.post<JobPostResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/job-posts`,
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

export const getCompanyJobPosts = async (): Promise<CompanyJobPostsResponse> => {
  try {
    const response = await axios.get<CompanyJobPostsResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/job-posts`,
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

export const updateJobPostCom = async (
  jobPostId: string,
  jobPost: JobPost
): Promise<JobPostResponse> => {
  try {
    const response = await axios.put<JobPostResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/job-posts/${jobPostId}`,
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

export const deleteJobPostCom = async (jobPostId: string): Promise<void> => {
  try {
    await axios.delete(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/job-posts/${jobPostId}`,
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

export const getJobPostComById = async (jobPostId: string): Promise<JobPostResponse> => {
  try {
    const response = await axios.get<JobPostResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/job-posts/${jobPostId}`,
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

export const updateCompanyProfile = async (
  companyInfo: CompanyInfo
): Promise<CompanyInfo> => {
  try {
    const response = await axios.put<{ data: CompanyInfo }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/profile`,
      companyInfo,
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

export const updateCompanyUsername = async (
  username: string,
  password: string
): Promise<{ userId: string; username: string }> => {
  try {
    const response = await axios.put<{ data: { userId: string; username: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/username`,
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

export const updateCompanyPassword = async (
  password: string,
  oldPassword: string
): Promise<{ userId: string }> => {
  try {
    const response = await axios.put<{ data: { userId: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/password`,
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

export const uploadCompanyProfileImage = async (
  formData: FormData
): Promise<{ approvalId: string; url: string }> => {
  try {
    const response = await axios.post<{ data: { approvalId: string; url: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.EMPLOYER.COMPANY}/profile-image`,
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
