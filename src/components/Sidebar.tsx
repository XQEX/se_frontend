import React, { useState } from "react";
import { MultiSelect } from "@mantine/core";
import { provinces } from "../data/provinces";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [salaryRange, setSalaryRange] = useState(10000);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(["ทั้งหมด"]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(["ทั้งหมด"]);

  const navigate = useNavigate();

  // ✅ ฟังก์ชันจัดการจังหวัด
  const handleProvinceChange = (value: string[]) => {
    if (value.includes("ทั้งหมด") && value.length > 1) {
      setSelectedProvinces(value.filter((v) => v !== "ทั้งหมด"));
    } else if (value.length === 0) {
      setSelectedProvinces(["ทั้งหมด"]);
    } else {
      setSelectedProvinces(value);
    }
  };

  // ✅ ฟังก์ชันจัดการเงินเดือน
  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryRange(Number(event.target.value));
  };

  // ✅ ฟังก์ชันจัดการประเภทงาน
  const handleJobTypeChange = (value: string[]) => {
    if (value.includes("ทั้งหมด") && value.length > 1) {
      setSelectedJobTypes(value.filter((v) => v !== "ทั้งหมด"));
    } else if (value.length === 0) {
      setSelectedJobTypes(["ทั้งหมด"]);
    } else {
      setSelectedJobTypes(value);
    }
  };

  const jobTypes = ["ทั้งหมด", "Full-time", "Part-time", "Freelance"];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-80 hidden md:block">
      <div className="space-y-4">
        {/* 🔎 ค้นหา */}
        <div className="search">
          <label htmlFor="search" className="kanit-regular text-sm">
            ค้นหา
          </label>
          <input
            type="text"
            id="search"
            placeholder="ค้นหางาน"
            className="w-full p-2 border border-gray-300 rounded-md placeholder-kanit text-sm"
          />
        </div>

        {/* 📍 จังหวัด */}
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

        {/* 🏢 ประเภทงาน */}
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

        {/* 💰 เงินเดือน */}
        <div className="salary">
          <label htmlFor="salary" className="kanit-regular text-sm">
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
            className="w-full h-2 rounded-lg  "
          />
        </div>

        {/* 🔀 เรียงลำดับ */}
        <div className="sort flex flex-col space-y-2">
          <div className="flex space-x-2 items-center kanit-regular text-sm">
            <span>เรียง</span>
            <select id="sort" className="w-full p-2 border border-gray-300 rounded-md">
              <option value="latest">ทั้งหมด</option>
              <option value="salary">เงินเดือน</option>
              <option value="distance">ระยะทาง</option>
            </select>
            <span>จาก</span>
            <select id="order" className="w-full p-2 border border-gray-300 rounded-md">
              <option value="all">ทั้งหมด</option>
              <option value="highToLow">สูง-ต่ำ</option>
              <option value="lowToHigh">ต่ำ-สูง</option>
            </select>
          </div>
        </div>

        {/* 🔍 ปุ่มค้นหา */}
        <div className="flex justify-center">
          <button className="kanit-regular bg-seagreen hover:bg-seagreen/90 text-white py-2 px-4 w-full rounded-md">
            ค้นหา
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
