import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jobData } from "../data/FakeJobData";
import Navbar from "../components/Navbar";
import { FaBuilding, FaClock, FaStar } from "react-icons/fa";
import { CiMoneyBill, CiStar } from "react-icons/ci";
import Footer from "../components/Footer";

function JobDetail() {
  const { id } = useParams();
  const [isStarred, setIsStarred] = useState(false);

  const job = jobData.find((job) => job.id === id);

  if (!job) {
    return (
      <div className="text-center">
        <h2>Job not found</h2>
      </div>
    );
  }

  const toggleStar = () => {
    setIsStarred((prev) => !prev);
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div>
        <div className="header m-12">
          <div className="flex flex-row items-center space-x-8">
            <img
              src={"/vite.svg"}
              alt={job.company}
              className="rounded-lg h-20 w-auto"
            />

            <div className="flex flex-col">
              <div className="text-lg kanit-regular">{job.company}</div>
              <Link className="text-seagreen kanit-regular" to={"/reserved"}>
                รายละเอียดบริษัท
              </Link>
            </div>
          </div>
        </div>

        <div className="ml-12 details">
          <div className="space-y-1 flex-col">
            <div className="flex items-center space-x-4 mb-2 ">
              <div className="kanit-regular text-2xl">{job.title}</div>
            </div>

            <div className="flex items-center space-x-4">
              <FaBuilding size={20} className="text-seagreen" />
              <div className="kanit-regular">สถานที่ทํางาน: {job.location}</div>
            </div>

            <div className="flex items-center space-x-4">
              <FaClock size={20} className="text-seagreen" />
              <div className="kanit-regular">เวลาทํางาน: {job.time}</div>
            </div>

            <div className="flex items-center space-x-4">
              <CiMoneyBill size={20} className="text-seagreen" />
              <div className="kanit-regular">ค่าตอบแทน: {job.salary} บาท</div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/reserved"
                className="kanit-regular bg-seagreen text-white rounded-lg pl-10 pr-10 pt-1 pb-1 w-fit mt-2"
              >
                สมัครงาน
              </Link>
              <div
                className="flex flex-row items-center space-x-2 mt-2 cursor-pointer"
                onClick={toggleStar}
              >
                <FaStar
                  size={20}
                  className={isStarred ? "fill-yellow-500 text-yellow-500" : "text-gray-300 group-hover:text-gray-400"}
                />
                <span className="kanit-regular">สนใจงานนี้</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-12 description mt-8 mb-8">
          <div className="kanit-regular text-lg">รายละเอียดงาน</div>
          <div className="kanit-regular ">{job.description}</div>
        </div>
        

        <div className="ml-12 map mb-8">
          <div className="kanit-regular text-lg">แผนที่</div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default JobDetail;
