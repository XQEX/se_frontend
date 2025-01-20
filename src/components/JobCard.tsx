import React, { useState } from "react";
import { FaStar, FaArrowRight, FaMapPin, FaClock, FaDollarSign, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbCurrencyBaht } from "react-icons/tb";
type JobCardProps = {
  id: string;
  title: string;
  company: string;
  time: string;
  location: string;
  salary: string;
};

function JobCard({ id, title, company, time, location, salary }: JobCardProps) {
  const [isFav, setIsFav] = useState(false);

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav(!isFav);
  };

  return (
    <div className="kanit-regular group relative bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 w-full">
   
      <button
        onClick={handleFav}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-50 transition-colors"
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        <FaStar
          size={20}
          className={`transition-colors ${
            isFav ? "fill-yellow-400 text-yellow-400" : "text-gray-300 group-hover:text-gray-400"
          }`}
        />
      </button>

      <Link to={`/job/${id}`} className="block space-y-4">
        
        <div className="pr-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">{title}</h2>
          <div className="flex items-center text-gray-600">
            <FaBuilding size={16} className="mr-1.5 text-seagreen" />
            <span className="font-medium">{company}</span>
          </div>
        </div>

     
        <div className="flex flex-col space-y-1 text-gray-600">
          <div className="flex items-center">
            <TbCurrencyBaht size={16} className="mr-1.5 text-seagreen" />
            <span>฿{salary}</span>
          </div>
          <div className="flex items-center">
            <FaMapPin size={16} className="mr-1.5 text-seagreen" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <FaClock size={16} className="mr-1.5 text-seagreen" />
            <span>{time}</span>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
            <span>รายละเอียด</span>
            <FaArrowRight size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default JobCard;