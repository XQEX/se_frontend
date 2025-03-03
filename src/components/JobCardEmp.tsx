import React, { useEffect, useState } from "react";
import { FaStar, FaArrowRight, FaMapPin, FaClock } from "react-icons/fa";
import { TbCurrencyBaht } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";

type JobCardEmpProps = {
  id: string | number;
  title: string;
  workDays?: string;
  workHours?: string;
  location: string;
  salary: number;
  jobCategories?: {
    id: string;
    name: string;
    description: string;
  }[];
  currentUserID: string;
};
interface UserMatchingStatusResponse {
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
      };
    }[];
  };
  status: number;
}
interface MatchResponse {
  success: boolean;
  msg: string;
  data?: {
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
  };
  status: number;
}
interface DeleteMatchResponse {
  success: boolean;
  msg: string;
  status: number;
}
const getUserMatchingStatus = async (): Promise<
  UserMatchingStatusResponse["data"]["findingMatches"]
> => {
  try {
    console.log("Fetching user matching status");
    const { data } = await axios.get<UserMatchingStatusResponse>(
      `http://localhost:6977/api/matching/user/tracking`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(
      "User matching status retrieved successfully:",
      data.data.findingMatches
    );
    // Extract and log the toPost data
    const toPostData = data.data.findingMatches.map((match) => match.toPost);
    console.log("toPost data:", toPostData);
    return data.data.findingMatches;
  } catch (error) {
    console.error("Failed to fetch user matching status:", error);
    throw error;
  }
};

const createFindingPostMatch = async (
  postId: string
): Promise<MatchResponse> => {
  try {
    console.log("Creating match for finding post:", { postId });
    const { data } = await axios.post<MatchResponse>(
      `http://localhost:6977/api/matching/finding/${postId}/match`,
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log("Finding post match created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating finding post match:", error);
    throw error;
  }
};

const deleteMatchFindingPost: (
  matchId: string
) => Promise<DeleteMatchResponse> = async (matchId: string) => {
  try {
    console.log("Deleting match for finding post:", { matchId });
    const { data } = await axios.delete<DeleteMatchResponse>(
      `http://localhost:6977/api/matching/finding/match/${matchId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("Match deleted successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to delete match for finding post:", error);
    throw error;
  }
};

function JobCardEmp({
  id,
  title,
  workDays,
  workHours,
  location,
  salary,
  currentUserID,
}: // jobCategories,
JobCardEmpProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        console.log("Fetching matches for finding post:", { id });
        const data = await getUserMatchingStatus();

        if (!data) {
          console.warn("No finding matches found.");
          setIsFav(false);
          return;
        }

        console.log("User matching status retrieved successfully:", data);

        const isCurrentUserFav = data.some(
          (match) => match.jobFindingPostId === String(id)
        );

        setIsFav(isCurrentUserFav);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, [id, currentUserID]);

  const handleMatch = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isFav) {
        console.log("Unmatching... Fetching matches first.");
        const matches = await getUserMatchingStatus();
        if (!matches?.length) {
          console.warn("No finding matches found.");
          return;
        }

        const matchToDelete = matches.find(
          (match) => match.jobFindingPostId === String(id)
        );

        if (!matchToDelete) {
          console.warn("No matching post found for current user");
          return;
        }

        console.log("Match found. Deleting match ID:", matchToDelete.id);
        await deleteMatchFindingPost(matchToDelete.id);
        setIsFav(false);
      } else {
        console.log("Matching... Creating new match.");
        const response = await createFindingPostMatch(String(id));
        if (response.success) setIsFav(true);
      }
    } catch (error) {
      console.error("Error handling match:", error);
    }
  };

  return (
    <div className="kanit-regular group relative bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 w-full">
      <button
        onClick={handleMatch}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-50 transition-colors"
      >
        <FaStar
          size={20}
          className={`transition-colors ${
            isFav
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 group-hover:text-gray-400"
          }`}
        />
      </button>

      <Link to={`/employer/details/${id}`} className="block space-y-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
          {title}
        </h2>

        <div className="flex flex-col space-y-1 text-gray-600">
          <div className="flex items-center">
            <TbCurrencyBaht className="text-seagreen mr-1.5" />
            <span>฿{salary.toLocaleString()}</span>
          </div>

          <div className="flex items-center">
            <FaMapPin className="text-seagreen mr-1.5" />
            <span>{location}</span>
          </div>

          {/* {jobCategories && (
            <div className="flex items-center">
              <FaTags className="text-seagreen mr-1.5" />
              <span className="line-clamp-1">
                {jobCategories.map(cat => cat.name).join(', ')}
              </span>
            </div>
          )} */}

          <div className="flex items-center">
            <FaClock className="text-seagreen mr-1.5" />
            <span className="line-clamp-1">
              {workDays} | {workHours}
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center text-emerald-600 group-hover:text-emerald-700">
          <span>รายละเอียด</span>
          <FaArrowRight className="ml-1.5 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  );
}

export default JobCardEmp;
