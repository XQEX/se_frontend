import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarEmp from "../../components/NavbarEmp";
import Footer from "../../components/Footer";
import "./PostEmployers.css";

const PostJob: React.FC = () => {
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePostJob = () => {
    if (jobTitle && location && jobDescription && requirements) {
      const newJob = {
        id: Date.now(),
        title: jobTitle,
        location,
        description: jobDescription,
        requirements,
      };

      // Store the new job in Local Storage
      const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
      const updatedJobs = [newJob, ...existingJobs];
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));

      // Navigate to employer homepage
      navigate("/homeemp");
      setSuccessMessage("Job posted successfully!");
    } else {
      alert("Please fill in all fields before posting.");
    }
  };

  return (
    <div>
      <NavbarEmp />
      <div className="post-job-container">
        <h1>Post a Job</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="post-job-form">
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter job title"
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter job location"
            />
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter job description"
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>Requirements</label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Enter job requirements"
              rows={4}
            />
          </div>
          <button type="button" onClick={handlePostJob} className="submit-button">
            Post Job
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PostJob;
