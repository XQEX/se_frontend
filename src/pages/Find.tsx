import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import { Pagination } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { jobData } from "../data/FakeJobData";

function Find() {
  const handleSearch = (e: any) => {};

  const [favJobs, setFavJobs] = useState<string[]>([]);

  const handleFavChange = (jobId: string, isFav: boolean) => {
    if (isFav) {
      setFavJobs((prev) => [...prev, jobId]); 
    } else {
      setFavJobs((prev) => prev.filter((id) => id !== jobId));
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <div className="w-3/4">
          <div className="kanit-medium m-6 text-2xl">ค้นหางาน</div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-3 m-1">
            {jobData.map((job, index) => (
              <JobCard
                id={job.id}
                key={index}
                title={job.title}
                company={job.company}
                time={job.time}
                location={job.location}
                salary={job.salary}
              />
            ))}
          </div>
          <div className="flex items-center justify-center m-4">
            <Pagination total={10000000} color="teal" className="" />;
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Find;
