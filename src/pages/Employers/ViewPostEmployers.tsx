import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import "./ViewPostEmployers.css";

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

  // ดึงข้อมูลจาก Local Storage หรือจาก state ที่ถูกส่งมาผ่าน navigate()
  const job: Job | undefined =
    location.state?.job || JSON.parse(localStorage.getItem("jobs") || "[]").find((job: Job) => job.id.toString() === id);

  if (!job) {
    return (
      <div>
        <NavbarEmp />
        <div className="view-post-container text-center">
          <h1 className="job-not-found">ไม่พบข้อมูลงาน</h1>
          <button className="back-button" onClick={() => navigate("/homeemp")}>
            กลับไปหน้าหลัก
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavbarEmp />
      <div className="view-post-container">
        <h1 className="page-title">รายละเอียดงาน</h1>
        <div className="job-post-details">
          <h2 className="job-title">{job.title}</h2>
          <p><strong>สถานที่:</strong> {job.location}</p>
          <p><strong>เงินเดือน:</strong> {job.salary.toLocaleString()} บาท</p>
          <p><strong>วันทำงาน:</strong> {job.workDays}</p>
          <p><strong>ช่วงเวลาทำงาน:</strong> {job.workHours}</p>
          <p><strong>รายละเอียด:</strong> {job.description}</p>
          <p><strong>คุณสมบัติที่ต้องการ:</strong> {job.requirements}</p>
          <p><strong>โพสต์เมื่อ:</strong> {job.postedAt || "ไม่ระบุวันที่"}</p>
        </div>
        <button className="back-button" onClick={() => navigate("/homeemp")}>
          กลับไปหน้าหลัก
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ViewPostEmployers;
