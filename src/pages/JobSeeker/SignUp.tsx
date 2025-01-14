import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function SignUp() {
  const [userType, setUserType] = useState("jobSeeker"); // "jobSeeker" หรือ "employer"

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-5">
        {/* Title */}
        <h1 className="kanit-bold text-xl text-center mb-6">
          {userType === "jobSeeker"
            ? "สมัครสมาชิก (คนหางาน)"
            : "สมัครสมาชิก (บริษัท)"}
        </h1>

        {/* Toggle Buttons */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setUserType("jobSeeker")}
            className={`px-4 py-2 rounded-lg kanit-semibold ${
              userType === "jobSeeker"
                ? "bg-seagreen text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            คนหางาน
          </button>
          <button
            onClick={() => setUserType("employer")}
            className={`px-4 py-2 rounded-lg kanit-semibold ${
              userType === "employer"
                ? "bg-seagreen text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            บริษัท
          </button>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-sm space-y-6">
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-2 kanit-light">
              {userType === "jobSeeker" ? "ชื่อ-นามสกุล" : "ชื่อบริษัท"}
            </label>
            <input
              type="text"
              placeholder={
                userType === "jobSeeker" ? "กรอกชื่อ-นามสกุล" : "กรอกชื่อบริษัท"
              }
              className="text-black placeholder-kanit rounded-lg border border-gray-300 p-3"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-2 kanit-light">อีเมล</label>
            <input
              type="email"
              placeholder="กรอกอีเมล"
              className="text-black placeholder-kanit rounded-lg border border-gray-300 p-3"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-2 kanit-light">
              รหัสผ่าน
            </label>
            <input
              type="password"
              placeholder="รหัสผ่าน"
              className="text-black placeholder-kanit rounded-lg border border-gray-300 p-3"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black text-sm mb-2 kanit-light">
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              placeholder="ยืนรหัสผ่าน"
              className="text-black placeholder-kanit rounded-lg border border-gray-300 p-3"
            />
          </div>

          {/* Extra Input for Employer */}
          {userType === "employer" && (
            <div className="flex flex-col">
              <label className="text-black text-sm mb-2 kanit-light">
                เว็บไซต์บริษัท (ถ้ามี)
              </label>
              <input
                type="url"
                placeholder="กรอกเว็บไซต์บริษัท"
                className="text-black placeholder-kanit rounded-lg border border-gray-300 p-3"
              />
            </div>
          )}

          {/* Sign Up Button */}
          <div className="flex justify-center">
            <button className="bg-seagreen text-white kanit-semibold w-full py-3 rounded-lg">
              {userType === "jobSeeker"
                ? "สมัครสมาชิก (คนหางาน)"
                : "สมัครสมาชิก (บริษัท)"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <Link to="/SignIn" className="text-seagreen kanit-semibold underline">
            มีบัญชีแล้ว? เข้าสู่ระบบที่นี่
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
