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
        <div className="text-black font-bold text-lg">ตัวกรองค้นหาผู้สมัคร</div>

        <div className="flex flex-col w-full gap-4">
          {/* ตัวกรองตำแหน่งงาน */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">ตำแหน่งงาน</label>
            <input
              type="text"
              value={jobTitle}
              onChange={handleJobTitleChange}
              placeholder="กรอกตำแหน่งงาน"
              className="text-black rounded-lg border border-gray-300 w-full p-2"
            />
          </div>

          {/* ตัวกรองสถานที่ทำงาน */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">จังหวัด</label>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="กรอกจังหวัดของคุณ"
              className="text-black rounded-lg border border-gray-300 w-full p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">ชั่วโมงทำงาน</label>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="..."
              className="text-black rounded-lg border border-gray-300 w-full p-2"
            />
          </div>

          {/* ตัวกรองช่วงเงินเดือน */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1">ช่วงเงินเดือน (บาท)</label>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="number"
                value={minSalary}
                min={0}
                onChange={handleMinSalaryChange}
                placeholder="ขั้นต่ำ"
                className="text-black rounded-lg border border-gray-300 w-full p-2"
              />
              <span className="text-black">-</span>
              <input
                type="number"
                value={maxSalary}
                min={minSalary}
                onChange={handleMaxSalaryChange}
                placeholder="ขั้นสูง"
                className="text-black rounded-lg border border-gray-300 w-full p-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ปุ่มค้นหา */}
      <button
        onClick={handleSearch}
        className="font-medium rounded-lg p-2 m-4 transition"
        style={{
          backgroundColor: "#2E8B57", // สีเขียวใหม่
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
        ค้นหา
      </button>
    </div>
  );
}

export default Sidebar;
