import axios from "axios";
import { backendPort } from "./globalvariable";

interface MatchResponse {
  success: boolean;
  msg: string;
  data?: {
    jobSeekerType: string;
    jobSeekerId: string;
    oauthJobSeekerId: string;
    jobHiringPostMatchedId: string;
    status: string;
    createdAt: string;
    approvedAt: string;
    updatedAt: string;
  };
  status: number;
}
interface GetMatchesResponse {
  success: boolean;
  msg: string;
  data: {
    id: string;
    jobHiringPostId: string;
    toMatchSeekers: {
      jobSeekerType: string;
      jobSeekerId: string;
      oauthJobSeekerId: string;
      jobHiringPostMatchedId: string;
      status: string;
      createdAt: string;
      approvedAt: string;
      updatedAt: string;
    }[];
    createdAt: string;
    updatedAt: string;
  }[];
  status: number;
}
interface UpdateMatchStatusResponse {
  success: boolean;
  msg: string;
  data?: {
    jobSeekerType: string;
    jobSeekerId: string;
    oauthJobSeekerId: string;
    jobHiringPostMatchedId: string;
    status: string;
    createdAt: string;
    approvedAt: string;
    updatedAt: string;
  };
  status: number;
}
interface UpdateFindingMatchStatusResponse {
  success: boolean;
  msg: string;
  data?: {
    id: string;
    jobFindingPostId: string;
    status: string;
    jobHirerType: string;
    employerId: string;
    oauthEmployerId: string;
    companyId: string;
    createdAt: string;
    approvedAt: string;
    updatedAt: string;
  };
  status: number;
}
interface CreateFindingPostMatchResponse {
  success: boolean;
  msg: string;
  data?: {
    id: string;
    jobFindingPostId: string;
    status: string;
    jobHirerType: string;
    employerId: string;
    oauthEmployerId: string;
    companyId: string;
    createdAt: string;
    approvedAt: string;
    updatedAt: string;
  };
  status: number;
}
interface GetFindingPostMatchResponse {
  success: boolean;
  msg: string;
  data: {
    id: string;
    jobFindingPostId: string;
    status: string;
    jobHirerType: string;
    employerId: string;
    oauthEmployerId: string;
    companyId: string;
    createdAt: string;
    approvedAt: string;
    updatedAt: string;
  };
  status: number;
}
interface UserMatchingStatusResponse {
  success: boolean;
  msg: string;
  data: {
    hiringMatches: {
      id: string;
      title: string;
      description: string;
      jobLocation: string;
      salary: number; // เปลี่ยนเป็น number
      workDates: string;
      workHoursRange: string;
      status: string;
      hiredAmount: number;
      jobPostType: string;
      jobHirerType: string;
      employerId: string;
      createdAt: string;
      updatedAt: string;
      postMatched: {
        id: string;
        jobHiringPostId: string;
        createdAt: string;
        updatedAt: string;
        toMatchSeekers: {
          jobSeekerType: string;
          jobSeekerId: string;
          oauthJobSeekerId: string | null;
          jobHiringPostMatchedId: string;
          status: string;
          createdAt: string;
          approvedAt: string | null;
          updatedAt: string;
          userData: {
            id: string;
            username: string;
            password?: string;
            firstName: string;
            lastName: string;
            email: string;
            profilePicture: string;
            aboutMe: string;
            contact: string;
            resume: string;
            provinceAddress: string | null;
            address: string;
            approvalStatus: string;
            createdAt: string;
            updatedAt: string;
            providerId?: string;
            provider?: string;
          };
        }[];
      }[];
    }[];
    findingMatches: {
      id: string;
      jobFindingPostId: string;
      status: string;
      jobHirerType: string;
      employerId: string;
      oauthEmployerId: string | null;
      companyId: string | null;
      createdAt: string;
      approvedAt: string | null;
      updatedAt: string;
      toPost: {
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
        postByNormal: {
          id: string;
          username: string;
          password?: string;
          firstName: string;
          lastName: string;
          email: string;
          profilePicture: string;
          aboutMe: string;
          contact: string;
          resume: string;
          provinceAddress: string | null;
          address: string;
          approvalStatus: string;
          createdAt: string;
          updatedAt: string;
        } | null;
        postByOauth: {
          id: string;
          providerId: string;
          username: string;
          firstName: string;
          lastName: string;
          email: string;
          profilePicture: string;
          aboutMe: string;
          contact: string;
          resume: string;
          provider: string;
          provinceAddress: string | null;
          address: string;
          approvalStatus: string;
          createdAt: string;
          updatedAt: string;
        } | null;
        userData: {
          id: string;
          username: string;
          password?: string;
          firstName: string;
          lastName: string;
          email: string;
          profilePicture: string;
          aboutMe: string;
          contact: string;
          resume: string;
          provinceAddress: string | null;
          address: string;
          approvalStatus: string;
          createdAt: string;
          updatedAt: string;
        };
      };
    }[];
  };
}
interface AdminMatchingStatusResponse {
  success: boolean;
  msg: string;
  data: {
    hiringMatches: {
      id: string;
      jobHiringPostId: string;
      toMatchSeekers: {
        jobSeekerType: string;
        jobSeekerId: string;
        oauthJobSeekerId: string;
        jobHiringPostMatchedId: string;
        status: string;
        createdAt: string;
        approvedAt: string;
        updatedAt: string;
      }[];
    }[];
    findingMatches: {
      id: string;
      jobFindingPostId: string;
      status: string;
      jobHirerType: string;
      employerId: string;
      oauthEmployerId: string;
      companyId: string;
      createdAt: string;
      approvedAt: string;
      updatedAt: string;
    }[];
  };
  status: number;
}

