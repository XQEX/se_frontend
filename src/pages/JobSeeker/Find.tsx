import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import JobCard from "../../components/JobCard";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import { MultiSelect, Pagination, PaginationProps } from "@mantine/core";
import { jobData } from "../../data/FakeJobData";
import { motion } from "framer-motion";
import { Drawer, Button } from "@mantine/core";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { provinces } from "../../data/provinces";

const jobTypes = ["ทั้งหมด", "1", "2", "3"]; 

function Find() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [opened, setOpened] = useState(false);
  const [selectedProvinces, setSelectedProvinces] = useState(["ทั้งหมด"]);
  const [salaryRange, setSalaryRange] = useState(200000); 
  const [selectedJobTypes, setSelectedJobTypes] = useState(["ทั้งหมด"]); 

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobData.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange: PaginationProps["onChange"] = (page) =>
    setCurrentPage(page);

  const handleProvinceChange = (value: string[]) => {
    if (value.includes("ทั้งหมด") && value.length > 1) {
      setSelectedProvinces(value.filter((v) => v !== "ทั้งหมด"));
    } else if (value.length === 0) {
      setSelectedProvinces(["ทั้งหมด"]);
    } else {
      setSelectedProvinces(value.filter((v) => v !== "ทั้งหมด"));
    }
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryRange(Number(event.target.value));
  };

  const handleJobTypeChange = (value: string[]) => {
    if (value.includes("ทั้งหมด") && value.length > 1) {
      setSelectedJobTypes(value.filter((v) => v !== "ทั้งหมด"));
    } else if (value.length === 0) {
      setSelectedJobTypes(["ทั้งหมด"]);
    } else {
      setSelectedJobTypes(value.filter((v) => v !== "ทั้งหมด"));
    }
  };

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
              className="block md:hidden border border-seagreen text-seagreen font-bold py-2 px-4 rounded hover:bg-seagreen hover:text-white transition duration-300 ease-in-out"
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
              placeholder=""
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
                step="1000"
                value={salaryRange}
                onChange={handleSalaryChange}
                className="w-full h-2 bg-gray-200 rounded-lg "
              />
              </div>

          <div className="sort flex flex-col space-y-2">
            <div className="flex space-x-2 items-center kanit-regular text-sm">
              <span>เรียง</span>
              <select
          id="sort"
          className="w-full p-1 border border-gray-300 rounded-s-md"
              >
          <option value="latest">ทั้งหมด</option>
          <option value="salary">เงินเดือน</option>
          <option value="distance">ระยะทาง</option>
              </select>
              <span>จาก</span>
              <select
          id="order"
          className="w-full p-1 border border-gray-300 rounded-s-md"
              >
          <option value="all">ทั้งหมด</option>
          <option value="highToLow">สูงสุด-ตํ่าสุด</option>
          <option value="lowToHigh">ต่ำสุด-สูงสุด</option>
              </select>
            </div>
          </div>

            <div className="flex justify-center mt-8">
              <button className="bg-seagreen hover:bg-seagreen/90 text-white py-2 w-full mt-4 rounded">
              ค้นหา
              </button>
            </div>
        </div>
      </Drawer>

      <Footer />
    </div>
  );
}

export default Find;
