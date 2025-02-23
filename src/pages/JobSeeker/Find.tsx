// pages/Find.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import JobCard from "../../components/JobCard";
import Footer from "../../components/Footer";
import { Drawer, MultiSelect, Pagination } from "@mantine/core";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { provinces } from "../../data/provinces";
import { getAllJobPosts } from "../../api/EmployerAndCompany";

interface Job {
  id: number;
  title: string;
  jobLocation: string;
  expectedSalary: number;
  workDates: string;
  workHoursRange: string;
}

function Find() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [opened, setOpened] = useState(false);
  const [salaryRange, setSalaryRange] = useState(0);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(["ทั้งหมด"]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(["ทั้งหมด"]);

  const handleProvinceChange = (value: string[]) => {
    if (value.includes("ทั้งหมด") && value.length > 1) {
      setSelectedProvinces(value.filter((v) => v !== "ทั้งหมด"));
    } else if (value.length === 0) {
      setSelectedProvinces(["ทั้งหมด"]);
    } else {
      setSelectedProvinces(value);
    }
  };

  const handleJobTypeChange = (value: string[]) => {
    if (value.includes("ทั้งหมด") && value.length > 1) {
      setSelectedJobTypes(value.filter((v) => v !== "ทั้งหมด"));
    } else if (value.length === 0) {
      setSelectedJobTypes(["ทั้งหมด"]);
    } else {
      setSelectedJobTypes(value);
    }
  };

  const jobTypes = ["ทั้งหมด", "Full-time", "Part-time", "Freelance"];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobPosts();
        const jobPosts = response.data.jobPosts.map((jobPost: any) => ({
          id: jobPost.id,
          title: jobPost.title,
          jobLocation: jobPost.jobLocation || "ไม่ระบุสถานที่",
          expectedSalary: jobPost.expectedSalary || 0,
          workDates: jobPost.workDates || "ไม่ระบุวันทำงาน",
          workHoursRange: jobPost.workHoursRange || "ไม่ระบุเวลา"
        }));
        setJobs(jobPosts);
      } catch (error) {
        console.error("Failed to fetch job posts:", error);
      }
    };
    fetchJobs();
  }, []);

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="min-h-screen flex flex-col font-kanit">
      <Navbar />
      <div className="flex flex-row flex-grow">
        <Sidebar />
        <div className="w-full md:w-3/4 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="kanit-medium text-2xl">ค้นหางาน</h1>
            <button
              onClick={() => setOpened(true)}
              className="block md:hidden border border-seagreen text-seagreen font-bold py-2 px-4 rounded hover:bg-seagreen hover:text-white transition duration-300 ease-in-out"
            >
              <FaMagnifyingGlass />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <JobCard
                  id={job.id}
                  title={job.title}
                  location={job.jobLocation}
                  salary={job.expectedSalary}
                  workDays={job.workDates}
                  workHours={job.workHoursRange}
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

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="ค้นหางาน"
        size="xl"
        padding="lg"
        className="kanit-regular"
      >
        <div className="space-y-2">
          <div className="search">
            <label htmlFor="search" className="kanit-regular text-sm">
              ค้นหา
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-1 border border-gray-300 rounded-s-md"
            />
          </div>

          <div className="provinces">
            <label htmlFor="provinces" className="kanit-regular text-sm">
              จังหวัด
            </label>
            <MultiSelect
              placeholder="เลือกจังหวัด"
              data={provinces}
              value={selectedProvinces}
              onChange={handleProvinceChange}
              clearable
              searchable
            />
          </div>

          <div className="job-types">
            <label htmlFor="jobTypes" className="kanit-regular text-sm">
              ประเภทงาน
            </label>
            <MultiSelect
              placeholder="เลือกประเภทงาน"
              data={jobTypes}
              value={selectedJobTypes}
              onChange={handleJobTypeChange}
              clearable
              searchable
            />
          </div>

          <div className="salary mt-4">
            <label htmlFor="salary" className="kanit-regular text-sm mt-1">
              เงินเดือนสูงสุด: ฿{salaryRange.toLocaleString()}
            </label>
            <div className="flex justify-between text-xs mt-1">
              <span>฿0</span>
              <span>฿200,000</span>
            </div>
            <input
              type="range"
              id="salary"
              min="0"
              max="200000"
              value={salaryRange}
              onChange={(e) => setSalaryRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg "
            />
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-seagreen hover:bg-seagreen/90 text-white py-2 w-full mt-4 rounded">
              ค้นหา
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Find;