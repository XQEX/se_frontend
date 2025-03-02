// components/JobCard.tsx
import React, { useEffect, useState } from "react";
import { FaStar, FaArrowRight, FaMapPin, FaClock } from "react-icons/fa";
import { TbCurrencyBaht } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";

type JobCardProps = {
  id: string | number;
  title: string;
  workDays?: string;
  workHours?: string;
  location?: string;
  salary: number | string;
  currentUserID: string;
};

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

const matchWithHiringPost = async (postId: string): Promise<MatchResponse> => {
  try {
    console.log("Attempting to match with hiring post:", { postId });
    const { data } = await axios.post<{ data: MatchResponse }>(
      `http://localhost:6977/api/matching/hiring/${postId}/match`,
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

const getMatchesForHiringPost = async (
  postId: string
): Promise<GetMatchesResponse> => {
  try {
    console.log("Fetching matches for hiring post:", { postId });
    const { data } = await axios.get<GetMatchesResponse>(
      `http://localhost:6977/api/matching/hiring/${postId}/match`,
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

function JobCard({
  id,
  title,
  workDays,
  workHours,
  location,
  salary,
  currentUserID,
}: JobCardProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchedPost = await getMatchesForHiringPost(String(id));
        console.log("Matches for hiring post:", matchedPost);

        const isCurrentUserFav = matchedPost.data.some((match) =>
          match.toMatchSeekers.some(
            (seeker) => seeker.jobSeekerId === currentUserID
          )
        );
        setIsFav(isCurrentUserFav);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, [id, currentUserID]);

  const formatSalary = () => {
    if (typeof salary === "number") {
      return salary.toLocaleString("th-TH");
    }
    if (!isNaN(Number(salary))) {
      return Number(salary).toLocaleString("th-TH");
    }
    return salary;
  };

  const handleMatch = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await matchWithHiringPost(String(id));
      console.log("Match response:", response);
      setIsFav(!isFav);
      // Handle the response as needed
    } catch (error) {
      console.error("Error matching with hiring post:", error);
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

      <Link to={`/jobseeker/details/${String(id)}`} className="block space-y-4">
        <div className="pr-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
            {title || "ไม่ระบุชื่องาน"}
          </h2>
        </div>

        <div className="flex flex-col space-y-1 text-gray-600">
          <div className="flex items-center">
            <TbCurrencyBaht size={16} className="mr-1.5 text-seagreen" />
            <span>
              {typeof salary === "string" && salary.startsWith("฿")
                ? salary
                : `฿${formatSalary()}`}
            </span>
          </div>

          <div className="flex items-center">
            <FaMapPin size={16} className="mr-1.5 text-seagreen" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center">
            <FaClock size={16} className="mr-1.5 text-seagreen" />
            <div className="flex flex-col sm:flex-row sm:gap-1 line-clamp-1">
              <span>{workDays}</span>
              {workDays && workHours && (
                <span className="hidden sm:inline">|</span>
              )}
              <span>{workHours}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
            <span>รายละเอียด</span>
            <FaArrowRight
              size={16}
              className="ml-1.5 transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default JobCard;
