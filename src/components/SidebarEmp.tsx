import React, { useState } from "react";
import { Select } from "@mantine/core";
import { provinces } from "../data/provinces";
import { useNavigate } from "react-router-dom";

function SidebarEmp() {
  const [salaryRange, setSalaryRange] = useState(10000);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("descending");
  const [selectedProvince, setSelectedProvince] = useState<string>("ทั้งหมด");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryRange(parseInt(e.target.value));
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
    <div className="font-[Kanit] bg-white shadow-md rounded-lg p-4 w-1/4 hidden md:block">
      <div className="space-y-4">
        <div>
          <label htmlFor="keyword" className="font-medium text-gray-700 mb-1">
            คำค้นหา
          </label>
          <input
            type="text"
            id="keyword"
            placeholder="ตำแหน่งงาน, บริษัท, หรือทักษะ"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seagreen focus:border-transparent"
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

        {/* ตัวกรองเงินเดือน */}
        <div>
          <label htmlFor="salary" className="font-medium text-gray-700 mb-1">
            เงินเดือนสูงสุด: ฿{salaryRange.toLocaleString()}
          </label>
          <input
            type="range"
            id="salary"
            min="0"
            max="200000"
            step="1000"
            value={salaryRange}
            onChange={handleSalaryChange}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>฿0</span>
            <span>฿200,000</span>
          </div>
        </div>

        {/* การเรียงลำดับ */}
        <div>
          <label htmlFor="sortBy" className="font-medium text-gray-700 mb-1">
            เรียงตาม
          </label>
          <div className="flex items-center space-x-2">
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seagreen focus:border-transparent"
            >
              <option value="date">วันที่ลงประกาศ</option>
              <option value="relevance">ความเกี่ยวข้อง</option> 
              <option value="salary">เงินเดือน</option>
            </select>
            <button onClick={toggleSortOrder} className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
              {sortOrder === "ascending" ? "⬆️" : "⬇️"}
            </button>
          </div>
        </div>

        {/* ปุ่มค้นหา */}
        <button className="w-full bg-seagreen text-white font-semibold py-2 px-4 rounded-md hover:bg-seagreen-dark transition-colors duration-300">
          ค้นหางาน
        </button>
      </div>
    </div>
  );
}

export default SidebarEmp;
