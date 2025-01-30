import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarEmp } from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import { FaArrowLeft } from "react-icons/fa";

interface Application {
  id: number;
  applicantName: string;
  jobTitle: string;
  status: string;
}

// ✅ ฟังก์ชันแปลงสถานะเป็นภาษาไทย + จัดสี
const translateStatus = (status: string) => {
<<<<<<< HEAD
  const statusMap: Record<string, { text: string; color: string }> = {
    "Under Review": { text: "กำลังตรวจสอบ", color: "text-yellow-500" },
    "Shortlisted": { text: "ผ่านการคัดเลือก", color: "text-green-500" },
    "Rejected": { text: "ไม่ผ่านการคัดเลือก", color: "text-red-500" },
    "Hired": { text: "ได้รับการจ้างงาน", color: "text-blue-500" },
=======
  const statusMap: Record<string, string> = {
    "Under Review": "กำลังตรวจสอบ",
    Shortlisted: "ผ่านการคัดเลือก",
    Rejected: "ไม่ผ่านการคัดเลือก",
    Hired: "ได้รับการจ้างงาน",
>>>>>>> db1c654b9a7999083726195ece9ccb9893d0ce7e
  };
  return statusMap[status] || { text: status, color: "text-gray-700" };
};

const TrackEmployers: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([
<<<<<<< HEAD
    { id: 1, applicantName: "John Doe", jobTitle: "นักพัฒนา Frontend", status: "Under Review" },
    { id: 2, applicantName: "Jane Smith", jobTitle: "นักพัฒนา Backend", status: "Shortlisted" },
    { id: 3, applicantName: "Alice Johnson", jobTitle: "นักออกแบบ UI/UX", status: "Rejected" },
    { id: 4, applicantName: "Bob Brown", jobTitle: "นักวิทยาศาสตร์ข้อมูล", status: "Hired" },
    { id: 5, applicantName: "Charlie Green", jobTitle: "นักพัฒนา Mobile", status: "Under Review" },
    { id: 6, applicantName: "Diana White", jobTitle: "วิศวกร DevOps", status: "Shortlisted" },
=======
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
    {
      id: 7,
      applicantName: "Edward Black",
      jobTitle: "ผู้จัดการผลิตภัณฑ์",
      status: "Rejected",
    },
    {
      id: 8,
      applicantName: "Fiona Blue",
      jobTitle: "วิศวกรคลาวด์",
      status: "Under Review",
    },
    {
      id: 9,
      applicantName: "George Yellow",
      jobTitle: "วิศวกร Machine Learning",
      status: "Shortlisted",
    },
    {
      id: 10,
      applicantName: "Hannah Gray",
      jobTitle: "ผู้เชี่ยวชาญด้านความปลอดภัยไซเบอร์",
      status: "Hired",
    },
>>>>>>> db1c654b9a7999083726195ece9ccb9893d0ce7e
  ]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-kanit">
      {/* Navbar */}
      <NavbarEmp />

<<<<<<< HEAD
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg relative">
        {/* 🔙 ปุ่มย้อนกลับ */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-800 hover:text-gray-600 transition"
        >
          <FaArrowLeft size={24} />
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">ติดตามใบสมัคร</h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-md bg-gray-50">
            <thead>
              <tr className="bg-seagreen/80 text-white text-lg">
                <th className="p-4">#</th>
                <th className="p-4 text-left">ชื่อผู้สมัคร</th>
                <th className="p-4 text-left">ตำแหน่งงาน</th>
                <th className="p-4 text-left">สถานะ</th>
=======
      <div className="track-container">
        <h1>ติดตามใบสมัคร</h1>
        <table className="applications-table">
          <thead>
            <tr>
              <th>#</th>
              <th>ชื่อผู้สมัคร</th>
              <th>ตำแหน่งงาน</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr
                key={application.id}
                onClick={() => handleViewDetails(application.id)}
                className={application.id <= 3 ? "clickable-row" : ""}
              >
                <td>{index + 1}</td>
                <td>{application.applicantName}</td>
                <td>{application.jobTitle}</td>
                <td
                  className={`status ${application.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {translateStatus(application.status)}{" "}
                  {/* ✅ แสดงสถานะเป็นภาษาไทย */}
                </td>
>>>>>>> db1c654b9a7999083726195ece9ccb9893d0ce7e
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => {
                const { text, color } = translateStatus(application.status);
                return (
                  <tr
                    key={application.id}
                    className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer transition"
                    onClick={() => navigate(`/track/${application.id}`)}
                  >
                    <td className="p-4 text-center">{index + 1}</td>
                    <td className="p-4 text-left">{application.applicantName}</td>
                    <td className="p-4 text-left">{application.jobTitle}</td>
                    <td className={`p-4 text-left font-semibold ${color}`}>{text}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TrackEmployers;
