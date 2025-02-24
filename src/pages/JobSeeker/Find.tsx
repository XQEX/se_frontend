import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import JobCard from "../../components/JobCard";
import Footer from "../../components/Footer";
import { Pagination } from "@mantine/core";
import { getAllJobPosts } from "../../api/EmployerAndCompany";
import { useUser } from "../../context/UserContext";

interface Job {
  id: number;
  title: string;
  jobLocation: string;
  expectedSalary: number;
  workDates: string;
  workHoursRange: string;
}

interface Filters {
  searchTerm: string;
  selectedJobCategories: string[];
  selectedJobTypes: string[];
  selectedSkills: string[];
  salaryRange: [number, number];
  startTime: string | null;  // ✅ เพิ่ม startTime
  endTime: string | null;    // ✅ เพิ่ม endTime
  selectedLocations: string[];
  selectedWorkDays: string[];
  sortBy: string | null;
  sortOrder: "asc" | "desc";
}

function Find() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    selectedJobCategories: [],
    selectedJobTypes: [],
    selectedSkills: [],
    salaryRange: [0, 200000], 
    startTime: null,   // ✅ เพิ่ม startTime
    endTime: null,     // ✅ เพิ่ม endTime
    selectedLocations: [],
    selectedWorkDays: [],
    sortBy: null,
    sortOrder: "asc",
  });

  const [opened, setOpened] = useState(false);
  const [salaryRange, setSalaryRange] = useState(0);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([
    "ทั้งหมด",
  ]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([
    "ทั้งหมด",
  ]);
  const {
    user,
    isLoading,
    refetchjobseeker,
    refetchemployer,
    refetchCompany,
    isStale,
    setUser,
  } = useUser();
  const [isHaveUser, setIsHaveUser] = useState(false);
  useEffect(() => {
    refetchjobseeker();
    refetchCompany();
    refetchemployer();
    // console.log("current user:", user);
    // console.log("isLoading:", isLoading);
    // console.log("isHaveUser :", isHaveUser);
    // console.log("isStale :", isStale);
    setIsHaveUser(!!user);
  }, [user, isLoading, isStale]);

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

  // fetch job posts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobPosts();
        const jobPosts = response.data.jobPosts.map((jobPost: any) => ({
          id: jobPost.id,
          title: jobPost.title,
          jobLocation: jobPost.jobLocation || "ไม่ระบุสถานที่",
          expectedSalary: jobPost.salary || 0,
          workDates: jobPost.workDates || "ไม่ระบุวันทำงาน",
          workHoursRange: jobPost.workHoursRange || "ไม่ระบุเวลา",
        }));
        setJobs(jobPosts);
      } catch (error) {
        console.error("Failed to fetch job posts:", error);
      }
    };
    fetchJobs();
  }, []);

  // ✅ ฟังก์ชันกรองงาน
  const filterJobs = (jobs: Job[]): Job[] => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesSalary = job.expectedSalary >= filters.salaryRange[0] &&
        job.expectedSalary <= filters.salaryRange[1];

      const matchesLocations = filters.selectedLocations.length === 0 ||
        filters.selectedLocations.includes(job.jobLocation);

      const matchesWorkDays = filters.selectedWorkDays.length === 0 ||
        filters.selectedWorkDays.some(day => job.workDates.includes(day));

      return matchesSearch && matchesSalary && matchesLocations && matchesWorkDays;
    });
  };

  // ✅ ฟังก์ชันเรียงลำดับงาน
  const sortJobs = (jobs: Job[]): Job[] => {
    if (!filters.sortBy) return jobs;

    return [...jobs].sort((a, b) => {
      switch (filters.sortBy) {
        case 'salary':
          return filters.sortOrder === 'asc' 
            ? a.expectedSalary - b.expectedSalary 
            : b.expectedSalary - a.expectedSalary;
        case 'date':
          return filters.sortOrder === 'asc' 
            ? new Date(a.workDates).getTime() - new Date(b.workDates).getTime() 
            : new Date(b.workDates).getTime() - new Date(a.workDates).getTime();
        default:
          return 0;
      }
    });
  };

  const filteredJobs = sortJobs(filterJobs(jobs));
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="min-h-screen flex flex-col font-kanit">
      <Navbar
        user={user}
        isLoading={isLoading}
        isHaveUser={isHaveUser}
        refetchjobseeker={refetchjobseeker}
        refetchemployer={refetchemployer}
        refetchCompany={refetchCompany}
        isStale={isStale}
        setUser={setUser}
      />
      <div className="flex flex-row flex-grow">
        {/* ✅ ส่ง props filters และ setFilters ให้ Sidebar */}
        <Sidebar filters={filters} setFilters={setFilters} />
        <div className="w-full md:w-3/4 p-6">
          <h1 className="kanit-medium text-2xl mb-4">ค้นหาในโพสต์</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="kanit-regular text-gray-500 text-xl">
                  ไม่พบงานที่ตรงกับเงื่อนไขการค้นหา
                </p>
              </div>
            ) : (
              currentJobs.map((job) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <JobCard
                    id={job.id}
                    title={job.title}
                    location={job.jobLocation}
                    salary={job.expectedSalary}
                    workDays={job.workDates}
                    workHours={job.workHoursRange}
                  />
                </motion.div>
              ))
            )}
          </div>
          {filteredJobs.length > itemsPerPage && (
            <div className="flex items-center justify-center mt-6">
              <Pagination
                total={Math.ceil(filteredJobs.length / itemsPerPage)}
                value={currentPage}
                onChange={setCurrentPage}
                classNames={{ control: "border-0" }}
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
