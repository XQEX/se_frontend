import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="bg-seagreen grid grid-cols-4 justify-items-center items-center text-white p-4">
        <div className="font-bold">SkillBridge</div>
        <div>
          <ul className="flex flex-col justify-center items-center">
            <li className="kanit-medium ">วิธีการใช้งาน</li>
            <li>การสมัคร</li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col justify-center items-center">
            <li className="kanit-medium ">ติดต่อเรา</li>
            <li>การสมัคร</li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col justify-center items-center">
            <li className="kanit-medium ">เกี่ยวกับ SkillBridge</li>
            <li>การสมัคร</li>
          </ul>
        </div>
        {/* Copyright Section */}
      </footer>
      <div className="text-sm bg-gray-800 text-gray-400 mt-4 md:mt-0 flex justify-center p-3">
        &copy; {new Date().getFullYear()} Skillbridge. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
