import React, { useEffect, useState } from "react";
import { FaStar, FaArrowRight, FaMapPin, FaClock } from "react-icons/fa";
import { TbCurrencyBaht } from "react-icons/tb";
import { Link } from "react-router-dom";

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

const createFindingPostMatch = async (
  postId: string
): Promise<CreateFindingPostMatchResponse> => {
  try {
    console.log("Creating match for finding post:", { postId });
    const { data } = await axios.post<{ data: CreateFindingPostMatchResponse }>(
      `http://localhost:6977/api/matching/finding/${postId}/match`,

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
        const matchedPost = await getMatchesForHiringPost(String(id));

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

  const handleMatch = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await createFindingPostMatch(String(id));
      console.log("Match response:", response);
      setIsFav(!isFav);
      // Handle the response as needed
    } catch (error) {
      console.error("Error matching with hiring post:", error);
    }
  };

  return (
    <div className="kanit-relative bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 w-full">
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
