import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./globalvariable";

interface JobSeekerInfo {
  id: string;
  username: string;
}

interface JobSeekerAuthResponse {
  id: string;
  type: string;
  isOauth: boolean;
}

interface JobFindingPost {
  title: string;
  description: string;
  jobLocation: string;
  expectedSalary: number;
  workDates: string;
  workHoursRange: string;
  jobPostType: "FULLTIME" | "PARTTIME" | "FREELANCE";
  jobSeekerType: "NORMAL" | "OAUTH";
  skills: string[];
  jobCategories: string[];
}

interface JobFindingPostResponse {
  success: boolean;
  status: number;
  msg: string;
  data: {
    id: string;
    title: string;
    description: string;
    jobLocation: string;
    expectedSalary: number;
    workDates: string;
    workHoursRange: string;
    status: string;
    jobPostType: string;
    jobSeekerType: string;
    jobSeekerId: string;
    oauthJobSeekerId: string | null;
    createdAt: string;
    updatedAt: string;
    skills: {
      id: string;
      name: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }[];
    jobCategories: {
      id: string;
      name: string;
      description: string;
    }[];
  };
}

interface JobFindingPostPaginationResponse {
  success: boolean;
  status: number;
  msg: string;
  data: {
    jobPosts: {
      id: string;
      title: string;
      description: string;
      jobLocation: string;
      expectedSalary: number;
      workDates: string;
      workHoursRange: string;
      status: string;
      jobPostType: string;
      jobSeekerType: string;
      jobSeekerId: string;
      oauthJobSeekerId: string | null;
      createdAt: string;
      updatedAt: string;
      skills: {
        id: string;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
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

interface JobPostDetailResponse {
  success: boolean;
  data: {
    id: string;
    title: string;
    description: string;
    jobLocation: string;
    expectedSalary: number;
    workDates: string;
    workHoursRange: string;
    status: string;
    jobPostType: string;
    jobSeekerType: string;
    jobSeekerId: string | null;
    oauthJobSeekerId: string | null;
    createdAt: string;
    updatedAt: string;
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
  };
  message: string;
}

interface UserJobFindingPostResponse {
  success: boolean;
  status: number;
  msg: string;
  data: {
    jobPosts: {
      id: string;
      title: string;
      description: string;
      jobLocation: string;
      expectedSalary: number;
      workDates: string;
      workHoursRange: string;
      status: string;
      jobPostType: string;
      jobSeekerType: string;
      jobSeekerId: string;
      oauthJobSeekerId: string | null;
      createdAt: string;
      updatedAt: string;
      skills: {
        id: string;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
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

interface UpdateUserProfileRequest {
  firstName: string;
  lastName: string;
  aboutMe: string;
  address: string;
  email: string;
  contact: string;
  resumeImage: FormData;
}

export const registerJobSeeker = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<{ id: string }> => {
  try {
    const response = await axios.post<{ data: { id: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}`,
      {
        name,
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

export const loginJobSeeker = async (
  nameEmail: string,
  password: string
): Promise<JobSeekerAuthResponse> => {
  try {
    const response = await axios.post<{ data: JobSeekerAuthResponse }>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/login`,
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

export const logoutJobSeeker = async (): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/logout`,
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

export const fetchJobSeekerInfo = async (): Promise<JobSeekerInfo> => {
  try {
    const response = await axios.get<{ data: JobSeekerInfo }>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/info`,
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

export const createJobFindingPost = async (
  jobFindingPost: JobFindingPost
): Promise<JobFindingPostResponse> => {
  try {
    const response = await axios.post<JobFindingPostResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/job-finding`,
      jobFindingPost,
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

export const getAllJobFindingPosts = async (
  filters: {
    title?: string;
    provinces?: string[];
    jobCategories?: string[];
    salaryRange?: number;
    sortBy?: "asc" | "desc";
    salarySort?: "high-low" | "low-high";
    page?: number;
  } = {}
): Promise<JobFindingPostPaginationResponse> => {
  try {
    const response = await axios.get<JobFindingPostPaginationResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/job-finding`,
      {
        params: filters,
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

export const updateJobFindingPost = async (
  id: string,
  jobFindingPost: JobFindingPost
): Promise<JobFindingPostResponse> => {
  try {
    const response = await axios.put<JobFindingPostResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/job-finding/${id}`,
      jobFindingPost,
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

export const deleteJobFindingPost = async (id: string): Promise<void> => {
  try {
    await axios.delete(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/job-finding/${id}`,
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

export const getJobFindingPostById = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/job-finding/${id}`,
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

export const getUserJobFindingPosts = async (): Promise<UserJobFindingPostResponse> => {
  try {
    const response = await axios.get<UserJobFindingPostResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/job-finding/user`,
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

export const updateUserProfile = async (
  profileData: UpdateUserProfileRequest
): Promise<void> => {
  try {
    await axios.put(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/profile`,
      profileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const updateJobSeekerUsername = async (
  username: string,
  password: string
): Promise<{ userId: string; username: string }> => {
  try {
    const response = await axios.put<{ data: { userId: string; username: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/username`,
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

export const updateJobSeekerPassword = async (
  password: string,
  oldPassword: string
): Promise<{ userId: string }> => {
  try {
    const response = await axios.put<{ data: { userId: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION}/password`,
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

export const uploadProfileImage = async (
  formData: FormData
): Promise<{ approvalId: string; url: string }> => {
  try {
    const response = await axios.post<{ data: { approvalId: string; url: string } }>(
      `${API_BASE_URL}${API_ENDPOINTS.JOB_SEEKER.REGISTRATION_IMAGE}`,
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
