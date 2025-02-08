import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarEmp } from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import {
  FaMapMarkerAlt,
  FaClock,
  FaTrash,
  FaUserPlus,
  FaClipboardList,
  FaPlus,
  FaSearch,
  FaEye,
} from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import { useUser } from "../../context/UserContext";
import { getAllJobPosts, deleteJobPost } from "../../api/EmployerAndCompany";
import { getEmployerJobPosts } from "../../api/Employer";
import { getCompanyJobPosts } from "../../api/Company";

interface Job {
  id: string;
  title: string;
  jobLocation: string;
  description: string;
  salary: number;
  workDates: string;
  workHoursRange: string;
  hiredAmount: number;
  createdAt: string;
  userId: string; // Add userId to Job interface
}

const HomepageEmployers: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let response;
        if (user.type === "EMPLOYER") {
          response = await getEmployerJobPosts();
          console.log("Employer job posts:", response);
        } else if (user.type === "COMPANY") {
          response = await getCompanyJobPosts();
          console.log("Company job posts:", response);
        } else {
          throw new Error("Invalid user role");
        }

        const jobsData = response.data.jobPosts.map((jobPost: any) => ({
          id: jobPost.id,
          title: jobPost.title,
          jobLocation: jobPost.jobLocation,
          description: jobPost.description,
          salary: jobPost.salary,
          workDates: jobPost.workDates,
          workHoursRange: jobPost.workHoursRange,
          hiredAmount: jobPost.hiredAmount,
          createdAt: jobPost.createdAt,
          userId:
            jobPost.companyId || jobPost.employerId || jobPost.oauthEmployerId, // Add userId to Job data
        }));
        setJobs(jobsData);
      } catch (error) {
        console.error("Failed to fetch job posts:", error);
      }
    };

    fetchJobs();
  }, [user]);

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJobPost(id);
      const updatedJobs = jobs.filter((job) => job.id !== id);
      setJobs(updatedJobs);
    } catch (error) {
      console.error("Failed to delete job post:", error);
      alert("⚠️ การลบงานล้มเหลว กรุณาลองใหม่อีกครั้ง!");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavbarEmp />

      <div className="max-w-5xl xl:max-w-6xl mx-auto px-12 sm:px-16 lg:px-24 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Sidebar (Quick Actions) */}
        <div className="bg-[#f9f9f9] p-6 rounded-xl shadow-lg border border-gray-300 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-700 mb-5 text-center">
            ตัวเลือกด่วน
          </h2>
          <div className="space-y-4 mb-6 font-kanit">
            <button
              className="flex items-center justify-center w-full bg-seagreen/80 hover:bg-seagreen text-white px-6 py-3 text-base rounded-lg shadow-md transition font-kanit"
              onClick={() => navigate("/postjobemp")}
            >
              <FaPlus className="mr-2" size={16} /> โพสต์งานใหม่
            </button>
            <button
              className="flex items-center justify-center w-full bg-seagreen/80 hover:bg-seagreen text-white px-6 py-3 text-base rounded-lg shadow-md transition font-kanit "
              onClick={() => navigate("/findemp")}
            >
              <FaSearch className="mr-2" size={16} /> ค้นหาผู้สมัคร
            </button>
            <button
              className="flex items-center justify-center w-full bg-seagreen/80 hover:bg-seagreen text-white px-6 py-3 text-base rounded-lg shadow-md transition font-kanit"
              onClick={() => navigate("/trackemp")}
            >
              <FaEye className="mr-2" size={16} /> ติดตามการรับสมัคร
            </button>
          </div>
        </div>

        {/* Right Content (Job Stats and Recent Jobs) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                label: "งานที่โพสต์",
                value: jobs.length,
                icon: <FaClipboardList size={28} className="text-[#2e8b57]" />,
              },
              {
                label: "ผู้สมัคร",
                value: "1,209,321",
                icon: <FaUserPlus size={28} className="text-[#2e8b57]" />,
              },
              {
                label: "การแจ้งเตือนใหม่",
                value: "99+",
                icon: <FaClock size={28} className="text-[#2e8b57]" />,
              },
            ].map(({ label, value, icon }, index) => (
              <div
                key={index}
                className="bg-[#f9f9f9] p-5 rounded-xl shadow-md border border-gray-300 flex flex-col items-center transition hover:shadow-lg"
              >
                {icon}
                <h3 className="text-base font-semibold text-gray-700 mt-2">
                  {label}
                </h3>
                <p className="text-xl font-bold text-[#2e8b57]">{value}</p>
              </div>
            ))}
          </div>

          {/* Recent Jobs */}
          <div>
            <h1 className="text-lg font-semibold text-gray-700 mb-5 text-center">
              งานที่คุณโพสต์ล่าสุด
            </h1>

            {jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-[#f9f9f9] p-8 rounded-xl shadow-md border border-gray-300 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-gray-700 text-center">
                  ยังไม่มีงานที่โพสต์
                </h3>
                <p className="text-gray-500 mt-3 text-center">
                  เริ่มต้นโดยการโพสต์งานเพื่อดึงดูดผู้สมัคร!
                </p>
                <button
                  className="mt-5 bg-seagreen/80 hover:bg-seagreen text-white px-6 py-3 text-base rounded-lg shadow-md transition"
                  onClick={() => navigate("/postjobemp")}
                >
                  + โพสต์งานใหม่
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="relative bg-white p-5 rounded-xl shadow-md border border-gray-300 transition hover:shadow-lg"
                  >
                    {/* Delete Button */}
                    {user && job.userId === user.id && (
                      <button
                        className="absolute top-4 right-4 text-black hover:text-gray-800"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <FaTrash size={18} />
                      </button>
                    )}

                    {/* Job Title */}
                    <h3 className="text-base font-bold text-gray-700">
                      {job.title}
                    </h3>

                    {/* Job Info */}
                    <div className="mt-2 space-y-1 text-gray-600 text-sm">
                      <p className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-[#2e8b57]" />
                        สถานที่ตั้ง: {job.jobLocation}
                      </p>
                      <p className="flex items-center">
                        <CiMoneyBill className="mr-2 text-[#2e8b57]" />{" "}
                        เงินเดือน: {job.salary.toLocaleString()} บาท
                      </p>
                      <p className="flex items-center">
                        <FaClock className="mr-2 text-[#2e8b57]" /> เวลาทำงาน:{" "}
                        {job.workDates} | {job.workHoursRange}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-4">
                      <button
                        className="flex-1 bg-seagreen/80 hover:bg-seagreen text-white px-4 py-2 text-sm rounded-lg shadow-md transition"
                        onClick={() =>
                          navigate(`/employer/viewpost/${String(job.id)}`, {
                            state: { job },
                          })
                        }
                      >
                        ดูรายละเอียด
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomepageEmployers;
