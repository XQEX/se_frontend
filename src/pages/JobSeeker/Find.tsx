/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../../components/Navbar";
import Sidebar from "../../components/Sidebar"; 
import JobCard from "../../components/JobCard";
import Footer from "../../components/Footer";
import { Pagination } from "@mantine/core";
import { getAllJobPosts } from "../../api/EmployerAndCompany";
import { useUser } from "../../context/UserContext";

// Interface Definitions
interface JobCategory {
  id: number;
  name: string;
}

interface Skill {
  id: number;
  name: string;
}

interface Job {
  id: number;
  title: string;
  jobLocation: string;
  expectedSalary: number;
  workDates: string;
  workHoursRange: string;
  jobCategories: JobCategory[];
  jobPostType: string;
  skills: Skill[];
  createdAt: string;
}

interface Filters {
  searchTerm: string;
  selectedJobCategories: string[];
  selectedJobTypes: string[];
  selectedSkills: string[];
  salaryRange: [number, number];
  startTime: string | null;
  endTime: string | null;
  selectedLocations: string[];
  selectedWorkDays: string[];
  sortBy: string | null; // ❌ อาจไม่ตรงกับ Sidebar
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
    startTime: null,
    endTime: null,
    selectedLocations: [],
    selectedWorkDays: [],
    sortBy: null,
    sortOrder: "asc",
  });

  const { user, isLoading, refetchjobseeker, refetchemployer, refetchCompany, isStale, setUser } = useUser();
  const isHaveUser = useState(false);
  // const setIsHaveUser = useState(false);

  // Fetch Jobs
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
          jobCategories: jobPost.jobCategories || [],
          jobPostType: jobPost.jobPostType || "Full-time",
          skills: jobPost.skills || [],
          createdAt: jobPost.createdAt || new Date().toISOString(),
        }));
        setJobs(jobPosts);
      } catch (error) {
        console.error("Failed to fetch job posts:", error);
      }
    };
    fetchJobs();
  }, []);

  // Filtering Logic
  const filterJobs = (jobs: Job[]): Job[] => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.jobCategories.some(cat => 
          cat.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );

      const matchesCategories = filters.selectedJobCategories.length === 0 ||
        job.jobCategories.some(cat => 
          filters.selectedJobCategories.includes(cat.name)
        );

      const matchesJobTypes = filters.selectedJobTypes.length === 0 ||
        filters.selectedJobTypes.includes(job.jobPostType);

      const matchesSkills = filters.selectedSkills.length === 0 ||
        job.skills.some(skill => 
          filters.selectedSkills.includes(skill.name)
        );

      const matchesSalary = job.expectedSalary >= filters.salaryRange[0] &&
        job.expectedSalary <= filters.salaryRange[1];

      const matchesWorkHours = () => {
        if (!filters.startTime || !filters.endTime) return true;
        
        const parseTime = (timeStr: string) => {
          const [hours, minutes] = timeStr.split(':').map(Number);
          return hours * 100 + minutes;
        };

        try {
          const [jobStartStr, jobEndStr] = job.workHoursRange.split('-');
          const jobStart = parseTime(jobStartStr.trim());
          const jobEnd = parseTime(jobEndStr.trim());
          const filterStart = parseTime(filters.startTime);
          const filterEnd = parseTime(filters.endTime);
          
          return jobStart >= filterStart && jobEnd <= filterEnd;
        } catch {
          return true;
        }
      };

      const matchesLocations = filters.selectedLocations.length === 0 ||
        filters.selectedLocations.includes(job.jobLocation);

        const matchesWorkDays = () => {
          if (filters.selectedWorkDays.length === 0) return true;
        

          const jobDays = job.workDates
            .split('-')
            .map(day => day.trim())
            .filter(day => day !== '');
          return filters.selectedWorkDays.every(selectedDay => 
            jobDays.includes(selectedDay)
          );
        };

      return matchesSearch &&
        matchesCategories &&
        matchesJobTypes &&
        matchesSkills &&
        matchesSalary &&
        matchesWorkHours() &&
        matchesLocations &&
        matchesWorkDays;
    });
  };

  // Sorting Logic
  const sortJobs = (jobs: Job[]): Job[] => {
    if (!filters.sortBy) return jobs;

    return [...jobs].sort((a, b) => {
      switch (filters.sortBy) {
        case 'salary':
          return filters.sortOrder === 'asc' 
            ? a.expectedSalary - b.expectedSalary 
            : b.expectedSalary - a.expectedSalary;
        // case 'date':
        //   const dateA = new Date(a.createdAt).getTime();
        //   const dateB = new Date(b.createdAt).getTime();
        //   return filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        default:
          return 0;
      }
    });
  };

  // Memoized Calculations
  const filteredJobs = useMemo(() => 
    sortJobs(filterJobs(jobs)), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [jobs, filters]
  );

  // const jobCategories = useMemo(() => 
  //   Array.from(
  //     new Set(
  //       jobs.flatMap(job => 
  //         job.jobCategories.map(cat => cat.name)
  //       )
  //     ) // ปิด new Set และ Array.from
  //   , // ใส่ comma ก่อน dependencies array
  //   [jobs]
  // );
  
  // const skills = useMemo(() => 
  //   Array.from(
  //     new Set(
  //       jobs.flatMap(job => 
  //         job.skills.map(skill => skill.name)
  //       )
  //     ) // ปิด new Set และ Array.from
  //   , // ใส่ comma ก่อน dependencies array
  //   [jobs]
  // );

  // Pagination
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
        <Sidebar 
          filters={filters}
          setFilters={setFilters}
          // jobCategories={jobCategories}
          // skills={skills}
        />
        
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
                    // jobCategories={job.jobCategories}
                    // skills={job.skills}
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