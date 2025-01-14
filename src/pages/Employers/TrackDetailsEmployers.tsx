import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import "./TrackDetailsEmployers.css";

interface ApplicantDetails {
  id: number;
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  resumeLink: string;
  status: string;
  notes: string;
}

const applicantData: ApplicantDetails[] = [
  {
    id: 1,
    name: "John Doe",
    jobTitle: "Frontend Developer",
    email: "johndoe@example.com",
    phone: "+1 234-567-890",
    resumeLink: "#",
    status: "Under Review",
    notes: "Looking good, consider for next round.",
  },
  {
    id: 2,
    name: "Jane Smith",
    jobTitle: "Backend Developer",
    email: "janesmith@example.com",
    phone: "+1 234-567-891",
    resumeLink: "#",
    status: "Shortlisted",
    notes: "Highly skilled in Node.js and Express.",
  },
  {
    id: 3,
    name: "Alice Johnson",
    jobTitle: "UI/UX Designer",
    email: "alicejohnson@example.com",
    phone: "+1 234-567-892",
    resumeLink: "#",
    status: "Rejected",
    notes: "Portfolio does not meet the requirements.",
  },
  {
    id: 4,
    name: "Bob Brown",
    jobTitle: "Data Scientist",
    email: "bobbrown@example.com",
    phone: "+1 234-567-893",
    resumeLink: "#",
    status: "Hired",
    notes: "Great experience in AI and ML.",
  },
  {
    id: 5,
    name: "Charlie Green",
    jobTitle: "Mobile Developer",
    email: "charliegreen@example.com",
    phone: "+1 234-567-894",
    resumeLink: "#",
    status: "Under Review",
    notes: "Has good knowledge in React Native.",
  },
  {
    id: 6,
    name: "Diana White",
    jobTitle: "DevOps Engineer",
    email: "dianawhite@example.com",
    phone: "+1 234-567-895",
    resumeLink: "#",
    status: "Shortlisted",
    notes: "Strong understanding of CI/CD pipelines.",
  },
  {
    id: 7,
    name: "Edward Black",
    jobTitle: "Product Manager",
    email: "edwardblack@example.com",
    phone: "+1 234-567-896",
    resumeLink: "#",
    status: "Rejected",
    notes: "Lacks sufficient leadership experience.",
  },
  {
    id: 8,
    name: "Fiona Blue",
    jobTitle: "Cloud Engineer",
    email: "fionablue@example.com",
    phone: "+1 234-567-897",
    resumeLink: "#",
    status: "Under Review",
    notes: "Experienced in AWS and Azure.",
  },
  {
    id: 9,
    name: "George Yellow",
    jobTitle: "Machine Learning Engineer",
    email: "georgeyellow@example.com",
    phone: "+1 234-567-898",
    resumeLink: "#",
    status: "Shortlisted",
    notes: "Excellent in TensorFlow and PyTorch.",
  },
  {
    id: 10,
    name: "Hannah Gray",
    jobTitle: "Cybersecurity Specialist",
    email: "hannahgray@example.com",
    phone: "+1 234-567-899",
    resumeLink: "#",
    status: "Hired",
    notes: "Exceptional knowledge of cybersecurity protocols.",
  },
];

const TrackEmployersDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const applicant = applicantData.find((app) => app.id === Number(id));

  if (!applicant) {
    return (
      <div>
        <NavbarEmp />
        <div className="details-container">
          <h1>Applicant Not Found</h1>
          <button onClick={() => navigate(-1)} className="back-button">
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      {/* NavbarEmp */}
      <NavbarEmp />

      <div className="details-container">
        <h1>Applicant Details</h1>
        <div className="details-card">
          <p><strong>Name:</strong> {applicant.name}</p>
          <p><strong>Job Title:</strong> {applicant.jobTitle}</p>
          <p><strong>Email:</strong> {applicant.email}</p>
          <p><strong>Phone:</strong> {applicant.phone}</p>
          <p><strong>Status:</strong> <span className={`status ${applicant.status.toLowerCase().replace(" ", "-")}`}>{applicant.status}</span></p>
          <p><strong>Notes:</strong> {applicant.notes}</p>
          <a href={applicant.resumeLink} target="_blank" rel="noopener noreferrer" className="resume-link">View Resume</a>
        </div>
        <button onClick={() => navigate(-1)} className="back-button">
          Go Back
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TrackEmployersDetails;
