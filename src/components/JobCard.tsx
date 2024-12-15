import React, { useState } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

type JobCardProps = {
  id: string;
  title: string;
  company: string;
  time: string;
  location: string;
  salary: string
};

function JobCard({ id, title, company, time, location, salary}: JobCardProps) {
  const [isFav, setIsFav] = useState(false);


  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsFav(!isFav); 
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 border border-gray-200 max-w-sm w-full">
 
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800 kanit-bold">{title}</div>
        <FaStar
          size={18}
          className={isFav ? "text-yellow-500 cursor-pointer" : "text-gray-400 cursor-pointer"}
          onClick={handleFav}
        />
      </div>

  
      <Link to={`/job/${id}`} className="w-full h-full">
        <div className="text-md text-gray-600 kanit-light">{company}</div>
        <div className="text-sm text-gray-500 kanit-light">฿{salary}</div>
        <div className="text-sm text-gray-500 mt-2 kanit-light">{location}</div>
        <div className="text-sm text-gray-500 kanit-light">{time}</div>
        <div className="flex items-center mt-4">
          <div className="text-sm text-seagreen kanit-light">รายละเอียด</div>
          <FaArrowRight className="ml-2 text-seagreen" />
        </div>
      </Link>
    </div>
  );
}

export default JobCard;
