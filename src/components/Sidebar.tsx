import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Select } from "@mantine/core";
import { provinces, DistrictByProvince, SubdistrictByDistrict } from "../data/provinces";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [salaryRange, setSalaryRange] = useState(100000);
  const [sortBy, setSortBy] = useState("relevance");
  const [sortOrder, setSortOrder] = useState("descending");
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryRange(parseInt(e.target.value));
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };

  const handleProvinceChange = (value: string | null) => {
    setSelectedProvince(value);
    setSelectedCity(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4  w-1/4 hidden md:block">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="keyword"
            className="font-medium text-gray-700 mb-1 kanit-regular"
          >
            คำค้นหา
          </label>
          <input
            type="text"
            id="keyword"
            placeholder="ตำแหน่งงาน, บริษัท, หรือทักษะ"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seagreen focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700 kanit-regular">
            จังหวัด
          </label>
          <Select
            placeholder="เลือกจังหวัด"
            data={provinces}
            value={selectedProvince}
            onChange={handleProvinceChange}
            searchable
            clearable
            className="w-full"
          />
        </div>

        {selectedProvince && (
          <div className="space-y-2">
            <label className="font-medium text-gray-700 kanit-regular">
              อำเภอ/เขต
            </label>
            <Select
              placeholder="เลือกอำเภอ/เขต"
              data={DistrictByProvince[selectedProvince] || []}
              value={selectedCity}
              onChange={setSelectedCity}
              searchable
              clearable
              className="w-full "
            />
          </div>
        )}

        <div>
          <label
            htmlFor="salary"
            className="font-medium text-gray-700 mb-1 kanit-regular"
          >
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
            className="w-full h-2 bg-gray-200 rounded-lg  cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>฿0</span>
            <span>฿200,000</span>
          </div>
        </div>

        <div>
          <label
            htmlFor="sortBy"
            className="font-medium text-gray-700 mb-1 kanit-regular"
          >
            เรียงตาม
          </label>
          <div className="flex items-center space-x-2">
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className=" kanit-regular flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-seagreen focus:border-transparent"
            >
              <option value="relevance">ความเกี่ยวข้อง</option>
              <option value="date">วันที่ลงประกาศ</option>
              <option value="salary">เงินเดือน</option>
            </select>
            <button
              onClick={toggleSortOrder}
              className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              {sortOrder === "ascending" ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>
        </div>

        <button className=" kanit-regular w-full bg-seagreen text-white font-semibold py-2 px-4 rounded-md hover:bg-seagreen-dark transition-colors duration-300">
          ค้นหางาน
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
