import React, { useState } from "react";

function Sidebar() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(1000);

  const handleJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinSalary(Number(e.target.value));
  };

  const handleMaxSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSalary(Number(e.target.value));
  };

  const handleSearch = () => {
    console.log({
      jobTitle,
      location,
      salaryRange: {
        min: minSalary,
        max: maxSalary,
      },
    });
  };

  return (
    <div className="flex flex-col h-screen w-1/4 bg-gray-100 text-black">
      <div className="flex flex-col justify-start items-start space-y-4 p-4">
        <div className="text-black font-bold text-lg">Filter Candidates</div>

        <div className="flex flex-col w-full gap-4">
          {/* Job Title Filter */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={handleJobTitleChange}
              placeholder="Enter job title"
              className="text-black rounded-lg border border-gray-300 w-full p-2"
            />
          </div>

          {/* Location Filter */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter job location"
              className="text-black rounded-lg border border-gray-300 w-full p-2"
            />
          </div>

          {/* Salary Range Filter */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">Salary Range (Baht)</label>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="number"
                value={minSalary}
                min={0}
                onChange={handleMinSalaryChange}
                placeholder="Minimum"
                className="text-black rounded-lg border border-gray-300 w-full p-2"
              />
              <span className="text-black">-</span>
              <input
                type="number"
                value={maxSalary}
                min={minSalary}
                onChange={handleMaxSalaryChange}
                placeholder="Maximum"
                className="text-black rounded-lg border border-gray-300 w-full p-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="font-medium rounded-lg p-2 m-4 transition"
        style={{
          backgroundColor: "#2E8B57)", // สีเขียวใหม่
          color: "white",
          border: "none",
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#1C6F44") // สีเขียวเข้มเมื่อ Hover
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = "#2E8B57") // กลับเป็นสีเดิม
        }
      >
        Search
      </button>
    </div>
  );
}

export default Sidebar;
