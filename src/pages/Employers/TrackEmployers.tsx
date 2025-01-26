import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import "./TrackEmployers.css";

interface Application {
  id: number;
  applicantName: string;
  jobTitle: string;
  status: string;
}

// ✅ ฟังก์ชันแปลงสถานะเป็นภาษาไทย
const translateStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    "Under Review": "กำลังตรวจสอบ",
    "Shortlisted": "ผ่านการคัดเลือก",
    "Rejected": "ไม่ผ่านการคัดเลือก",
    "Hired": "ได้รับการจ้างงาน",
  };
  return statusMap[status] || status;
};

const TrackEmployers: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([
    { id: 1, applicantName: "John Doe", jobTitle: "นักพัฒนา Frontend", status: "Under Review" },
    { id: 2, applicantName: "Jane Smith", jobTitle: "นักพัฒนา Backend", status: "Shortlisted" },
    { id: 3, applicantName: "Alice Johnson", jobTitle: "นักออกแบบ UI/UX", status: "Rejected" },
    { id: 4, applicantName: "Bob Brown", jobTitle: "นักวิทยาศาสตร์ข้อมูล", status: "Hired" },
    { id: 5, applicantName: "Charlie Green", jobTitle: "นักพัฒนา Mobile", status: "Under Review" },
    { id: 6, applicantName: "Diana White", jobTitle: "วิศวกร DevOps", status: "Shortlisted" },
    { id: 7, applicantName: "Edward Black", jobTitle: "ผู้จัดการผลิตภัณฑ์", status: "Rejected" },
    { id: 8, applicantName: "Fiona Blue", jobTitle: "วิศวกรคลาวด์", status: "Under Review" },
    { id: 9, applicantName: "George Yellow", jobTitle: "วิศวกร Machine Learning", status: "Shortlisted" },
    { id: 10, applicantName: "Hannah Gray", jobTitle: "ผู้เชี่ยวชาญด้านความปลอดภัยไซเบอร์", status: "Hired" },
  ]);

  const navigate = useNavigate();

  const handleViewDetails = (id: number) => {
    navigate(`/track/${id}`);
  };

  return (
    <div>
      {/* ✅ NavbarEmp */}
      <NavbarEmp />

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
                <td className={`status ${application.status.toLowerCase().replace(" ", "-")}`}>
                  {translateStatus(application.status)} {/* ✅ แสดงสถานะเป็นภาษาไทย */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default TrackEmployers;
