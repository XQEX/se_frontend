"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewNav } from "../../components/NewNav";
import Footer from "../../components/Footer";
import {
  FaArrowLeft,
  FaUser,
  FaBriefcase,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaUserCheck,
} from "react-icons/fa";
import { useUser } from "../../context/UserContext";

interface Application {
  id: number;
  applicantName: string;
  jobTitle: string;
  status: string;
}

// ✅ ฟังก์ชันแปลงสถานะเป็นภาษาไทย + จัดสี
const translateStatus = (status: string) => {
  const statusMap: Record<
    string,
    { text: string; color: string; bgColor: string; icon: React.ReactNode }
  > = {
    "Under Review": {
      text: "กำลังตรวจสอบ",
      color: "text-amber-700",
      bgColor: "bg-amber-100",
      icon: <FaHourglassHalf className="inline mr-1.5" />,
    },
    Shortlisted: {
      text: "ผ่านการคัดเลือก",
      color: "text-emerald-700",
      bgColor: "bg-emerald-100",
      icon: <FaCheckCircle className="inline mr-1.5" />,
    },
    Rejected: {
      text: "ไม่ผ่านการคัดเลือก",
      color: "text-rose-700",
      bgColor: "bg-rose-100",
      icon: <FaTimesCircle className="inline mr-1.5" />,
    },
    Hired: {
      text: "ได้รับการจ้างงาน",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
      icon: <FaUserCheck className="inline mr-1.5" />,
    },
  };
  return (
    statusMap[status] || {
      text: status,
      color: "text-gray-700",
      bgColor: "bg-gray-100",
      icon: null,
    }
  );
};

const TrackEmployers: React.FC = () => {
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
  useEffect(() => {
    refetchjobseeker();
    refetchemployer();
    refetchCompany();
    setIsHaveUser(!!user);
  }, [user, isLoading, isStale]);
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      applicantName: "John Doe",
      jobTitle: "นักพัฒนา Frontend",
      status: "Under Review",
    },
    {
      id: 2,
      applicantName: "Jane Smith",
      jobTitle: "นักพัฒนา Backend",
      status: "Shortlisted",
    },
    {
      id: 3,
      applicantName: "Alice Johnson",
      jobTitle: "นักออกแบบ UI/UX",
      status: "Rejected",
    },
    {
      id: 4,
      applicantName: "Bob Brown",
      jobTitle: "นักวิทยาศาสตร์ข้อมูล",
      status: "Hired",
    },
    {
      id: 5,
      applicantName: "Charlie Green",
      jobTitle: "นักพัฒนา Mobile",
      status: "Under Review",
    },
    {
      id: 6,
      applicantName: "Diana White",
      jobTitle: "วิศวกร DevOps",
      status: "Shortlisted",
    },
  ]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-kanit">
      {/* NewNav */}
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

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-seagreen"
              aria-label="Go back"
            >
              <FaArrowLeft className="text-gray-700" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 kanit-regular">
              ติดตามใบสมัคร
            </h1>
          </div>

          {/* Main content card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            {/* Table header */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-seagreen/90 to-seagreen/70 text-white text-sm kanit-light">
                    <th className="py-4 px-6 text-center w-16">#</th>
                    <th className="py-4 px-6 text-left">
                      <div className="flex items-center">
                        <FaUser className="mr-2" />
                        <span>ชื่อผู้สมัคร</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <div className="flex items-center">
                        <FaBriefcase className="mr-2" />
                        <span>ตำแหน่งงาน</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application, index) => {
                    const { text, color, bgColor, icon } = translateStatus(
                      application.status
                    );
                    return (
                      <tr
                        key={application.id}
                        className="cursor-pointer pointer-events-auto border-b  last:border-b-0 bg-gray-100 hover:bg-gray-200 transition-colors duration-150 kanit-regular"
                        onClick={() => navigate(`/track/${application.id}`)}
                      >
                        <td className="py-4 px-6 text-center font-medium text-gray-700">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          {application.applicantName}
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          {application.jobTitle}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color} ${bgColor}`}
                          >
                            {icon}
                            {text}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {applications.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-md mt-6">
              <div className="text-gray-500 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                ไม่พบข้อมูลใบสมัคร
              </h3>
              <p className="mt-1 text-gray-500">ยังไม่มีใบสมัครที่ต้องติดตาม</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackEmployers;
