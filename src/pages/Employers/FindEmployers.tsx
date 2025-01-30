import { useState, useEffect } from "react";

interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  workDays: string;
  workHours: string;
}
import { motion } from "framer-motion";
import { NavbarEmp } from "../../components/NavbarEmp";
import Sidebar from "../../components/SidebarEmp";
import JobCardEmp from "../../components/JobCardEmp";
import Footer from "../../components/Footer";
import { Pagination } from "@mantine/core";

function FindEmp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = () => {
      const storedJobs = JSON.parse(localStorage.getItem("jobs_seek") || "[]");
      setJobs(storedJobs);
    };
    loadJobs();
  }, []);

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="min-h-screen flex flex-col font-kanit">
      <NavbarEmp />
      <div className="flex flex-row flex-grow">
        <Sidebar />
        <div className="w-full md:w-3/4 p-6">
          <h1 className="kanit-medium text-2xl mb-4">โพสต์งาน</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job: Job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <JobCardEmp
                  id={job.id}
                  title={job.title}
                  location={job.location}
                  salary={job.salary}
                  workDays={job.workDays}
                  workHours={job.workHours}
                />
              </motion.div>
            ))}
          </div>
          {jobs.length > itemsPerPage && (
            <div className="flex items-center justify-center mt-6">
              <Pagination
                total={Math.ceil(jobs.length / itemsPerPage)}
                value={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FindEmp;
