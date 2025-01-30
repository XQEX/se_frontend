import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
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

interface Job {
  id: number;
  title: string;
  location: string;
  description: string;
  requirements: string;
  salary: string;
  workDays: string;
  workHours: string;
  postedAt: string;
}

const HomepageEmployers: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs_emp");
    if (storedJobs) setJobs(JSON.parse(storedJobs));
  }, []);

  const handleDeleteJob = (id: number) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobs_emp", JSON.stringify(updatedJobs));
  };
  return (
    <div className="min-h-screen bg-white">
      <NavbarEmp />

      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Sidebar (Quick Actions) */}
        <div className="bg-[#f9f9f9] p-10 rounded-2xl shadow-lg border border-gray-300 lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">ตัวเลือกด่วน</h2>
          <div className="space-y-6">
            <button
              className="flex items-center justify-center w-full bg-[#2e8b57] hover:bg-[#246e4a] text-white px-8 py-4 text-lg rounded-2xl shadow-md transition transform hover:scale-105"
              onClick={() => navigate("/postjobemp")}
            >
              <FaPlus className="mr-3" size={20} /> โพสต์งานใหม่
            </button>
            <button
              className="flex items-center justify-center w-full bg-[#2e8b57] hover:bg-[#246e4a] text-white px-8 py-4 text-lg rounded-2xl shadow-md transition transform hover:scale-105"
              onClick={() => navigate("/findemp")}
            >
              <FaSearch className="mr-3" size={20} /> ค้นหาผู้สมัคร
            </button>
            <button
              className="flex items-center justify-center w-full bg-[#2e8b57] hover:bg-[#246e4a] text-white px-8 py-4 text-lg rounded-2xl shadow-md transition transform hover:scale-105"
              onClick={() => navigate("/trackemp")}
            >
              <FaEye className="mr-3" size={20} /> ติดตามสถานะใบสมัคร
            </button>
          </div>
        </div>

        {/* Right Content (Job Stats and Recent Jobs) */}
        <div className="lg:col-span-2 space-y-10">
          {/* Job Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { label: "งานที่โพสต์", value: jobs.length, icon: <FaClipboardList size={40} className="text-[#2e8b57]" /> },
              { label: "ผู้สมัคร", value: "1,209,321", icon: <FaUserPlus size={40} className="text-[#2e8b57]" /> },
              { label: "การแจ้งเตือนใหม่", value: "999+", icon: <FaClock size={40} className="text-[#2e8b57]" /> },
            ].map(({ label, value, icon }, index) => (
              <div
                key={index}
                className="bg-[#f9f9f9] p-8 rounded-2xl shadow-lg border border-gray-300 flex flex-col items-center transform hover:scale-105 transition"
              >
                {icon}
                <h3 className="text-xl font-semibold text-gray-700 mt-3">{label}</h3>
                <p className="text-3xl font-bold text-[#2e8b57]">{value}</p>
              </div>
            ))}
          </div>

          {/* Recent Jobs */}
          <div>
            <h1 className="text-2xl font-bold text-gray-700 mb-8 text-center">งานที่โพสต์ล่าสุด</h1>

            {jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-[#f9f9f9] p-16 rounded-2xl shadow-lg border border-gray-300 max-w-3xl mx-auto">
                <h3 className="text-3xl font-semibold text-gray-700 text-center">ยังไม่มีงานที่โพสต์</h3>
                <p className="text-gray-500 mt-4 text-lg text-center">เริ่มต้นโดยการโพสต์งานเพื่อดึงดูดผู้สมัคร!</p>
                <button
                  className="mt-6 bg-[#2e8b57] hover:bg-[#246e4a] text-white px-10 py-5 text-xl rounded-2xl shadow-md transition transform hover:scale-105"
                  onClick={() => navigate("/postjobemp")}
                >
                  + โพสต์งานใหม่
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-300 transform hover:scale-105 transition"
                  >
                    {/* Delete Button */}
                    <button
                      className="absolute top-6 right-6 text-black hover:text-gray-800"
                      onClick={() => handleDeleteJob(job.id)}
                    >
                      <FaTrash size={28} />
                    </button>

                    {/* Job Title */}
                    <h3 className="text-xl font-bold text-gray-700">{job.title}</h3>

                    {/* Job Info */}
                    <div className="mt-3 space-y-3 text-gray-600 text-lg">
                      <p className="flex items-center">
                        <FaMapMarkerAlt className="mr-3 text-[#2e8b57]" /> {job.location}
                      </p>
                      <p className="flex items-center">
                        <CiMoneyBill className="mr-3 text-[#2e8b57]" /> เงินเดือน: ฿{parseFloat(job.salary).toLocaleString()} บาท
                      </p>
                      <p className="flex items-center">
                        <FaClock className="mr-3 text-[#2e8b57]" /> เวลาทำงาน: {job.workDays} | {job.workHours}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-5 flex gap-5">
                    <button
                      onClick={() => navigate(`/employer/viewpost/${String(job.id)}`, { state: { job } })}

                      className="bg-[#2e8b57] hover:bg-[#246e4a] text-white px-4 py-2 rounded-lg shadow-md transition"
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
