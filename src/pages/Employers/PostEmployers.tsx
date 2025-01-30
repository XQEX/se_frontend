import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarEmp } from "../../components/NavbarEmp";
import Footer from "../../components/Footer";

const PostJobEmp: React.FC = () => {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  const [workDays, setWorkDays] = useState("จันทร์ - ศุกร์");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("15:00");
  const [successMessage, setSuccessMessage] = useState("");

<<<<<<< HEAD
  const workDayOptions = ["จันทร์ - ศุกร์", "จันทร์ - เสาร์", "จันทร์ - อาทิตย์", "เสาร์ - อาทิตย์", "อื่นๆ"];
=======
  // ตัวเลือกวันทำงาน
  const workDayOptions = [
    "จันทร์ - ศุกร์",
    "จันทร์ - เสาร์",
    "จันทร์ - อาทิตย์",
    "เสาร์ - อาทิตย์",
    "อื่นๆ",
  ];
>>>>>>> db1c654b9a7999083726195ece9ccb9893d0ce7e

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (const minute of [0, 30]) {
<<<<<<< HEAD
        times.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
=======
        const time = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        times.push(time);
>>>>>>> db1c654b9a7999083726195ece9ccb9893d0ce7e
      }
    }
    return times;
  };

  const validateInputs = () => {
    if (!jobTitle.trim() || !location.trim() || !jobDescription.trim() || !requirements.trim() || !salary.trim()) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบทุกช่อง!");
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
      postedAt: new Date().toLocaleString("th-TH", { dateStyle: "full", timeStyle: "short" }),
    };

<<<<<<< HEAD
    const existingJobsEmp = JSON.parse(localStorage.getItem("jobs_emp") || "[]");
=======
    // ✅ บันทึกงานของ Employer ลง `jobs_emp` (HomePageEmp.tsx ใช้)
    const existingJobsEmp = JSON.parse(
      localStorage.getItem("jobs_emp") || "[]"
    );
>>>>>>> db1c654b9a7999083726195ece9ccb9893d0ce7e
    const updatedJobsEmp = [newJob, ...existingJobsEmp];
    localStorage.setItem("jobs_emp", JSON.stringify(updatedJobsEmp));

    setSuccessMessage("🎉 ประกาศงานสำเร็จแล้ว!");
    setTimeout(() => navigate("/homeemp"), 300);
  };

  return (
    <div className="min-h-screen flex flex-col justify-start bg-gray-50 font-kanit">
      <NavbarEmp />
<<<<<<< HEAD
  
      {/* ทำให้ container อยู่ชิดด้านบน */}
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg w-full mt-5 pt-0">
        <h1 className="text-2xl font-bold text-center text-gray-800 mt-5">โพสต์งาน</h1>
  
        {successMessage && <p className="text-green-600 font-kanit text-center">{successMessage}</p>}
  
        <form className="space-y-3">
          {[  
            { label: "ชื่อตำแหน่งงาน", value: jobTitle, setValue: setJobTitle, placeholder: "เช่น Developer, Designer" },
            { label: "สถานที่ทำงาน", value: location, setValue: setLocation, placeholder: "เช่น กรุงเทพฯ, ทำงานทางไกล" },
            { label: "เงินเดือน (บาท)", value: salary, setValue: setSalary, placeholder: "เช่น 30000", type: "number", step: "1000" },
          ].map(({ label, value, setValue, placeholder, type = "text", step }) => (
            <div key={label} className="flex flex-col w-4/5 mx-auto">
              <label className="font-kanit text-gray-700">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                step={step}
                className="border border-gray-300 p-2 rounded-md text-sm"
              />
            </div>
          ))}
  
          <div className="flex flex-col w-4/5 mx-auto">
            <label className="font-kanit text-gray-700">วันทำงาน</label>
            <select value={workDays} onChange={(e) => setWorkDays(e.target.value)} className="border border-gray-300 p-2 rounded-md text-sm">
=======
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
>>>>>>> db1c654b9a7999083726195ece9ccb9893d0ce7e
              {workDayOptions.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
  
          {/* Time Picker */}
          <div className="grid grid-cols-2 gap-3 w-4/5 mx-auto">
            <div className="flex flex-col">
              <label className="font-kanit text-gray-700">เวลาเริ่มงาน</label>
              <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border border-gray-300 p-2 rounded-md text-sm w-20">
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
  
            <div className="flex flex-col">
              <label className="font-kanit text-gray-700">เวลาเลิกงาน</label>
              <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className="border border-gray-300 p-2 rounded-md text-sm w-20">
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
  
          {[  
            { label: "รายละเอียดงาน", value: jobDescription, setValue: setJobDescription },
            { label: "คุณสมบัติที่ต้องการ", value: requirements, setValue: setRequirements },
          ].map(({ label, value, setValue }) => (
            <div key={label} className="flex flex-col w-4/5 mx-auto">
              <label className="font-kanit text-gray-700">{label}</label>
              <textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder={`เพิ่ม${label.toLowerCase()}`} className="border border-gray-300 p-2 rounded-md h-12 text-sm" />
            </div>
          ))}
  
          {/* ปุ่มโพสต์งาน */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handlePostJob}
              className="w-64 bg-seagreen/80 hover:bg-seagreen text-white py-2 px-4 rounded-lg font-kanit transition text-base text-center"
            >
              โพสต์งาน
            </button>
          </div>
        </form>
      </div>
  
      <Footer />
    </div>
  );
  
};

export default PostJobEmp;
