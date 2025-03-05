import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { NewNav } from "../../components/NewNav";
import { FaBuilding, FaClock, FaStar, FaArrowLeft } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import Footer from "../../components/Footer";
import { Avatar } from "@mantine/core";
import { getJobFindingPostById } from "../../api/JobSeeker";
import { useUser } from "../../context/UserContext";

type Job = {
  id: string;
  title: string;
  username: string | null;
  location: string;
  workHours: string;
  salary: string;
  description: string;
  requirements: string;
  workDays: string;
  postedAt: string;
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

function JobDetailEmp() {
  const {
    user,
    isLoading,
    refetchjobseeker,
    refetchemployer,
    refetchCompany,
    isStale,
    setUser,
    queryClient,
  } = useUser();
  const [isHaveUser, setIsHaveUser] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);

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

  useEffect(() => {
    refetchjobseeker();
    refetchemployer();
    refetchCompany();
    setIsHaveUser(!!user);
    console.log(job);

    const fetchMatches = async () => {
      if (!id) {
        console.warn("No job ID available");
        return;
      }

      try {
        console.log("Fetching matches for finding post:", { id });
        const data = await getUserMatchingStatus();

        if (!data) {
          console.warn("No finding matches found.");
          setIsFav(false);
          return;
        }

        console.log("User matching status retrieved successfully:", data);
        console.log("Current job ID:", id);
        console.log("All matches:", data);

        const isCurrentUserFav = data.some((match) => {
          const matchId = match.jobFindingPostId;
          console.log("Comparing match ID:", matchId, "with job ID:", id);
          return matchId === String(id);
        });

        console.log("Is favorite?", isCurrentUserFav);
        setIsFav(isCurrentUserFav);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setIsFav(false);
      }
    };

    if (user && id) {
      fetchMatches();
    }
  }, [user, id, isLoading, isStale]);

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

  useEffect(() => {
    console.log("🔎 กำลังโหลดข้อมูลงาน...");
    console.log("📌 Job ID จาก URL:", id);

    const fetchJobDetails = async () => {
      try {
        const response = await getJobFindingPostById(id as string);
        const jobData = response.data; // Correctly access the job data

        console.log("✅ งานที่พบ:", response);
        if (!jobData) {
          throw new Error("Job data is undefined");
        }

        const job: Job = {
          id: jobData.id,
          title: jobData.title,
          username: jobData.jobSeekerId || jobData.oauthJobSeekerId, // Assuming username is jobSeekerId
          location: jobData.jobLocation,
          workHours: jobData.workHoursRange,
          salary: jobData.expectedSalary.toString(),
          description: jobData.description,
          requirements: jobData.skills.map((skill) => skill.name).join(", "),
          workDays: jobData.workDates,
          postedAt: jobData.createdAt,
        };
        setJob(job);
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // ✅ ป้องกันหน้าค้างกรณี job โหลดไม่ทัน
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <h2 className="text-gray-600 text-lg">⏳ กำลังโหลดข้อมูลงาน...</h2>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 font-kanit">
        <h2 className="text-lg font-semibold text-red-500">❌ ไม่พบงานนี้</h2>
        <button
          className="mt-4 px-5 py-2 bg-seagreen text-white rounded-lg shadow-md hover:bg-[#246e4a] transition text-sm"
          onClick={() => navigate(-1)}
        >
          กลับไปหน้าหลัก
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-kanit">
      <NewNav
        user={user}
        isLoading={isLoading}
        isHaveUser={isHaveUser}
        refetchjobseeker={refetchjobseeker}
        refetchemployer={refetchemployer}
        refetchCompany={refetchCompany}
        isStale={isStale}
        setUser={setUser}
        userType={user?.type}
        queryClient={queryClient}
      />

      {/* Main Content */}
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden relative">
          {/* 🔙 ปุ่มย้อนกลับ */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 left-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2 transition"
          >
            <FaArrowLeft className="h-4 w-4" />
          </button>

          {/* username Header */}
          <div className="p-6 border-b border-gray-200 text-center">
            <Avatar size="lg" radius="md" className="mx-auto mb-3" />
            <h1 className="text-xl font-semibold text-gray-800">
              {job.username || "ไม่ระบุบริษัท"}
            </h1>
            <h3 className="text-lg font-medium text-gray-700">{job.title}</h3>
          </div>

          {/* Job Details */}
          <div className="p-5 space-y-4">
            {/* Info Grid */}
            <div className="grid gap-3 sm:grid-cols-2 text-gray-700 text-sm">
              <p className="flex items-center">
                <FaBuilding className="mr-2 text-seagreen h-4 w-4" />{" "}
                {job.location}
              </p>
              <p className="flex items-center">
                <FaClock className="mr-2 text-seagreen h-4 w-4" />{" "}
                {job.workHours} ({job.workDays})
              </p>
              <p className="flex items-center">
                <CiMoneyBill className="mr-2 text-seagreen h-5 w-5" /> ฿
                {parseFloat(job.salary).toLocaleString()} บาท
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* <Link
                to="/reserved"
                className="bg-seagreen hover:bg-seagreen-dark text-white px-6 py-2 rounded-md text-sm text-center transition shadow-sm"
              >
                สมัครงานตอนนี้
              </Link> */}

              <button
                onClick={handleMatch}
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 
                         px-4 py-2 rounded-md border border-gray-200 transition-colors text-sm"
              >
                <FaStar
                  size={20}
                  className={`transition-colors ${
                    isFav
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 group-hover:text-gray-400"
                  }`}
                />
                <span>สนใจ</span>
              </button>
            </div>

            {/* Job Description */}
            <div className="space-y-3 pt-5">
              <section>
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  ประสบการณ์
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </section>

              <section>
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  คุณสมบัติที่มี
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {job.requirements}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default JobDetailEmp;
