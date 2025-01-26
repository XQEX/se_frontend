import React, { useState } from "react";
import { Select } from "@mantine/core";
import { provinces, DistrictByProvince, SubdistrictByDistrict } from "../data/provinces";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [salaryRange, setSalaryRange] = useState(10000);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("descending");
  const [selectedProvince, setSelectedProvince] = useState<string>("ทั้งหมด"); // ตั้งค่าเริ่มต้นเป็น "ทั้งหมด"
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryRange(parseInt(e.target.value));
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  const handleProvinceChange = (value: string | null) => {
    setSelectedProvince(value || "ทั้งหมด"); // ถ้าผู้ใช้เคลียร์ ให้กลับไปที่ "ทั้งหมด"
    setSelectedCity(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-1/4 hidden md:block">
      <div className="space-y-4">
        <div>
          <label htmlFor="keyword" className="font-medium text-gray-700 mb-1 kanit-regular">
            คำค้นหา
          </label>
          <input
            type="text"
            id="keyword"
            placeholder="ตำแหน่งงาน, บริษัท, หรือทักษะ"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seagreen focus:border-transparent"
          />
        </div>

        {/* ตัวเลือกจังหวัด */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700 kanit-regular">จังหวัด</label>
          <Select
            placeholder="เลือกจังหวัด"
            data={["ทั้งหมด", ...provinces]} 
            value={selectedProvince}
            onChange={handleProvinceChange}
            searchable
            clearable
            className="w-full"
          />
        </div>


        <div>
        <label htmlFor="address" className="font-medium text-gray-700 mb-1 kanit-regular">
          ที่อยู่
        </label>
        <input
          type="text"
          id="address"
          placeholder="ทั้งหมด"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seagreen focus:border-transparent"
          value={undefined} 
        />
      </div>



        {/* ตัวกรองเงินเดือน */}
        <div>
          <label htmlFor="salary" className="font-medium text-gray-700 mb-1 kanit-regular">
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
          <label htmlFor="sortBy" className="font-medium text-gray-700 mb-1 kanit-regular">
            เรียงตาม
          </label>
          <div className="flex items-center space-x-2">
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="kanit-regular flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seagreen focus:border-transparent"
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
        <button className="kanit-regular w-full bg-seagreen text-white font-semibold py-2 px-4 rounded-md hover:bg-seagreen-dark transition-colors duration-300 ">
          ค้นหางาน
        </button>

        {/* ปุ่มโพสต์งาน */}
        <div>
          <label htmlFor="post-job" className="block font-medium text-gray-700 mb-2 mt-6 kanit-regular">
            โพสต์หางาน
          </label>
          <button
            onClick={() => navigate("/postjob")}
            className="kanit-regular w-full bg-seagreen text-white font-bold text-lg py-3 px-4 rounded-md hover:bg-seagreen-dark transition-colors duration-300 mt-4"
          >
            📝 โพสต์หางาน
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
