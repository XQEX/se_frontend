import React from "react";
import { FaArrowRight } from "react-icons/fa";

function JobCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-102 duration-300 border border-gray-100">
      <div className="text-xl font-semibold text-gray-800 kanit-bold">งาน</div>
      <div className="text-md text-gray-600 kanit-light">บริษัท</div>

      <div className="text-sm text-gray-500 mt-1 kanit-light">
        สถานที่ทํางาน
      </div>
      <div className="text-sm text-gray-500  kanit-light">
        เวลา
      </div>

      <div className="flex flex-row items-center mt-4">
        <div className="text-sm text-seagreen kanit-light">รายละเอียด</div>
        <FaArrowRight className="ml-2 text-seagreen" />
      </div>
    </div>
  );
}

export default JobCard;
