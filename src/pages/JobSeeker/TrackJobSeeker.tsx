import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar"; // Navbar component
import Lottie from "lottie-react"; // Lottie animation
import Animation from "../../Animation/Job2.json"; // Lottie animation
import { gsap } from "gsap"; // For animations
import { Link } from "react-router-dom"; // For navigation

interface JobApplication {
  id: number;
  companyName: string;
  status: string;
  date: string;
}

function TrackJobSeeker() {
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 1,
      companyName: "บริษัท A",
      status: "กำลังยื่นคำขอ",
      date: "2025-01-14",
    },
  ]);

  const [newApplication, setNewApplication] = useState<JobApplication>({
    id: 0,
    companyName: "",
    status: "กำลังยื่นคำขอ",
    date: "",
  });

  const headingRef = useRef(null); // Ref for heading
  const tableRef = useRef(null); // Ref for table
  const lottieRef = useRef(null); // Ref for Lottie animation

  useEffect(() => {
    // Animate heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: "power2.out",
      }
    );

    // Animate table
    gsap.fromTo(
      tableRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 2.5,
        ease: "power2.out",
      }
    );

    // Animate Lottie
    gsap.fromTo(
      lottieRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2.5,
        ease: "power2.out",
      }
    );
  }, []);

  const addApplication = () => {
    if (!newApplication.companyName || !newApplication.date) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setApplications((prev) => [
      ...prev,
      { ...newApplication, id: prev.length + 1 },
    ]);
    setNewApplication({
      id: 0,
      companyName: "",
      status: "กำลังยื่นคำขอ",
      date: "",
    });
  };

  const updateApplication = (
    id: number,
    updatedApplication: Partial<JobApplication>
  ) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, ...updatedApplication } : app
      )
    );
  };

  const deleteApplication = (id: number) => {
    if (window.confirm("คุณแน่ใจว่าต้องการลบรายการนี้?")) {
      setApplications((prev) => prev.filter((app) => app.id !== id));
    }
  };

  const style = {
    height: "auto",
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row bg-white text-[#2e8b57] justify-center items-center p-4 md:p-8">
        {/* Text Section */}
        <div className="flex flex-col items-center md:items-start py-6 text-center md:text-left">
          {/* Animated Heading */}
          <div
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold mb-4 md:mb-6"
          >
            ข้อมูลการสมัครงานทั้งหมดของคุณ
          </div>

          {/* Animated Table */}
          <div ref={tableRef} className="w-full text-gray-600">
            <table
              border={1}
              className="w-full text-left mt-6 border-collapse border border-gray-300"
            >
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border border-gray-300">ID</th>
                  <th className="p-2 border border-gray-300">ชื่อบริษัท</th>
                  <th className="p-2 border border-gray-300">สถานะการสมัคร</th>
                  <th className="p-2 border border-gray-300">วันเวลา</th>
                  <th className="p-2 border border-gray-300">การกระทำ</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td className="p-2 border border-gray-300">{app.id}</td>
                    <td className="p-2 border border-gray-300">
                      {app.companyName}
                    </td>
                    <td className="p-2 border border-gray-300">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateApplication(app.id, { status: e.target.value })
                        }
                        className="border border-gray-300 p-1 rounded"
                      >
                        <option value="กำลังยื่นคำขอ">กำลังยื่นคำขอ</option>
                        <option value="รอสัมภาษณ์">รอสัมภาษณ์</option>
                        <option value="ยืนยันการรับสมัคร">
                          ยืนยันการรับสมัคร
                        </option>
                      </select>
                    </td>
                    <td className="p-2 border border-gray-300">{app.date}</td>
                    <td className="p-2 border border-gray-300">
                      <Link to={`/trackJobseeker/${app.id}`}>
                        <button className="text-blue-600 hover:underline">
                          ดูรายละเอียด
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="text-red-600 hover:underline ml-2"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form Section */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">เพิ่มข้อมูลใหม่</h2>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="ชื่อบริษัท"
                value={newApplication.companyName}
                onChange={(e) =>
                  setNewApplication({
                    ...newApplication,
                    companyName: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="date"
                value={newApplication.date}
                onChange={(e) =>
                  setNewApplication({ ...newApplication, date: e.target.value })
                }
                className="border border-gray-300 p-2 rounded"
              />
              <button
                onClick={addApplication}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                เพิ่ม
              </button>
            </div>
          </div>
        </div>

        {/* Animation Section */}
        <div ref={lottieRef} className="w-full max-w-xs md:max-w-xl">
          <Lottie animationData={Animation} style={style} />
        </div>
      </div>
    </div>
  );
}

export default TrackJobSeeker;
