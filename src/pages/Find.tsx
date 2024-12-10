import React from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";

function Find() {
  return (
    <div className="h-screen flex ">
      <div className="w-1/4 bg-gray-100">
        <Sidebar />
      </div>
      <div className="w-3/4">
        <Navbar />
        <div className="flex flex-col justify-center items-center mt-4"></div>
      </div>
    </div>
  );
}

export default Find;
