import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarEmp } from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import { useUser } from "../../context/UserContext";
import { createJobPostEmp } from "../../api/Employer";
import { createJobPostCom } from "../../api/Company";
import { MultiSelect } from "@mantine/core";
import { provinces } from "../../data/provinces";

const PostJobEmp: React.FC = () => {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");
  const [workDays, setWorkDays] = useState("จันทร์ - ศุกร์");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("15:00");
  const [successMessage, setSuccessMessage] = useState("");
  const [jobPostType, setJobPostType] = useState<
    "FULLTIME" | "PARTTIME" | "FREELANCE"
  >("FULLTIME");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const workDayOptions = [
    "จันทร์ - ศุกร์",
    "จันทร์ - เสาร์",
    "จันทร์ - อาทิตย์",
    "เสาร์ - อาทิตย์",
    "อื่นๆ",
  ];

  const jobPostTypeOptions = ["FULLTIME", "PARTTIME", "FREELANCE"];

  useEffect(() => {
    if (user) {
      console.log("User type:", user.type);
    }
  }, []);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (const minute of [0, 30]) {
        times.push(
          `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
        );
      }
    }
    return times;
  };

  const validateInputs = () => {
    if (
      !jobTitle.trim() ||
      location.length === 0 ||
      !jobDescription.trim() ||
      !requirements.trim() ||
      !salary.trim()
    ) {
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

  const handlePostJob = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    const newEmpJob = {
      title: jobTitle,
      description: jobDescription,
      jobLocation: location.join(", "),
      salary: Number(salary),
      workDates: workDays,
      workHoursRange: `${startTime} - ${endTime}`,
      requirements: requirements,
      jobPostType: jobPostType,
    };
    const newComJob = {
      title: jobTitle,
      description: jobDescription,
      jobLocation: location.join(", "),
      salary: Number(salary),
      workDates: workDays,
      workHoursRange: `${startTime} - ${endTime}`,
      requirements: requirements,
      skills: ["pingpong"],
      jobCategories: ["dev"],
    };

    try {
      if (user?.type === "EMPLOYER") {
        const response = await createJobPostEmp(newEmpJob);
        console.log("Job post response:", response.message);
        setSuccessMessage("🎉 ประกาศงานสำเร็จแล้ว!");
        navigate("/homeemp");
      }
      if (user?.type === "COMPANY") {
        const response = await createJobPostCom(newComJob);
        console.log("Job post response:", response.msg);
        setSuccessMessage("🎉 ประกาศงานสำเร็จแล้ว!");
        navigate("/homeemp");
      }
    } catch (error) {
      console.error("Failed to post job:", error);
      alert("⚠️ การโพสต์งานล้มเหลว กรุณาลองใหม่อีกครั้ง!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start bg-gray-50 font-kanit">
      <NavbarEmp />

      {/* ทำให้ container อยู่ชิดด้านบน */}
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg w-full mt-5 pt-0">
        <h1 className="text-2xl font-bold text-center text-gray-800 mt-5">
          โพสต์งาน
        </h1>

        {successMessage && (
          <p className="text-green-600 font-kanit text-center">
            {successMessage}
          </p>
        )}

        <form className="space-y-3">
          {[
            {
              label: "ชื่อตำแหน่งงาน",
              value: jobTitle,
              setValue: setJobTitle,
              placeholder: "เช่น Developer, Designer",
            },
            {
              label: "เงินเดือน (บาท)",
              value: salary,
              setValue: setSalary,
              placeholder: "เช่น 30000",
              type: "number",
              step: "1000",
            },
          ].map(
            ({ label, value, setValue, placeholder, type = "text", step, min }) => (
              <div key={label} className="flex flex-col w-4/5 mx-auto">
                <label className="font-kanit text-gray-700">{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  step={step}
                  min={min}
                  className="border border-gray-300 p-2 rounded-md text-sm"
                />
              </div>
            )
          )}

          <div className="flex flex-col w-4/5 mx-auto">
            <label className="font-kanit text-gray-700">จำนวนที่เปิดรับสมัคร</label>
            <input
              type="number"
              placeholder="..."
              className="border border-gray-300 p-2 rounded-md text-sm"
            />

          </div>

          <div className="flex flex-col w-4/5 mx-auto">
            <label className="font-kanit text-gray-700">สถานที่ทำงาน</label>
            <MultiSelect
              placeholder="เลือกจังหวัด"
              data={provinces}
              value={location}
              onChange={setLocation}
              clearable
              searchable
              className="font-kanit"
            />
          </div>

          <div className="flex flex-col w-4/5 mx-auto">
            <label className="font-kanit text-gray-700">ประเภทงาน</label>
            <select
              value={jobPostType}
              onChange={(e) =>
                setJobPostType(
                  e.target.value as "FULLTIME" | "PARTTIME" | "FREELANCE"
                )
              }
              className="border border-gray-300 p-2 rounded-md text-sm"
            >
              {jobPostTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col w-4/5 mx-auto">
            <label className="font-kanit text-gray-700">วันทำงาน</label>
            <select
              value={workDays}
              onChange={(e) => setWorkDays(e.target.value)}
              className="border border-gray-300 p-2 rounded-md text-sm"
            >
              {workDayOptions.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Time Picker */}
          <div className="grid grid-cols-2 gap-3 w-4/5 mx-auto">
            <div className="flex flex-col">
              <label className="font-kanit text-gray-700">เวลาเริ่มงาน</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 p-2 rounded-md text-sm w-20"
              >
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-kanit text-gray-700">เวลาเลิกงาน</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-300 p-2 rounded-md text-sm w-20"
              >
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {[
            {
              label: "รายละเอียดงาน",
              value: jobDescription,
              setValue: setJobDescription,
            },
            {
              label: "คุณสมบัติที่ต้องการ",
              value: requirements,
              setValue: setRequirements,
            },
          ].map(({ label, value, setValue }) => (
            <div key={label} className="flex flex-col w-4/5 mx-auto">
              <label className="font-kanit text-gray-700">{label}</label>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`เพิ่ม${label.toLowerCase()}`}
                className="border border-gray-300 p-2 rounded-md h-12 text-sm"
              />
            </div>
          ))}

          {/* ปุ่มโพสต์งาน */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handlePostJob}
              className="w-64 bg-seagreen/80 hover:bg-seagreen text-white py-2 px-4 rounded-lg font-kanit transition text-base text-center"
              disabled={loading}
            >
              {loading ? "กำลังโพสต์..." : "โพสต์งาน"}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default PostJobEmp;
