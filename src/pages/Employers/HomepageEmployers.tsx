import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import "./HomepageEmployers.css";

interface Job {
  id: number;
  title: string;
  location: string;
  description: string;
  requirements: string;
  postedAt: string;
}

const HomepageEmployers: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  const handleViewDetails = (job: Job) => {
    navigate(`/viewpost/${job.id}`, { state: { job } });
  };

  const handlePostJob = () => {
    navigate("/postjobemp");
  };

  const handleTrackApplications = () => {
    navigate("/trackemp");
  };

  const handleSearchCandidates = () => {
    navigate("/findemp");
  };

  const handleDeleteJob = (id: number) => {
    setJobs((prevJobs) => {
      const updatedJobs = prevJobs.filter((job) => job.id !== id);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      return updatedJobs;
    });
  };

  return (
    <div>
      <NavbarEmp />
      <div className="container">
        {/* ส่วนแสดงภาพรวม (Overview Section) */}
        <div className="overview-cards">
          <div className="card">
            <h3>งานที่โพสต์</h3>
            <p>{jobs.length}</p>
          </div>
          <div className="card">
            <h3>ผู้สมัคร</h3>
            <p>1,209,321</p>
          </div>
          <div className="card">
            <h3>การแจ้งเตือนใหม่</h3>
            <p>999+</p>
          </div>
        </div>

        {/* ส่วนปุ่มลัด (Quick Actions Section) */}
        <div className="quick-actions">
          <h1 className="section-title">ตัวเลือกด่วน</h1>
          <div className="quick-buttons">
            <button className="action-button" onClick={handlePostJob}>
              โพสต์งานใหม่
            </button>
            <button className="action-button" onClick={handleSearchCandidates}>
              ค้นหาผู้สมัครงาน
            </button>
            <button className="action-button" onClick={handleTrackApplications}>
              ติดตามสถานะใบสมัคร
            </button>
          </div>
        </div>

        {/* แสดงรายการงานที่โพสต์ (Recent Jobs Section) */}
        <div className="recent-jobs">
          <h1 className="section-title">งานที่โพสต์ล่าสุด</h1>

          {jobs.length === 0 ? (
            <div className="empty-job-card">
              <h3>ยังไม่มีงานที่โพสต์</h3>
              <p>เริ่มต้นโดยการโพสต์งานเพื่อดึงดูดผู้สมัคร!</p>
              <button className="action-button highlight" onClick={handlePostJob}>
                   โพสต์งานใหม่
              </button>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="job-card">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteJob(job.id)}
                >
                  &times;
                </button>
                <h3>{job.title}</h3>
                <p>สถานที่: {job.location}</p>
                <p style={{ fontSize: "0.9rem", color: "gray" }}>
                  โพสต์เมื่อ: {job.postedAt || "ไม่ระบุวันที่"}
                </p>
                <div className="job-actions">
                  <button
                    className="action-button"
                    onClick={() => handleViewDetails(job)}
                  >
                    ดูรายละเอียด
                  </button>
                  <button className="action-button">แก้ไข</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomepageEmployers;
