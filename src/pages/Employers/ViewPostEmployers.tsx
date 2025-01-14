import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import "./ViewPostEmployers.css";

const jobPosts = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Chiang Mai",
    description: "Responsible for developing user-facing features using React.js.",
    requirements: "Knowledge in React, JavaScript, and CSS.",
    postedBy: "John Doe",
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Bangkok",
    description: "Responsible for server-side application logic and integration.",
    requirements: "Knowledge in Node.js, Express.js, and MongoDB.",
    postedBy: "Jane Smith",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Phuket",
    description: "Design user interfaces and ensure user-friendly experience.",
    requirements: "Knowledge in Figma, Adobe XD, and prototyping tools.",
    postedBy: "Alice Johnson",
  },
];

const ViewPostEmployers: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = jobPosts.find((job) => job.id === Number(id));

  if (!job) {
    return (
      <div>
        <NavbarEmp />
        <div className="view-post-container text-center">
          <h1 className="job-not-found">Job Not Found</h1>
          <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <NavbarEmp />

      <div className="view-post-container">
        <h1 className="page-title">View Job Post</h1>
        <div className="job-post-details">
          <h2 className="job-title">{job.title}</h2>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
          <p>
            <strong>Requirements:</strong> {job.requirements}
          </p>
          <p>
            <strong>Posted By:</strong> {job.postedBy}
          </p>
        </div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ViewPostEmployers;
