import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-1 bg-white shadow-md sticky top-0 z-50 min-h-[60px]">
      <div className="logo">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="logo" className="w-12 h-auto" />
          <span className="font-bold text-seagreen text-lg">SkillBridge</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/signin"
          className="text-seagreen kanit-light hover:text-seagreen/50 px-4 py-1 rounded-md transition-colors duration-300"
        >
          เข้าสู่ระบบ
        </Link>
        <Link
          to="/signup"
          className="text-seagreen px-4 py-1 rounded-md border border-seagreen kanit-medium hover:text-seagreen/50 transition-colors duration-300"
        >
          สมัครสมาชิก
        </Link>
      </div>
    </nav>
  );
}
