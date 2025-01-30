import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
import { FaBuilding, FaClock, FaStar, FaArrowLeft } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import Footer from "../../components/Footer";
import { Avatar } from "@mantine/core";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  workHours: string;
  salary: string;
  description: string;
  requirements: string;
  workDays: string;
  postedAt: string;
};

function JobDetailEmp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isStarred, setIsStarred] = useState(false);
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs_seek") || "[]");
    const foundJob = jobs.find((job: Job) => job.id === id);
    setJob(foundJob);
  }, [id]);

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <h2 className="text-gray-600 text-xl font-medium">ไม่พบงานนี้</h2>
      </div>
    );
  }

  const toggleStar = () => setIsStarred((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavbarEmp />

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden relative">
          
          {/* 🔙 ปุ่มย้อนกลับ */}
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-4 left-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 transition"
          >
            <FaArrowLeft className="h-5 w-5" />
          </button>

          {/* Company Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col items-center space-y-4">
              {/* ✅ ใช้ Mantine Avatar */}
              <Avatar size="2xl" radius="md" />

              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 kanit-regular">
                  {job.company}
                </h1>
                <h3 className="text-4xl kanit-regular font-semibold text-gray-900 mb-3">
                  {job.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-8 space-y-6">
            {/* Info Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-3 text-gray-700">
                <FaBuilding className="flex-shrink-0 text-seagreen h-5 w-5" />
                <span className="text-2xl kanit-regular">{job.location}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-gray-700">
                <FaClock className="flex-shrink-0 text-seagreen h-5 w-5" />
                <span className="text-2xl kanit-regular">
                  {job.workHours} ({job.workDays})
                </span>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <CiMoneyBill className="flex-shrink-0 text-seagreen h-6 w-6" />
                <span className="text-2xl kanit-regular">
                  ฿{parseFloat(job.salary).toLocaleString()} บาท
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/reserved"
                className="bg-seagreen hover:bg-seagreen-dark text-white px-8 py-3 rounded-lg kanit-regular 
                         text-center transition-colors shadow-sm"
              >
                สมัครงานตอนนี้
              </Link>
              <button 
                onClick={toggleStar}
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 
                         px-4 py-3 rounded-lg border border-gray-200 transition-colors"
              >
                <FaStar className={`h-5 w-5 ${isStarred ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                <span className="kanit-regular">บันทึกงาน</span>
              </button>
            </div>

            {/* Job Description */}
            <div className="space-y-6 pt-8">
              <section>
                <h3 className="text-xl font-semibold text-gray-900 kanit-regular mb-3">
                  รายละเอียดงาน
                </h3>
                <p className="text-gray-700 leading-relaxed kanit-regular whitespace-pre-line">
                  {job.description}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 kanit-regular mb-3">
                  คุณสมบัติที่ต้องการ
                </h3>
                <p className="text-gray-700 leading-relaxed kanit-regular whitespace-pre-line">
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
