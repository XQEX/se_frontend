import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-5">
        {/* Title */}
        <h1 className="kanit-bold text-xl text-center mb-8">เข้าสู่ระบบ</h1>

        {/* Form Section */}
        <div className="w-full max-w-sm space-y-6">
          {/* Username/Email Input */}
          <div className="flex flex-col">
            <label className="text-black text-sm mb-2 kanit-light">
              ชื่อผู้ใช้งานหรืออีเมล
            </label>
            <input
              type="text"
              placeholder="ชื่อผู้ใช้งานหรืออีเมล"
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

          {/* Login Button */}
          <div className="flex justify-center">
            <button className="bg-seagreen text-white kanit-semibold w-full py-3 rounded-lg">
              เข้าสู่ระบบ
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <Link to="/SignUp" className="text-seagreen kanit-semibold underline">
            ยังไม่ได้สมัครสมาชิก? สมัครที่นี่
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
