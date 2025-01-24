import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import JobCard from "../../components/JobCard";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { Pagination, PaginationProps } from "@mantine/core";
import { jobData } from "../../data/FakeJobData";
import { motion } from "framer-motion";
import { Drawer, Button } from "@mantine/core";
import { FaMagnifyingGlass } from "react-icons/fa6";

function Find() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [opened, setOpened] = useState(false);

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobData.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange: PaginationProps["onChange"] = (page) =>
    setCurrentPage(page);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-row flex-grow">
        <Sidebar />
        <div className="w-3/4 w-full">
          <div className="flex items-center justify-between m-3">
            <div className="kanit-medium m-6 text-2xl">ค้นหางาน</div>

            <button
              onClick={() => setOpened(true)}
          
              className="block md:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
             <FaMagnifyingGlass />
            </button>
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-3 m-1">
            {currentJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <JobCard
                  id={job.id}
                  key={index}
                  title={job.title}
                  company={job.company}
                  time={job.time}
                  location={job.location}
                  salary={job.salary}
                />
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center m-4">
            <Pagination
              total={Math.ceil(jobData.length / itemsPerPage)}
              value={currentPage}
              onChange={handlePageChange}
              color="gray"
            />
          </div>
        </div>
      </div>

    
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="ค้นหางาน"
        size="xl"
        padding="lg"
        className = "kanit-regular"
      >
        <div>
          เดี๋ยวมาทำ 
        </div>
      </Drawer>

      <Footer />
    </div>
  );
}

export default Find;
