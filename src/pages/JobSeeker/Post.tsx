import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
import Footer from "../../components/Footer";

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
        }),
      };

      const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      const updatedJobs = [newJob, ...existingJobs];
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));

      setSuccessMessage("🎉 การโพสต์หางานสำเร็จแล้ว!");

      setTimeout(() => {
        navigate("/homeemp", { state: { newJob } });
      }, 1000);
    } else {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบทุกช่องก่อนโพสต์!");
    }
  };

  return (
    <div>
      <NavbarEmp />
      <div className="post-job-container">
        <h1>โพสต์หางาน</h1>
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        <form className="post-job-form">
          <div className="form-group">
            <label>ตำแหน่งงานที่ต้องการ</label>
            <input
              type="text"
              className="input-field"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="กรอกตำแหน่งงานที่ต้องการ"
            />
          </div>
          <div className="form-group">
            <label>สถานที่ทำงานที่ต้องการ</label>
            <input
              type="text"
              className="input-field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="กรอกสถานที่ทำงานที่ต้องการ"
            />
          </div>
          <div className="form-group">
            <label>รายละเอียดเกี่ยวกับคุณ</label>
            <textarea
              className="input-field"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="กรอกรายละเอียดเกี่ยวกับคุณ"
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>เงินเดือนที่คาดหวัง</label>
            <textarea
              className="input-field"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="กรอกเงินเดือนที่คาดหวัง"
              rows={4}
            />
          </div>
          <button
            type="button"
            className="submit-button"
            onClick={handlePostJob}
          >
            ยืนยันการโพสต์หางาน
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostJob;
