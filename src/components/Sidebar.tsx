import React, { useState } from "react";
import { MultiSelect, Select } from "@mantine/core";
import { provinces, DistrictByProvince, SubdistrictByDistrict } from "../data/provinces";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [salaryRange, setSalaryRange] = useState(10000);
  const [sortBy, setSortBy] = useState("relevance");
  const [sortOrder, setSortOrder] = useState("descending");
  const [selectedProvince, setSelectedProvince] = useState<string>("ทั้งหมด"); // ตั้งค่าเริ่มต้นเป็น "ทั้งหมด"
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedProvinces, setSelectedProvinces] = useState(["ทั้งหมด"]);
  const [selectedJobTypes, setSelectedJobTypes] = useState(["ทั้งหมด"]); 
  

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };


  const handleProvinceChange = (value: string[]) => {
    if (value.includes("ทั้งหมด") && value.length > 1) {
      setSelectedProvinces(value.filter((v) => v !== "ทั้งหมด"));
    } else if (value.length === 0) {
      setSelectedProvinces(["ทั้งหมด"]);
    } else {
      setSelectedProvinces(value.filter((v) => v !== "ทั้งหมด"));
    }
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryRange(Number(event.target.value));
  };

  const handleJobTypeChange = (value: string[]) => {
    if (value.includes("ทั้งหมด") && value.length > 1) {
      setSelectedJobTypes(value.filter((v) => v !== "ทั้งหมด"));
    } else if (value.length === 0) {
      setSelectedJobTypes(["ทั้งหมด"]);
    } else {
      setSelectedJobTypes(value.filter((v) => v !== "ทั้งหมด"));
    }
  };


  
  const jobTypes = ["ทั้งหมด", "1", "2", "3"]; 

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-1/4 hidden md:block">
            <div className="space-y-2">
          <div className="search">
            <label htmlFor="search" className="kanit-regular text-sm">
              ค้นหา
            </label>
            <input
              type="text"
              id="search"
              placeholder=""
              className="w-full p-1 border border-gray-300 rounded-s-md"
            />
          </div>

          <div className="provinces">
            <label htmlFor="provinces" className="kanit-regular text-sm">
              จังหวัด
            </label>
            <MultiSelect
              placeholder="เลือกจังหวัด"
              data={provinces}
              value={selectedProvinces}
              onChange={handleProvinceChange}
              clearable
              searchable
            />
          </div>

          <div className="job-types">
            <label htmlFor="jobTypes" className="kanit-regular text-sm">
              ประเภทงาน
            </label>
            <MultiSelect
              placeholder="เลือกประเภทงาน"
              data={jobTypes}
              value={selectedJobTypes}
              onChange={handleJobTypeChange}
              clearable
              searchable
            />
          </div>

              <div className="salary mt-4">
              <label htmlFor="salary" className="kanit-regular text-sm mt-1">
                เงินเดือนสูงสุด: ฿{salaryRange.toLocaleString()}
              </label>
              <div className="flex justify-between text-xs mt-1">
                <span>฿0</span>
                <span>฿200,000</span>
              </div>
              <input
                type="range"
                id="salary"
                min="0"
                max="200000"
                step="1000"
                value={salaryRange}
                onChange={handleSalaryChange}
                className="w-full h-2 bg-gray-200 rounded-lg "
              />
              </div>

          <div className="sort flex flex-col space-y-2">
            <div className="flex space-x-2 items-center kanit-regular text-sm">
              <span>เรียง</span>
              <select
          id="sort"
          className="w-full p-1 border border-gray-300 rounded-s-md"
              >
          <option value="latest">ทั้งหมด</option>
          <option value="salary">เงินเดือน</option>
          <option value="distance">ระยะทาง</option>
              </select>
              <span>จาก</span>
              <select
          id="order"
          className="w-full p-1 border border-gray-300 rounded-s-md"
              >
          <option value="all">ทั้งหมด</option>
          <option value="highToLow">สูง-ตํ่า</option>
          <option value="lowToHigh">ตํ่า-สูง</option>
              </select>
            </div>
          </div>

            <div className="flex justify-center mt-8">
              <button className="bg-seagreen hover:bg-seagreen/90 text-white py-2 w-full mt-4 rounded">
              ค้นหา
              </button>
            </div>
        </div>
    </div>
  );
}

export default Sidebar;
