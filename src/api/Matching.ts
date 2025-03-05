import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "./globalvariable";

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
    const response = await axios.post<MatchResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.MATCHING.HIRING.MATCH}/${postId}/match`,
      {},
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

export const getMatchesForHiringPost = async (
  postId: string
): Promise<GetMatchesResponse> => {
  try {
    const response = await axios.get<GetMatchesResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.MATCHING.HIRING.MATCH}/${postId}/match`,
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

export const updateMatchStatus = async (
  matchId: string,
  status: string,
  seekerId: string
): Promise<UpdateMatchStatusResponse> => {
  try {
    const response = await axios.put<UpdateMatchStatusResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.MATCHING.HIRING.MATCH}/match/${matchId}`,
      { status, seekerId },
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
    const response = await axios.post<CreateFindingPostMatchResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.MATCHING.FINDING.MATCH}/${postId}/match`,
      matchData,
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

export const getFindingPostMatch = async (
  postId: string
): Promise<GetFindingPostMatchResponse> => {
  try {
    const response = await axios.get<GetFindingPostMatchResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.MATCHING.FINDING.MATCH}/${postId}/match`,
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

export const updateFindingMatchStatus = async (
  matchId: string,
  status: string,
  seekerId: string
): Promise<UpdateFindingMatchStatusResponse> => {
  try {
    const response = await axios.put<UpdateFindingMatchStatusResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.MATCHING.FINDING.MATCH}/match/${matchId}`,
      { status, seekerId },
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

export const getUserMatchingStatus = async (): Promise<UserMatchingStatusResponse> => {
  try {
    const response = await axios.get<UserMatchingStatusResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.MATCHING.FINDING.TRACKING}`,
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

export const getAdminMatchingStatus = async (): Promise<AdminMatchingStatusResponse> => {
  try {
    const response = await axios.get<AdminMatchingStatusResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.MATCHING.FINDING.TRACKING}/admin`,
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
