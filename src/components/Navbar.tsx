import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, Menu, Divider, Burger, Drawer } from "@mantine/core";
import {
  FaUserCircle,
  FaSearch,
  FaHome,
  FaSearch as FaFind,
  FaEdit,
  FaBuilding,
  FaBell,
} from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const user = { name: "ชื่อ นามสกุล", profilePicture: "/vite.svg" };
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = (
    <>
      {isSignedIn ? (
        <>
          <Menu.Item component={Link} to="/profile" className="kanit-regular">
            โปรไฟร์
          </Menu.Item>
          <Menu.Item
            onClick={() => setIsSignedIn(false)}
            className="kanit-regular"
          >
            ออกจากระบบ
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item component={Link} to="/signin" className="kanit-regular">
            เข้าสู่ระบบ
          </Menu.Item>
          <Menu.Item component={Link} to="/signup" className="kanit-regular">
            สมัครสมาชิก
          </Menu.Item>
        </>
      )}
    </>
  );

  const navLinks = (
    <>
      <Link
        to="/find"
        className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
      >
        <FaFind className="mr-2" />
        ค้นหางาน
      </Link>
      <Link
        to="/editjob"
        className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
      >
        <FaEdit className="mr-2" />
        แก้ไขประวัติ
      </Link>
      <Link
        to="/homeemp"
        className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
      >
        <FaBuilding className="mr-2" />
        สำหรับบริษัท
      </Link>
    </>
  );

  const FakeNotifications = ["red circle works"];

  return (
    <>
      <nav
        className={`backdrop-blur-sm bg-seagreen/80 flex justify-between items-center px-6 py-1 shadow-md sticky top-0 z-50 min-h-[60px] transition-transform duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="logo">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/white_logo.png" alt="logo" className="w-12 h-auto" />
            <span className="font-bold text-white text-2xl leading-none">
              SkillBridge
            </span>
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {isSignedIn && (
            <>
              {navLinks}
              <Menu width={250} position="bottom-end" shadow="md">
                <Menu.Target>
                  <button className="text-gray-200 kanit-regular hover:text-white transition-colors duration-300 relative">
                    <FaBell size={20} />
                    {FakeNotifications.length > 0 && (
                      <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                </Menu.Target>
                <Menu.Dropdown>
                  <div className="p-2">
                    <div className="kanit-regular text-center">
                      การแจ้งเตือน
                    </div>
                  </div>
                  <Divider />
                  {FakeNotifications.map((message, index) => (
                    <Menu.Item key={index} className="kanit-light">
                      {message}
                    </Menu.Item>
                  ))}
                  <Divider />
                  <Menu.Item className="kanit-regular text-center bg-gray-200">
                    <a href="/notifications" className="text-seagreen">
                      ดูทั้งหมด
                    </a>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          )}
          <div className="hidden lg:flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <Link
                  to="/find"
                  className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300 flex items-center"
                >
                  <FaFind className="mr-2" />
                  ค้นหางาน
                </Link>
                <Link
                  to="/signin"
                  className="text-gray-200 kanit-regular hover:text-white px-4 py-1 rounded-md transition-colors duration-300"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-200 px-4 py-1 rounded-md border border-seagreen kanit-regular hover:text-white transition-colors duration-300"
                >
                  สมัครสมาชิก
                </Link>
              </>
            ) : (
              <Menu width={250} position="bottom-end">
                <Menu.Target>
                  <button className="flex items-center space-x-2 bg-gray-200 text-black px-4 py-2 rounded-3xl hover:bg-white transition">
                    {user.profilePicture ? (
                      <Avatar
                        src={user.profilePicture}
                        alt={user.name}
                        radius="xl"
                        size={30}
                      />
                    ) : (
                      <FaUserCircle size={24} />
                    )}
                    <span className="kanit-regular">{user.name}</span>
                  </button>
                </Menu.Target>
                <Menu.Dropdown className="m-2">
                  <div className="p-3 text-center">
                    <div className="kanit-regular">{user.name}</div>
                  </div>
                  <Divider />
                  {menuItems}
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
