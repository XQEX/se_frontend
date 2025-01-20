import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import "./PostEmployers.css";

const PostJob: React.FC = () => {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePostJob = () => {
    if (jobTitle && location && jobDescription && requirements) {
      const newJob = {
        id: Date.now(),
        title: jobTitle,
        location,
        description: jobDescription,
        requirements,
        postedAt: new Date().toLocaleString("th-TH", {
          dateStyle: "full",
          timeStyle: "short",
        }), // เพิ่มวันและเวลา
      };

      // บันทึกลง Local Storage
      const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      const updatedJobs = [newJob, ...existingJobs];
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));

      // แสดงข้อความแจ้งเตือน
      setSuccessMessage("🎉 ประกาศงานสำเร็จแล้ว!");

      // นำทางไปยังหน้าแรกของนายจ้าง พร้อมส่งข้อมูลไปด้วย
      setTimeout(() => {
        navigate("/homeemp", { state: { newJob } });
      }, 1000); // รอ 1 วินาทีให้ผู้ใช้เห็นข้อความสำเร็จ
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
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="กรอกชื่อตำแหน่งงาน"
            />
          </div>
          <div className="form-group">
            <label>สถานที่ทำงาน</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="กรอกสถานที่ทำงาน"
            />
          </div>
          <div className="form-group">
            <label>รายละเอียดงาน</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="กรอกรายละเอียดงาน"
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>คุณสมบัติที่ต้องการ</label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="กรอกคุณสมบัติที่ต้องการ"
              rows={4}
            />
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

export default PostJob;