export const matchWithHiringPost = async (
  postId: string
): Promise<MatchResponse> => {
  try {
    console.log("Attempting to match with hiring post:", { postId });
    const { data } = await axios.post<{ data: MatchResponse }>(
      `http://localhost:${backendPort}/api/matching/hiring/${postId}/match`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Match successful:", data);
    return data.data;
  } catch (error) {
    console.error("Failed to match with hiring post:", error);
    throw error;
  }
};

export const getMatchesForHiringPost = async (
  postId: string
): Promise<GetMatchesResponse> => {
  try {
    console.log("Fetching matches for hiring post:", { postId });
    const { data } = await axios.get<GetMatchesResponse>(
      `http://localhost:${backendPort}/api/matching/hiring/${postId}/match`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Matches retrieved successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch matches for hiring post:", error);
    throw error;
  }
};
export const updateMatchStatus = async (
  matchId: string,
  status: string,
  seekerId: string
): Promise<UpdateMatchStatusResponse> => {
  try {
    console.log("Updating match status:", { matchId, status, seekerId });
    const { data } = await axios.put<{ data: UpdateMatchStatusResponse }>(
      `http://localhost:${backendPort}/api/matching/hiring/match/${matchId}/status`,
      { status, seekerId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Match status updated successfully:", data);
    return data.data;
  } catch (error) {
    console.error("Failed to update match status:", error);
    throw error;
  }
};
export const createFindingPostMatch = async (
  postId: string,
  matchData: {
    jobHirerType: string;
    employerId: string;
    oauthEmployerId: string;
    companyId: string;
  }
): Promise<CreateFindingPostMatchResponse> => {
  try {
    console.log("Creating match for finding post:", { postId, matchData });
    const { data } = await axios.post<{ data: CreateFindingPostMatchResponse }>(
      `http://localhost:${backendPort}/api/matching/finding/${postId}/match`,
      matchData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Finding post match created successfully:", data);
    return data.data;
  } catch (error) {
    console.error("Failed to create match for finding post:", error);
    throw error;
  }
};
export const getFindingPostMatch = async (
  postId: string
): Promise<GetFindingPostMatchResponse> => {
  try {
    console.log("Fetching match for finding post:", { postId });
    const { data } = await axios.get<GetFindingPostMatchResponse>(
      `http://localhost:${backendPort}/api/matching/finding/${postId}/match`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Match retrieved successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch match for finding post:", error);
    throw error;
  }
};
export const updateFindingMatchStatus = async (
  matchId: string,
  status: string,
  seekerId: string
): Promise<UpdateFindingMatchStatusResponse> => {
  try {
    console.log("Updating finding match status:", { matchId, status });
    const { data } = await axios.put<{
      data: UpdateFindingMatchStatusResponse;
    }>(
      `http://localhost:${backendPort}/api/matching/finding/match/${matchId}/status`,
      { status, seekerId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Finding match status updated successfully:", data);
    return data.data;
  } catch (error) {
    console.error("Failed to update finding match status:", error);
    throw error;
  }
};
export const getUserMatchingStatus =
  async (): Promise<UserMatchingStatusResponse> => {
    try {
      console.log("Fetching user matching status");
      const { data } = await axios.get<UserMatchingStatusResponse>(
        `http://localhost:${backendPort}/api/matching/user/tracking`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("User matching status retrieved successfully:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch user matching status:", error);
      throw error;
    }
  };
export const getAdminMatchingStatus =
  async (): Promise<AdminMatchingStatusResponse> => {
    try {
      console.log("Fetching all matching statuses for admin");
      const { data } = await axios.get<AdminMatchingStatusResponse>(
        `http://localhost:${backendPort}/api/matching/admin/tracking`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("All matching statuses retrieved successfully:", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch all matching statuses for admin:", error);
      throw error;
    }
  };
