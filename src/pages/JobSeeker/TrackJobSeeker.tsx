"use client";

import { useState, useEffect, useRef } from "react";
import { NewNav } from "../../components/NewNav";
import Lottie from "lottie-react";
import Animation from "../../Animation/Job2.json";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { getUserMatchingStatus } from "../../api/Matching";
import {
  FaBuilding,
  FaSearch,
  FaTrash,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdPendingActions, MdOutlineSchedule, MdDoneAll } from "react-icons/md";

interface JobApplication {
  id: number;
  companyName: string;
  status: string;
  date: string;
}

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
      oauthEmployerId: string;
      companyId: string;
      createdAt: string;
      approvedAt: string;
      updatedAt: string;
    }[];
  };
  status: number;
}

function TrackJobSeeker() {
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 1,
      companyName: "บริษัท A",
      status: "กำลังยื่นคำขอ",
      date: "2025-01-14",
    },
    {
      id: 2,
      companyName: "บริษัท B",
      status: "รอสัมภาษณ์",
      date: "2025-02-01",
    },
    {
      id: 3,
      companyName: "บริษัท C",
      status: "ยืนยันการรับสมัคร",
      date: "2025-02-10",
    },
    {
      id: 4,
      companyName: "บริษัท D",
      status: "กำลังยื่นคำขอ",
      date: "2025-02-15",
    },
    {
      id: 5,
      companyName: "บริษัท E",
      status: "รอสัมภาษณ์",
      date: "2025-02-20",
    },
    {
      id: 6,
      companyName: "บริษัท F",
      status: "ยืนยันการรับสมัคร",
      date: "2025-02-25",
    },
    {
      id: 7,
      companyName: "บริษัท G",
      status: "กำลังยื่นคำขอ",
      date: "2025-03-01",
    },
    {
      id: 8,
      companyName: "บริษัท H",
      status: "รอสัมภาษณ์",
      date: "2025-03-05",
    },
    {
      id: 9,
      companyName: "บริษัท I",
      status: "ยืนยันการรับสมัคร",
      date: "2025-03-10",
    },
    {
      id: 10,
      companyName: "บริษัท J",
      status: "กำลังยื่นคำขอ",
      date: "2025-03-15",
    },
  ]);

  const headingRef = useRef(null);
  const tableRef = useRef(null);
  const lottieRef = useRef(null);

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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the current applications to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = applications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Pagination function
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const [matchingStatus, setMatchingStatus] =
    useState<UserMatchingStatusResponse | null>(null);

  useEffect(() => {
    const fetchMatchingStatus = async () => {
      try {
        const status = await getUserMatchingStatus();
        setMatchingStatus(status);
      } catch (error) {
        console.error("Error fetching matching status:", error);
      }
    };

    fetchMatchingStatus();
  }, []);

  useEffect(() => {
    refetchjobseeker();
    refetchCompany();
    refetchemployer();
    setIsHaveUser(!!user);
  }, [user, isLoading, isStale]);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2.5, ease: "power2.out" }
    );
    gsap.fromTo(
      tableRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 2.5, ease: "power2.out" }
    );
    gsap.fromTo(
      lottieRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2.5, ease: "power2.out" }
    );
  }, []);

  function handleDelete(id: number): void {
    setApplications((prevApplications) =>
      prevApplications.filter((app) => app.id !== id)
    );
  }

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "กำลังยื่นคำขอ":
        return <MdPendingActions className="text-yellow-500 inline mr-2" />;
      case "รอสัมภาษณ์":
        return <MdOutlineSchedule className="text-blue-500 inline mr-2" />;
      case "ยืนยันการรับสมัคร":
        return <MdDoneAll className="text-green-600 inline mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-green-50 min-h-screen">
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

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center kanit-regular">
          {/* Left Content */}
          <div className="w-full lg:w-2/3 space-y-8">
            <div ref={headingRef} className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-700 mb-2">
                ข้อมูลการสมัครงานทั้งหมดของคุณ
              </h1>
              <p className="text-emerald-600 text-lg">
                ติดตามความคืบหน้าในการสมัครงานของคุณได้ที่นี่
              </p>
            </div>

            {/* Applications Table */}
            <div ref={tableRef} className="w-full">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-emerald-700 text-white">
                        <th className="py-3 px-4 text-left">
                          <div className="flex items-center">
                            <FaBuilding className="mr-2" />
                            ชื่อบริษัท
                          </div>
                        </th>
                        <th className="py-3 px-4 text-left">สถานะการสมัคร</th>
                        <th className="py-3 px-4 text-left">วันเวลา</th>
                        <th className="py-3 px-4 text-center">รายละเอียด</th>
                        <th className="py-3 px-4 text-center">ดำเนินการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentApplications.map((app, index) => (
                        <tr
                          key={app.id}
                          className={`border-b border-gray-200 hover:bg-emerald-50 transition-colors ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="py-3 px-4 font-medium">
                            {app.companyName}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                                app.status === "กำลังยื่นคำขอ"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : app.status === "รอสัมภาษณ์"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {getStatusIcon(app.status)}
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {app.date}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Link
                              to={`/trackJobseeker/${app.id}`}
                              className="inline-flex items-center justify-center p-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                              title="ดูรายละเอียด"
                            >
                              <FaInfoCircle />
                              <span className="sr-only">รายละเอียด</span>
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="inline-flex items-center justify-center p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                              title="ลบรายการ"
                            >
                              <FaTrash />
                              <span className="sr-only">ลบ</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    แสดง{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    ถึง{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, applications.length)}
                    </span>{" "}
                    จากทั้งหมด{" "}
                    <span className="font-medium">{applications.length}</span>{" "}
                    รายการ
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() =>
                        currentPage > 1 && paginate(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-3 py-2 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-emerald-50"
                      } border border-gray-300`}
                    >
                      <FaChevronLeft className="h-4 w-4" />
                    </button>
                    {pageNumbers.map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === number
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50"
                        } rounded-md`}
                      >
                        {number}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        currentPage < totalPages && paginate(currentPage + 1)
                      }
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-3 py-2 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-emerald-50"
                      } border border-gray-300`}
                    >
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Matching Status Section - Collapsible */}
            {matchingStatus && (
              <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                    <h2 className="text-xl font-bold text-emerald-700 flex items-center">
                      <MdOutlineSchedule className="mr-2" />
                      สถานะการจับคู่
                    </h2>
                    <span className="transition group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-3 group-open:animate-fadeIn">
                    <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                      {JSON.stringify(matchingStatus, null, 2)}
                    </pre>
                  </div>
                </details>
              </div>
            )}

            {/* Find More Jobs Section */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaSearch className="mr-2" />
                ค้นหางานเพิ่มเติม
              </h2>
              <p className="mb-6">
                ค้นหาโอกาสใหม่ๆ ที่เหมาะกับคุณและเริ่มต้นเส้นทางอาชีพที่ดีกว่า
              </p>
              <div className="flex justify-center">
                <Link
                  to="/find"
                  className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 font-semibold rounded-lg shadow-md hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300"
                >
                  <FaSearch className="mr-2" />
                  ไปยังหน้าค้นหางาน
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content - Animation */}
          <div ref={lottieRef} className="w-full lg:w-1/3 flex justify-center">
            <div className="max-w-md">
              <Lottie animationData={Animation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackJobSeeker;
