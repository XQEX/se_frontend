import React, { useState } from "react";
import { FaStar, FaArrowRight, FaMapPin, FaClock } from "react-icons/fa";
import { TbCurrencyBaht } from "react-icons/tb";
import { Link } from "react-router-dom";

type JobCardEmpProps = {
  id: string | number;
  title: string;
  workDays?: string;
  workHours?: string;
  location: string;
  salary: string;
};

function JobCardEmp({
  id,
  title,
  workDays = "ไม่ระบุวันทำงาน",
  workHours = "ไม่ระบุเวลา",
  location,
  salary,
}: JobCardEmpProps) {
  const [isFav, setIsFav] = useState(false);

  // ฟังก์ชันจัดการการคลิกปุ่ม Favorite
  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav(!isFav);
  };

  return (
    <div className="kanit-regular group relative bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 w-full">
      {/* ปุ่ม Favorite */}
      <button
        onClick={handleFav}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-50 transition-colors"
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        <FaStar
          size={20}
          className={`transition-colors ${
            isFav
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300 group-hover:text-gray-400"
          }`}
        />
      </button>

      {/* 🔗 ลิงก์ไปหน้ารายละเอียดงาน */}
      <Link to={`/employer/details/${String(id)}`} className="block space-y-4">
        {/* ชื่องาน */}
        <div className="pr-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
            {title}
          </h2>
        </div>

        {/* รายละเอียดงาน */}
        <div className="flex flex-col space-y-1 text-gray-600">
          {/* เงินเดือน */}
          <div className="flex items-center">
            <TbCurrencyBaht size={16} className="mr-1.5 text-seagreen" />
            <span>
              ฿
              {!isNaN(parseFloat(salary))
                ? parseFloat(salary).toLocaleString()
                : salary}
            </span>
          </div>

          {/* สถานที่ทำงาน */}
          <div className="flex items-center">
            <FaMapPin size={16} className="mr-1.5 text-seagreen" />
            <span>{location}</span>
          </div>

          {/* วันและเวลาทำงาน */}
          <div className="flex items-center">
            <FaClock size={16} className="mr-1.5 text-seagreen" />
            <span className="line-clamp-1">
              {workDays} | {workHours}
            </span>
          </div>
        </div>

        {/* ปุ่มดูรายละเอียด */}
        <div className="pt-2">
          <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
            <span>รายละเอียด</span>
            <FaArrowRight
              size={16}
              className="ml-1.5 transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default JobCardEmp;
