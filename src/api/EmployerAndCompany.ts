import axios from "axios";
import { baseURL } from "./globalvariable";

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

interface JobPostPaginationResponse {
  success: boolean;
  data: {
    jobPosts: JobPost[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
  message: string;
}

interface JobPostDetailResponse {
  success: boolean;
  status: number;
  msg: string;
  data: {
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
  };
}

interface JobPostUpdateRequest {
  title: string;
  description: string;
  jobLocation: string;
  salary: number;
  workDates: string;
  workHoursRange: string;
  hiredAmount: number;
  jobPostType: "FULLTIME" | "PARTTIME" | "FREELANCE";
  skills: string[];
  jobCategories: string[];
}

interface JobPostUpdateResponse {
  success: boolean;
  status: number;
  msg: string;
  data: JobPostDetailResponse["data"];
}

interface UpdateUserProfileRequest {
  firstName: string;
  lastName: string;
  aboutMe: string;
  address: string;
  email: string;
  contact: string;
  userType: "EMPLOYER" | "COMPANY";
}

export const getAllJobPosts = async (
  filters: {
    title?: string;
    provinces?: string[];
    jobCategories?: string[];
    salaryRange?: number;
    sortBy?: "asc" | "desc";
    salarySort?: "high-low" | "low-high";
    page?: number;
  } = {}
): Promise<JobPostPaginationResponse> => {
  try {
    console.log("Fetching all job posts with filters:", filters);
    const { data } = await axios.get<JobPostPaginationResponse>(
      `${baseURL}/api/post/job-posts`,
      {
        params: filters,
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

export const deleteJobPost = async (id: string): Promise<void> => {
  try {
    console.log("Deleting job post with ID:", id);
    const { data } = await axios.delete<{ data: void }>(
      `${baseURL}/api/post/job-posts/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log("Job post deletion successful:", data);
  } catch (error) {
    console.error("Job post deletion failed:", error);
    throw error;
  }
};

export const getJobPostById = async (
  id: string
): Promise<JobPostDetailResponse> => {
  try {
    console.log("Fetching job post with ID:", id);
    const { data } = await axios.get<JobPostDetailResponse>(
      `${baseURL}/api/post/job-posts/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log("Job post fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch job post:", error);
    throw error;
  }
};

export const updateJobPostById = async (
  id: string,
  updateData: JobPostUpdateRequest
): Promise<JobPostUpdateResponse> => {
  try {
    console.log("Updating job post with ID:", id);
    const { data } = await axios.put<JobPostUpdateResponse>(
      `${baseURL}/api/post/job-posts/${id}`,
      updateData,
      {
        withCredentials: true,
      }
    );
    console.log("Job post updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to update job post:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  profileData: UpdateUserProfileRequest
): Promise<void> => {
  console.log("Updating user profile with:", profileData);

  const userType = profileData.userType === "EMPLOYER" ? "employer" : "company";

  if (userType === "employer") {
    console.log("Updating full name...");
    const fullNameResponse = await axios.put<{ data: void }>(
      `${baseURL}/api/user/${userType}/auth/edit/full-name`,
      { firstName: profileData.firstName, lastName: profileData.lastName },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Full name update response:", fullNameResponse);
  }

  console.log("Updating about me...");
  const aboutResponse = await axios.put<{ data: void }>(
    `${baseURL}/api/user/${userType}/auth/edit/about`,
    { about: profileData.aboutMe },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log("About me update response:", aboutResponse);

  console.log("Updating address...");
  const addressResponse = await axios.put<{ data: void }>(
    `${baseURL}/api/user/${userType}/auth/edit/address`,
    { address: profileData.address, provinceAddress: "XD" },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log("Address update response:", addressResponse);

  console.log("Updating email...");
  const emailResponse = await axios.put<{ data: void }>(
    `${baseURL}/api/user/${userType}/auth/edit/email`,
    { email: profileData.email },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log("Email update response:", emailResponse);

  console.log("Updating contact...");
  const contactResponse = await axios.put<{ data: void }>(
    `${baseURL}/api/user/${userType}/auth/edit/contact`,
    { contact: profileData.contact },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log("Contact update response:", contactResponse);

  console.log("User profile updated successfully");
};
