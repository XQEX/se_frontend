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
}

const HomepageEmployers: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    setJobs(storedJobs ? JSON.parse(storedJobs) : []);
  }, []);

  const handleViewDetails = (id: number) => {
    navigate(`/viewpost/${id}`);
  };

  const handlePostJob = () => {
    navigate("/postemp");
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
        {/* Overview Section */}
        <div className="overview-cards">
          <div className="card">
            <h3>Jobs Posted</h3>
            <p>{jobs.length}</p>
          </div>
          <div className="card">
            <h3>Applicants</h3>
            <p>1,209,321</p>
          </div>
          <div className="card">
            <h3>New Notifications</h3>
            <p>999+</p>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="quick-actions">
          <h1 className="section-title">Quick Actions</h1>
          <div className="quick-buttons">
            <button className="action-button" onClick={handlePostJob}>
              Post a New Job
            </button>
            <button className="action-button" onClick={handleSearchCandidates}>
              Search Candidates
            </button>
            <button className="action-button" onClick={handleTrackApplications}>
              Track Applications
            </button>
          </div>
        </div>

        {/* NullPage or Recent Jobs Section */}
        {jobs.length === 0 ? (
          <div className="null-page">
            <div className="null-content">
              <h1>No Jobs Posted Yet</h1>
              <p>Start by posting a job to attract candidates!</p>
              <button
                className="action-button"
                onClick={handlePostJob}
                style={{
                  backgroundColor: "#3cb371",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "1rem",
                }}
              >
                Post a New Job
              </button>
            </div>
          </div>
        ) : (
          <div className="recent-jobs">
            <h1 className="section-title">Your Recent Jobs</h1>
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteJob(job.id)}
                >
                  &times;
                </button>
                <h3>{job.title}</h3>
                <p>Location: {job.location}</p>
                <p>Applicants: 10</p>
                <div className="job-actions">
                  <button
                    className="action-button"
                    onClick={() => handleViewDetails(job.id)}
                  >
                    View Details
                  </button>
                  <button className="action-button">Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomepageEmployers;
