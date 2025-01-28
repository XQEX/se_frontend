import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import "./PostEmployers.css";

const PostJobEmp: React.FC = () => {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState(""); // เงินเดือน
  const [workDates, setWorkDates] = useState(""); // วันทำงาน
  const [workHours, setWorkHours] = useState(""); // ช่วงเวลาทำงาน
  const [successMessage, setSuccessMessage] = useState("");

  const handlePostJob = () => {
    if (jobTitle && location && jobDescription && requirements && salary && workDates && workHours) {
      const newJob = {
        id: Date.now(),
        title: jobTitle,
        location,
        description: jobDescription,
        requirements,
        salary,
        workDates,
        workHours,
        postedAt: new Date().toLocaleString("th-TH", {
          dateStyle: "full",
          timeStyle: "short",
        }),
      };

      // บันทึกลง Local Storage
      const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      const updatedJobs = [newJob, ...existingJobs];
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));

      // แสดงข้อความแจ้งเตือน
      setSuccessMessage("🎉 ประกาศงานสำเร็จแล้ว!");

      // นำทางไปยังหน้าแรกของนายจ้าง
      setTimeout(() => {
        navigate("/homeemp", { state: { newJob } });
      }, 500);
    } else {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบทุกช่องก่อนโพสต์งาน!");
    }
  };

  return (
    <div>
      <NavbarEmp />
      <div className="post-job-container">
        <h1>โพสต์งาน</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="post-job-form">
          <div className="form-group">
            <label>ชื่อตำแหน่งงาน</label>
            <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="กรอกชื่อตำแหน่งงาน" />
          </div>
          <div className="form-group">
            <label>สถานที่ทำงาน</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="กรอกสถานที่ทำงาน" />
          </div>
          <div className="form-group">
            <label>เงินเดือน (บาท)</label>
            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="กรอกเงินเดือน" step="1000" />
          </div>
          <div className="form-group">
            <label>วันทำงาน</label>
            <input type="text" value={workDates} onChange={(e) => setWorkDates(e.target.value)} placeholder="เช่น จันทร์ - ศุกร์" />
          </div>
          <div className="form-group">
            <label>ช่วงเวลาทำงาน</label>
            <input type="text" value={workHours} onChange={(e) => setWorkHours(e.target.value)} placeholder="เช่น 09:00 - 18:00" />
          </div>
          <div className="form-group">
            <label>รายละเอียดงาน</label>
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="กรอกรายละเอียดงาน" rows={2} />
          </div>
          <div className="form-group">
            <label>คุณสมบัติที่ต้องการ</label>
            <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="กรอกคุณสมบัติที่ต้องการ" rows={2} />
          </div>
          <button type="button" onClick={handlePostJob} className="submit-button">
            โพสต์งาน
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostJobEmp;