import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { NavbarEmp } from "../../components/NavbarEmp";
import Footer from "../../components/Footer";

interface Job {
  id: number;
  title: string;
  location: string;
  salary: number;
  workDays: string;
  workHours: string;
  description: string;
  requirements: string;
  postedAt: string;
}

const ViewPostEmployers: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const job: Job | undefined =
    location.state?.job ||
    JSON.parse(localStorage.getItem("jobs_emp") || "[]").find(
      (job: Job) => job.id.toString() === id
    );

<<<<<<< HEAD
=======
  console.log("Job ID from URL:", id);
  console.log("Loaded job from state:", location.state?.job);
  console.log(
    "Loaded job from localStorage:",
    JSON.parse(localStorage.getItem("jobs_emp") || "[]")
  );

>>>>>>> db1c654b9a7999083726195ece9ccb9893d0ce7e
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-kanit">
        <NavbarEmp />
        <h1 className="text-2xl font-bold text-red-500">❌ ไม่พบข้อมูลงาน</h1>
        <button 
          className="mt-6 px-6 py-2 bg-seagreen text-white rounded-md shadow-sm hover:bg-[#246e4a] transition text-base"
          onClick={() => navigate("/homeemp")}
        >
          🔙 กลับไปหน้าหลัก
        </button>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-kanit">
      <NavbarEmp />
<<<<<<< HEAD

      <div className="max-w-1/2 mx-auto p-4 px-8 bg-white shadow-sm rounded-lg mt-6">

        <h1 className="text-xl font-bold text-center text-gray-800 mb-4">📌 รายละเอียดงาน</h1>

        <div className="bg-gray-50 p-4 rounded-md shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-gray-900">{job.title}</h2>
          
          <p className="text-gray-700 text-base"><strong>📍 สถานที่:</strong> {job.location}</p>
          <p className="text-gray-700 text-base"><strong>💰 เงินเดือน:</strong> ฿{job.salary.toLocaleString()} บาท</p>
          <p className="text-gray-700 text-base"><strong>📅 วันทำงาน:</strong> {job.workDays}</p>
          <p className="text-gray-700 text-base"><strong>⏰ ช่วงเวลาทำงาน:</strong> {job.workHours}</p>
          <p className="text-gray-700 text-base"><strong>📝 รายละเอียด:</strong> {job.description}</p>
          <p className="text-gray-700 text-base"><strong>✅ คุณสมบัติที่ต้องการ:</strong> {job.requirements}</p>
          <p className="text-gray-700 text-base"><strong>📆 โพสต์เมื่อ:</strong> {job.postedAt || "ไม่ระบุวันที่"}</p>
        </div>

        <div className="flex justify-center mt-6">
          <button 
            className="px-5 py-2 bg-seagreen/80 text-white rounded-md shadow-sm hover:bg-seagreen transition text-base"
            onClick={() => navigate("/homeemp")}
          >
             กลับไปหน้าหลัก
          </button>
=======
      <div className="view-post-container">
        <h1 className="page-title">รายละเอียดงาน</h1>
        <div className="job-post-details">
          <h2 className="job-title">{job.title}</h2>
          <p>
            <strong>สถานที่:</strong> {job.location}
          </p>
          <p>
            <strong>เงินเดือน:</strong> {job.salary.toLocaleString()} บาท
          </p>
          <p>
            <strong>วันทำงาน:</strong> {job.workDays}
          </p>
          <p>
            <strong>ช่วงเวลาทำงาน:</strong> {job.workHours}
          </p>
          <p>
            <strong>รายละเอียด:</strong> {job.description}
          </p>
          <p>
            <strong>คุณสมบัติที่ต้องการ:</strong> {job.requirements}
          </p>
          <p>
            <strong>โพสต์เมื่อ:</strong> {job.postedAt || "ไม่ระบุวันที่"}
          </p>
>>>>>>> db1c654b9a7999083726195ece9ccb9893d0ce7e
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ViewPostEmployers;
