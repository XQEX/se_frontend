import axios from "axios";
import { backendPort } from "./globalvariable";

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
interface Notification {
  id: string;
  status: "READ" | "UNREAD";
  title: string;
  description: string;
  userType: string;
  jobSeekerId?: string;
  oauthJobSeekerId?: string;
  employerId?: string;
  oauthEmployerId?: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

interface NotificationResponse {
  success: boolean;
  data: Notification[];
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
      `http://localhost:${backendPort}/api/post/job-posts`,
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
      `http://localhost:${backendPort}/api/post/job-posts/${id}`,
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
      `http://localhost:${backendPort}/api/post/job-posts/${id}`,
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
      `http://localhost:${backendPort}/api/post/job-posts/${id}`,
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

export const fetchNotifications = async (
  status: "all" | "READ" | "UNREAD" = "all"
): Promise<Notification[]> => {
  try {
    console.log("Fetching notifications with status:", status);
    const { data } = await axios.get<NotificationResponse>(
      `http://localhost:${backendPort}/api/notification`,
      {
        params: { status },
        withCredentials: true,
      }
    );
    console.log("Notifications fetched successfully:", data);
    return data.data;
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (
  id: string
): Promise<Notification> => {
  try {
    console.log("Marking notification as read with ID:", id);
    const { data } = await axios.post<{ data: Notification }>(
      `http://localhost:${backendPort}/api/notification/${id}/read`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Notification marked as read successfully:", data);
    return data.data;
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    throw error;
  }
};

export const markAllNotificationsAsRead = async (): Promise<Notification[]> => {
  try {
    console.log("Marking all notifications as read...");
    const { data } = await axios.post<{ data: Notification[] }>(
      `http://localhost:${backendPort}/api/notification/mark-all-read`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("All notifications marked as read successfully:", data);
    return data.data;
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error);
    throw error;
  }
};
