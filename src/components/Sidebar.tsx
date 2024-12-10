import React, { useState } from "react";

function Sidebar() {
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(10000000);
  const [error, setError] = useState("");

  const handleMinSalaryChange = (e:any) => {
  };

  const handleMaxSalaryChange = (e:any) => {
  };

  return (
    <div className="flex flex-col h-screen w-1/4 bg-gray-100 text-white">
      <div className="flex flex-col justify-start items-start space-y-4 p-4">
        <div className="text-black kanit-bold">กรองการค้นหา</div>

        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col">
            <label className="text-black text-sm mb-1 kanit-light">
              ตําแหน่งงานหรือชื่อบริษัท (เดี๋ยวมีแต่ละตําแหน่งโชว์ด้วย)
            </label>
            <input
              type="text"
              placeholder="ระบุตําแหน่งงานหรือชื่อบริษัท"
              className="text-black placeholder-kanit rounded-lg border border-gray-300 w-full p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-black text-sm mb-1 kanit-light">
              สถานที่ปฎิบัติงาน (เดี๋ยวมีแต่ละที่โชว์ด้วย)
            </label>
            <input
              type="text"
              placeholder="สถานที่ปฎิบัติงาน"
              className="text-black placeholder-kanit rounded-lg border border-gray-300 w-full p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-black text-sm mb-1 kanit-light">
              เงินเดือน
            </label>
            <div className="flex flex-row gap-2 items-center">
              <input
                type="number"
                placeholder="0"
                min={0}
                className="text-black placeholder-kanit rounded-lg border border-gray-300 w-full p-2"
                onChange={handleMinSalaryChange}
              />
              <span className="text-black">-</span>
              <input
                type="number"
                placeholder="1000000000000000"
                className="text-black placeholder-kanit rounded-lg border border-gray-300 w-full p-2"
                onChange={handleMaxSalaryChange}
              />
            </div>
          </div>
        </div>
      </div>

      <button className="kanit-light bg-seagreen rounded-lg p-2 m-4">
        ค้นหา
      </button>
    </div>
  );
}

export default Sidebar;
