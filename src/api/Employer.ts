import axios from "axios";
import { baseURL } from "./globalvariable";

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
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): Promise<{ id: string }> => {
  try {
    console.log("Registering employer with:", {
      name,
      email,
      password,
      confirmPassword,
    });
    const { data } = await axios.post<{ data: { id: string } }>(
      `${baseURL}/api/user/employer`,
      { name, email, password, confirmPassword },
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

export const loginEmployer = async (
  nameEmail: string,
  password: string
): Promise<EmployerAuthResponse> => {
  try {
    console.log("Attempting to login employer with:", { nameEmail, password });
    const { data } = await axios.post<{ data: EmployerAuthResponse }>(
      `${baseURL}/api/user/employer/auth`,
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

export const fetchEmployerInfo = async (): Promise<EmployerInfo> => {
  try {
    console.log("Fetching employer info...");
    const { data } = await axios.get<{ data: EmployerInfo }>(
      `${baseURL}/api/user/employer/auth`,
      {
        withCredentials: true,
      }
    );
    console.log("Fetch employer info successful:", data);
    return data.data;
  } catch (error) {
    console.error("Fetch employer info failed:", (error as any).message);
    throw error;
  }
};

export const logoutEmployer = async (): Promise<void> => {
  try {
    console.log("Logging out employer...");
    const { data } = await axios.delete<{ data: void }>(
      `${baseURL}/api/user/employer/auth`,
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

export const createJobPostEmp = async (
  jobPost: JobPost
): Promise<JobPostResponse> => {
  try {
    console.log("Creating job post with:", jobPost);
    const { data } = await axios.post<{ data: JobPostResponse }>(
      `${baseURL}/api/post/job-posts/employer`,
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

export const getEmployerJobPosts =
  async (): Promise<EmployerJobPostsResponse> => {
    try {
      console.log(
        "Fetching job posts created by the authenticated employer..."
      );
      const { data } = await axios.get<EmployerJobPostsResponse>(
        `${baseURL}/api/post/user/job-posts`,
        {
          withCredentials: true,
        }
      );
      console.log("Job posts fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch job posts:", error);
      throw error;
    }
  };

export const updateEmployerUsername = async (
  username: string,
  password: string
): Promise<{ userId: string; username: string }> => {
  try {
    console.log("Updating employer username with:", { username, password });
    const { data } = await axios.put<{
      data: { userId: string; username: string };
    }>(
      `${baseURL}/api/user/employer/auth/edit/username`,
      { username, password },
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

export const updateEmployerPassword = async (
  password: string,
  oldPassword: string
): Promise<{ userId: string }> => {
  try {
    console.log("Updating employer password with:", {
      password,
      oldPassword,
    });
    const { data } = await axios.put<{ data: { userId: string } }>(
      `${baseURL}/api/user/employer/auth/edit/password`,
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

export const uploadEmployerProfileImage = async (
  formData: FormData
): Promise<{ approvalId: string; url: string }> => {
  try {
    console.log("Uploading profile image...");

    const { data } = await axios.post<{
      data: { approvalId: string; url: string };
    }>(
      `${baseURL}/api/user/employer/auth/profile-image`,
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
