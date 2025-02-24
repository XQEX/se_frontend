import { useState, useEffect } from "react";

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
import { motion } from "framer-motion";
import { NavbarEmp } from "../../components/NavbarEmp";
import Sidebar from "../../components/SidebarEmp";
import JobCardEmp from "../../components/JobCardEmp";
import Footer from "../../components/Footer";
import { Pagination } from "@mantine/core";
import { getAllJobFindingPosts } from "../../api/JobSeeker";
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobFindingPosts();
        console.log(response.data.jobPosts);
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

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

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
    </div>
  );
}

export default FindEmp;
