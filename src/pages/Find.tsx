import React from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import JobCard from "../components/JobCard";


function Find() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-row">
          <Sidebar />
        <div className="w-3/4">
          <div className="kanit-medium m-6 text-2xl">
            ค้นหางาน
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-3 m-1">
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Find;
