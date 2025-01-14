import React from "react";
import { useParams } from "react-router-dom";
import { jobData } from "../data/FakeJobData";
import Navbar from "../components/Navbar";

function JobDetail() {
  const { id } = useParams();

  const job = jobData.find((job) => job.id === id);

  if (!job) {
    return (
      <div className="text-center">
        <h2>Job not found</h2>
      </div>
    );
  }

  return (
   <div className="h-screen">
    <Navbar/>
    <div>
        <div>{job.id}</div>
        <div>{job.company}</div>
        <div>{job.title}</div>
        <div>{job.location}</div>
        <div>{job.time}</div>
    </div>
   </div>
  );
}

export default JobDetail;
