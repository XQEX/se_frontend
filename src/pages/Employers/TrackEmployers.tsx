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

const TrackEmployers: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([
    { id: 1, applicantName: "John Doe", jobTitle: "Frontend Developer", status: "Under Review" },
    { id: 2, applicantName: "Jane Smith", jobTitle: "Backend Developer", status: "Shortlisted" },
    { id: 3, applicantName: "Alice Johnson", jobTitle: "UI/UX Designer", status: "Rejected" },
    { id: 4, applicantName: "Bob Brown", jobTitle: "Data Scientist", status: "Hired" },
    { id: 5, applicantName: "Charlie Green", jobTitle: "Mobile Developer", status: "Under Review" },
    { id: 6, applicantName: "Diana White", jobTitle: "DevOps Engineer", status: "Shortlisted" },
    { id: 7, applicantName: "Edward Black", jobTitle: "Product Manager", status: "Rejected" },
    { id: 8, applicantName: "Fiona Blue", jobTitle: "Cloud Engineer", status: "Under Review" },
    { id: 9, applicantName: "George Yellow", jobTitle: "Machine Learning Engineer", status: "Shortlisted" },
    { id: 10, applicantName: "Hannah Gray", jobTitle: "Cybersecurity Specialist", status: "Hired" },
  ]);

  const navigate = useNavigate();

  const handleViewDetails = (id: number) => {
    navigate(`/track/${id}`);
  };

  return (
    <div>
      {/* NavbarEmp */}
      <NavbarEmp />

      <div className="track-container">
        <h1>Track Applications</h1>
        <table className="applications-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Job Title</th>
              <th>Status</th>
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
                <td
                  className={`status ${application.status.toLowerCase().replace(" ", "-")}`}
                >
                  {application.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TrackEmployers;
