import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import JobCard from "../../components/JobCard";
import Footer from "../../components/Footer";
import { Pagination } from "@mantine/core";

function Find() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [jobs, setJobs] = useState([]);

  // โหลดข้อมูลงานจาก LocalStorage
  useEffect(() => {
    const loadJobs = () => {
      const storedJobs = JSON.parse(localStorage.getItem("jobs_emp") || "[]");
      setJobs(storedJobs);
    };
    loadJobs();
  }, []);

  // คำนวณหน้าปัจจุบัน
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="min-h-screen flex flex-col font-kanit">
      <Navbar />
      <div className="flex flex-row flex-grow">
        <Sidebar />
        <div className="w-full md:w-3/4 p-6">
          <h1 className="kanit-medium text-2xl mb-4">ค้นหางาน</h1>
          
          {/* แสดงรายการงาน */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.map((job: Job) => (
  <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <JobCard
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

          {/* Pagination (แสดงเฉพาะถ้าจำนวนงานมากกว่า itemsPerPage) */}
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

export default Find;
