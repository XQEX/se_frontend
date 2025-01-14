import React from "react";
import NavbarEmp from "../../components/NavbarEmp";
import SidebarEmp from "../../components/SidebarEmp";
import JobCardEmp from "../../components/JobCardEmp";
import Footer from "../../components/Footer";
import { Pagination, ScrollArea } from "@mantine/core";

const FindEmployers: React.FC = () => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search Value:", e.target.value);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <NavbarEmp />

      {/* Main Content */}
      <div className="flex flex-row">
        {/* Sidebar */}
        <SidebarEmp />

        {/* Main Section */}
        <div className="w-3/4 p-4">
          <div className="kanit-medium mb-4 text-2xl">Find Candidates</div>

          {/* Job Cards */}
          <ScrollArea style={{ height: "70vh" }}>
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <JobCardEmp
                  key={index}
                  jobTitle={`Job Title ${index + 1}`}
                  Name={`Candidate ${index + 1}`}
                  expectedPosition="Software Engineer"
                  expectedSalary={`฿${(index + 1) * 1000}`}
                  onViewDetails={() =>
                    console.log(`View Details for Candidate ${index + 1}`)
                  }
                />
              ))}
            </div>
          </ScrollArea>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-6">
            <Pagination total={10} color="teal" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FindEmployers;
