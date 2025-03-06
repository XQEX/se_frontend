import axios from "axios";
import { baseURL } from "./globalvariable";

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
    console.log("Registering company with:", {
      officialName,
      email,
      password,
      confirmPassword,
    });
    const { data } = await axios.post<{ data: { id: string } }>(
      `${baseURL}/api/user/company`,
      { officialName, email, password, confirmPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Registration successful:", data);
    return data.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const loginCompany = async (
  nameEmail: string,
  password: string
): Promise<CompanyAuthResponse> => {
  try {
    console.log("Attempting to login company with:", { nameEmail, password });
    const { data } = await axios.post<{ data: CompanyAuthResponse }>(
      `${baseURL}/api/user/company/auth`,
      { nameEmail, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Login successful:", data);
    return data.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const fetchCompanyInfo = async (): Promise<CompanyInfo> => {
  try {
    console.log("Fetching company info...");
    const { data } = await axios.get<{ data: CompanyInfo }>(
      `${baseURL}/api/user/company/auth`,
      {
        withCredentials: true,
      }
    );
    console.log("Fetch company info successful:", data);
    return data.data;
  } catch (error) {
    console.error("Fetch company info failed:", (error as any).message);
    throw error;
  }
};

export const logoutCompany = async (): Promise<void> => {
  try {
    console.log("Logging out company...");
    const { data } = await axios.delete<{ data: void }>(
      `${baseURL}/api/user/company/auth`,
      {
        withCredentials: true,
      }
    );
    console.log("Logout successful:", data);
    return data.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const createJobPostCom = async (
  jobPost: JobPost
): Promise<JobPostResponse> => {
  try {
    console.log("Creating job post with:", jobPost);
    const { data } = await axios.post<{ data: JobPostResponse }>(
      `${baseURL}/api/post/job-posts/company`,
      jobPost,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Job post creation successful:", data);
    return data.data;
  } catch (error) {
    console.error("Job post creation failed:", error);
    throw error;
  }
};

export const getCompanyJobPosts =
  async (): Promise<CompanyJobPostsResponse> => {
    try {
      console.log("Fetching company job posts...");
      const { data } = await axios.get<CompanyJobPostsResponse>(
        `${baseURL}/api/post/company/job-posts`,
        {
          withCredentials: true,
        }
      );
      console.log("Fetch company job posts successful:", data);
      return data;
    } catch (error) {
      console.error("Fetch company job posts failed:", error);
      throw error;
    }
  };

export const updateCompanyUsername = async (
  username: string,
  password: string
): Promise<{ userId: string; username: string }> => {
  try {
    console.log("Updating employer username with:", { username, password });
    const { data } = await axios.put<{
      data: { userId: string; username: string };
    }>(
      `${baseURL}/api/user/company/auth/edit/official-name`,
      { officialName: username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Username update successful:", data);
    return data.data;
  } catch (error) {
    console.error("Username update failed:", error);
    throw error;
  }
};

export const updateCompanyPassword = async (
  password: string,
  oldPassword: string
): Promise<{ userId: string }> => {
  try {
    console.log("Updating employer password with:", {
      password,
      oldPassword,
    });
    const { data } = await axios.put<{ data: { userId: string } }>(
      `${baseURL}/api/user/company/auth/edit/password`,
      { password, oldPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Password update successful:", data);
    return data.data;
  } catch (error) {
    console.error("Password update failed:", error);
    throw error;
  }
};

export const uploadCompanyProfileImage = async (
  formData: FormData
): Promise<{ approvalId: string; url: string }> => {
  try {
    console.log("Uploading profile image...");

    const { data } = await axios.post<{
      data: { approvalId: string; url: string };
    }>(
      `${baseURL}/api/user/company/auth/profile-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    console.log("Profile image upload successful:", data);
    return data.data;
  } catch (error) {
    console.error("Profile image upload failed:", error);
    throw error;
  }
};
