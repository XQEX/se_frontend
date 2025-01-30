import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarEmp } from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import "./PostEmployers.css";

const PostJobEmp: React.FC = () => {
  const navigate = useNavigate();

  // State สำหรับข้อมูลฟอร์ม
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  const [workDays, setWorkDays] = useState("จันทร์ - ศุกร์");
  const [startTime, setStartTime] = useState("09:00"); // ตั้งค่าเริ่มต้น 09:00
  const [endTime, setEndTime] = useState("18:00"); // ตั้งค่าเริ่มต้น 18:00
  const [successMessage, setSuccessMessage] = useState("");

  // ตัวเลือกวันทำงาน
  const workDayOptions = [
    "จันทร์ - ศุกร์",
    "จันทร์ - เสาร์",
    "จันทร์ - อาทิตย์",
    "เสาร์ - อาทิตย์",
    "อื่นๆ",
  ];

  // สร้างรายการเวลา (00:00 - 23:30 ทุก 30 นาที)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (const minute of [0, 30]) {
        const time = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        times.push(time);
      }
    }
    return times;
  };

  // ตรวจสอบข้อมูลก่อนบันทึก
  const validateInputs = () => {
    if (
      !jobTitle.trim() ||
      !location.trim() ||
      !jobDescription.trim() ||
      !requirements.trim() ||
      !salary.trim()
    ) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบทุกช่องก่อนโพสต์งาน!");
      return false;
    }

    if (isNaN(Number(salary)) || Number(salary) <= 0) {
      alert("⚠️ กรุณากรอกเงินเดือนเป็นตัวเลขที่มากกว่า 0!");
      return false;
    }

    if (startTime >= endTime) {
      alert("⚠️ เวลาเริ่มงานต้องน้อยกว่าเวลาเลิกงาน!");
      return false;
    }

    return true;
  };

  const handlePostJob = () => {
    if (!validateInputs()) return;

    const newJob = {
      id: Date.now().toString(),
      title: jobTitle,
      location,
      description: jobDescription,
      requirements,
      salary,
      workDays,
      workHours: `${startTime} - ${endTime}`,
      postedAt: new Date().toLocaleString("th-TH", {
        dateStyle: "full",
        timeStyle: "short",
      }),
    };

    // ✅ บันทึกงานของ Employer ลง `jobs_emp` (HomePageEmp.tsx ใช้)
    const existingJobsEmp = JSON.parse(
      localStorage.getItem("jobs_emp") || "[]"
    );
    const updatedJobsEmp = [newJob, ...existingJobsEmp];
    localStorage.setItem("jobs_emp", JSON.stringify(updatedJobsEmp));

    // ✅ แสดงข้อความสำเร็จและนำทางไป `HomePageEmp.tsx`
    setSuccessMessage("🎉 ประกาศงานสำเร็จแล้ว!");
    setTimeout(() => navigate("/homeemp"), 500);
  };

  return (
    <div>
      <NavbarEmp isLoggedIn={false} />
      <div className="post-job-container">
        <h1>โพสต์งาน</h1>

        {/* ข้อความแจ้งเตือน */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form className="post-job-form">
          {/* ชื่อตำแหน่งงาน */}
          <div className="form-group">
            <label>ชื่อตำแหน่งงาน</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value.trim())}
              placeholder="เช่น Developer, Designer"
            />
          </div>

          {/* สถานที่ทำงาน */}
          <div className="form-group">
            <label>สถานที่ทำงาน</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value.trim())}
              placeholder="เช่น กรุงเทพฯ, ทำงานทางไกล"
            />
          </div>

          {/* เงินเดือน */}
          <div className="form-group">
            <label>เงินเดือน (บาท)</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="เช่น 30000"
              min="1"
              step="1000"
            />
          </div>

          {/* วันทำงาน */}
          <div className="form-group">
            <label>วันทำงาน</label>
            <select
              value={workDays}
              onChange={(e) => setWorkDays(e.target.value)}
              className="form-select time-select"
            >
              {workDayOptions.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* เวลาเริ่มงาน */}
          <div className="form-group">
            <label>เวลาเริ่มงาน</label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="form-select time-select"
            >
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* เวลาเลิกงาน */}
          <div className="form-group">
            <label>เวลาเลิกงาน</label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="form-select time-select"
            >
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* รายละเอียดงาน */}
          <div className="form-group">
            <label>รายละเอียดงาน</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value.trim())}
              placeholder="อธิบายลักษณะงาน"
              rows={3}
            />
          </div>

          {/* คุณสมบัติที่ต้องการ */}
          <div className="form-group">
            <label>คุณสมบัติที่ต้องการ</label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value.trim())}
              placeholder="ระบุคุณสมบัติผู้สมัคร"
              rows={3}
            />
          </div>

          {/* ปุ่มโพสต์งาน */}
          <button
            type="button"
            onClick={handlePostJob}
            className="submit-button"
          >
            โพสต์งาน
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostJobEmp;
