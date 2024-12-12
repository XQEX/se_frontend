import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Menu, Divider } from "@mantine/core";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const user = { name: "มนุษย์", profilePicture: "/null" }; 

  return (
    <nav className="flex justify-between items-center px-6 py-1 bg-seagreen shadow-lg sticky top-0 z-50 min-h-[60px]">
      <div className="logo">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/white_logo.png" alt="logo" className="w-12 h-auto" />
          <span className="font-bold text-white text-lg">SkillBridge</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {!isSignedIn ? (
          <>
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
          </>
        ) : (
          <Menu width={250} position="bottom-end">
            <Menu.Target>
              {user.profilePicture ? (
                <Avatar
                  src={user.profilePicture}
                  alt={user.name}
                  radius="xl"
                  size={45}
                  className="text-white"
                />
              ) : (
                <FaUserCircle
                  size={30}
                  className="text-gray-400 transition-transform transform hover:scale-105"
                />
              )}
            </Menu.Target>
            <Menu.Dropdown className="m-2">
              <div className="p-3 text-center">
                <div className="kanit-medium">{user.name}</div>
              </div>
              <Divider />
              <Menu.Item component={Link} to="/settings" className="kanit-light">
                ตั้งค่า
              </Menu.Item>
              <Menu.Item onClick={() => setIsSignedIn(false)} className="kanit-light ">
                ออกจากระบบ
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </div>
    </nav>
  );
}
