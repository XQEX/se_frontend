import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavbarEmp } from "../../components/NavbarEmp";
import Sidebar from "../../components/SidebarEmp";
import JobCardEmp from "../../components/JobCardEmp";
import Footer from "../../components/Footer";
import { Pagination } from "@mantine/core";
import { getAllJobFindingPosts } from "../../api/JobSeeker";

interface Job {
  id: string;
  title: string;
  description: string;
  jobLocation: string;
  expectedSalary: number;
  workDates: string;
  workHoursRange: string;
  status: string;
  jobPostType: string;
  jobSeekerType: string;
  jobSeekerId: string;
  oauthJobSeekerId: string | null;
  createdAt: string;
  updatedAt: string;
  skills: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
  jobCategories: {
    id: string;
    name: string;
    description: string;
  }[];
}

export interface Filters {
  searchTerm: string;
  selectedJobCategories: string[];
  selectedJobTypes: string[];
  selectedSkills: string[];
  salaryRange: [number, number];
  startTime: string | null;
  endTime: string | null;
  selectedLocations: string[];
  selectedWorkDays: string[];
  sortBy: string | null;
  sortOrder: "asc" | "desc";
}
import { useUser } from "../../context/UserContext";

function FindEmp() {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    selectedJobCategories: [],
    selectedJobTypes: [],
    selectedSkills: [],
    salaryRange: [0, 200000],
    startTime: null,
    endTime: null,
    selectedLocations: [],
    selectedWorkDays: [],
    sortBy: null,
    sortOrder: 'asc',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobFindingPosts();
        setJobs(response.data.jobPosts as Job[]);
      } catch (error) {
        console.error("Failed to fetch job finding posts:", error);
      }
    };
    fetchJobs();
  }, []);

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

  const filterJobs = (jobs: Job[]): Job[] => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesCategories = filters.selectedJobCategories.length === 0 ||
        job.jobCategories.some(cat => 
          filters.selectedJobCategories.includes(cat.name)
        );

      const matchesJobTypes = filters.selectedJobTypes.length === 0 ||
        filters.selectedJobTypes.includes(job.jobPostType);

      const matchesSalary = job.expectedSalary >= filters.salaryRange[0] &&
        job.expectedSalary <= filters.salaryRange[1];

      const matchesWorkHours = () => {
        if (!filters.startTime || !filters.endTime) return true;
        const [startH, startM] = filters.startTime.split(':').map(Number);
        const [endH, endM] = filters.endTime.split(':').map(Number);
        const jobStart = parseInt(job.workHoursRange.split('-')[0].replace(':', ''));
        const jobEnd = parseInt(job.workHoursRange.split('-')[1].replace(':', ''));
        const filterStart = startH * 100 + startM;
        const filterEnd = endH * 100 + endM;
        return jobStart >= filterStart && jobEnd <= filterEnd;
      };

      const matchesLocations = filters.selectedLocations.length === 0 ||
        filters.selectedLocations.includes(job.jobLocation);

      const matchesWorkDays = filters.selectedWorkDays.length === 0 ||
        filters.selectedWorkDays.some(day => job.workDates.includes(day));

      return matchesSearch &&
        matchesCategories &&
        matchesJobTypes &&
        matchesSalary &&
        matchesWorkHours() &&
        matchesLocations &&
        matchesWorkDays;
    });
  };

// ในส่วน sortJobs ของ FindEmp.tsx
const sortJobs = (jobs: Job[]): Job[] => {
  if (!filters.sortBy) return jobs;

  return [...jobs].sort((a, b) => {
    switch (filters.sortBy) {
      case 'salary':
        return filters.sortOrder === 'asc' 
          ? a.expectedSalary - b.expectedSalary 
          : b.expectedSalary - a.expectedSalary;
      case 'date':
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return filters.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
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
      <NavbarEmp
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
              currentJobs.map((job: Job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <JobCardEmp
                    id={job.id}
                    title={job.title}
                    location={job.jobLocation}
                    salary={job.expectedSalary}
                    workDays={job.workDates}
                    workHours={job.workHoursRange}
                    jobCategories={job.jobCategories}
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
                classNames={{
                  control: 'border-0',
                }}
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